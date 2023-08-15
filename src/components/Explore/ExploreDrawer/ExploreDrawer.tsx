import { useRef, useState, useEffect } from "react";
import { Dimensions, Animated, Easing } from "react-native";

import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import styled from "styled-components/native";

import RegionList from "./RegionList";
import PlaceList from "./PlaceList";

interface ExploreDrawerProps {
  containerHeight: number;
}

interface ContainerProps {
  containerHeight: number;
  isOpen: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreDrawer = ({ containerHeight }: ExploreDrawerProps) => {
  const translateY = useRef(new Animated.Value(0)).current;

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
          toValue: currentY - containerHeight + 65,
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
          toValue: currentY + containerHeight - 65,
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
          isOpen={isDrawerOpen}
        >
          <DrawerKnob />
          <RegionList />
          <PlaceList />
        </Container>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const Container = styled(Animated.View)<ContainerProps>`
  position: absolute;
  bottom: ${(props) => 65 - props.containerHeight}px;

  align-items: center;

  width: ${SCREEN_WIDTH}px;
  height: ${(props) => props.containerHeight}px;

  border-radius: ${(props) => (props.isOpen ? "0px" : "30px 30px 0 0")};

  padding: 8px 0;

  background-color: white;
`;

const DrawerKnob = styled.View`
  width: 40px;
  height: 6px;

  margin-bottom: 11px;

  border-radius: 50px;

  background-color: #7fcfe9;
`;

export default ExploreDrawer;
