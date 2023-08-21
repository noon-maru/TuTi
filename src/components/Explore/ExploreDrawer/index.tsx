import { useRef, useState, useEffect } from "react";
import { Dimensions, Animated, Easing } from "react-native";

import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

import PlaceList from "./PlaceList";
import LoopList from "./LoopList";

interface ExploreDrawerProps {
  containerHeight: number;
}

interface ContainerProps {
  containerHeight: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreDrawer = ({ containerHeight }: ExploreDrawerProps) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const [region, setRegion] = useState<string>("서울");
  const [currentY, setCurrentY] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const id = translateY.addListener(({ value }) => {
      setCurrentY(value);
    });

    // 메모리 누수 방지를 위해 다 쓴 리스너는 삭제
    return () => {
      translateY.removeListener(id);
    };
  }, [translateY]);

  const onUpFlingGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (!isDrawerOpen) {
        Animated.timing(translateY, {
          toValue: currentY - containerHeight + 65 - 25,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }).start(() => {
          setIsDrawerOpen(true);
        });
      }
    }
  };

  const onDownFlingGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (isDrawerOpen) {
        Animated.timing(translateY, {
          toValue: currentY + containerHeight - 65 + 25,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }).start(() => {
          setIsDrawerOpen(false);
        });
      }
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={onUpFlingGesture}
    >
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={onDownFlingGesture}
      >
        <Container
          style={{
            transform: [{ translateY: translateY }],
          }}
          containerHeight={containerHeight}
        >
          <DrawerKnob />
          <Inform>지역별 추천 장소를 확인해보세요!</Inform>
          <LoopList region={region} setRegion={setRegion} />
          <PlaceList region={region} />
        </Container>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const Container = styled(Animated.View)<ContainerProps>`
  position: absolute;
  bottom: ${(props) => 65 - props.containerHeight - 25}px;

  align-items: center;
  gap: 15px;

  width: ${SCREEN_WIDTH}px;
  height: ${(props) => props.containerHeight + 25}px;

  border-radius: 30px 30px 0 0;

  padding: 15px 0;

  background-color: white;
`;

const DrawerKnob = styled.View`
  width: 40px;
  height: 6px;

  border-radius: 50px;

  background-color: #7fcfe9;
`;

const Inform = styled(StyledText)`
  font-size: 13px;
  color: #9292b9;
`;

export default ExploreDrawer;
