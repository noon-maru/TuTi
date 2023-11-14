import { useRef, useState, useEffect } from "react";
import { Dimensions, Animated, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";

import RecommendedPlaces from "./RecommendedPlaces";
import WishPlace from "./WishPlace";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface HomeDrawerProps {
  flingCount: number;
  setFlingCount: React.Dispatch<React.SetStateAction<number>>;
}

const HomeDrawer = ({ flingCount, setFlingCount }: HomeDrawerProps) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [currentY, setCurrentY] = useState<number>(0);
  const [wishContainerHeight, setWishContainerHeight] = useState<number>(0);

  const insets = useSafeAreaInsets();

  const headerHeight = 53;
  const statusbarHeight = insets.top;

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
      if (flingCount < 2) setFlingCount((state) => state + 1);

      if (flingCount === 0) {
        Animated.timing(translateY, {
          toValue:
            currentY -
            (SCREEN_HEIGHT / 2 - 65 - statusbarHeight - headerHeight),
          duration: 250,
          useNativeDriver: true,
        }).start();
      } else if (flingCount === 1) {
        Animated.timing(translateY, {
          toValue: currentY - wishContainerHeight,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onDownFlingGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (flingCount > 0) setFlingCount((state) => state - 1);

      if (flingCount === 2) {
        Animated.timing(translateY, {
          toValue: currentY + wishContainerHeight,
          duration: 250,
          useNativeDriver: true,
        }).start();
      } else if (flingCount === 1) {
        Animated.timing(translateY, {
          toValue:
            currentY +
            (SCREEN_HEIGHT / 2 - 65 - statusbarHeight - headerHeight),
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const handleWishContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setWishContainerHeight(height);
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
        <ContentsContainer style={{ transform: [{ translateY }] }}>
          <DrawerKnob />
          <WishContainer onLayout={handleWishContainerLayout}>
            <WishPlace />
            <DividingLine
              colors={["#518FFF", "#44EC87"]} // 그라데이션 색상 배열
              start={{ x: 0, y: 0 }} // 그라데이션 시작점 (왼쪽 상단) (범위: 0~1)
              end={{ x: 1, y: 0 }} // 그라데이션 끝점 (오른쪽 상단) (범위: 0~1)
            />
          </WishContainer>
          <RecommendedPlaces />
        </ContentsContainer>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const ContentsContainer = styled(Animated.View)`
  width: ${SCREEN_WIDTH}px;
  padding: 15px 30px;

  background-color: white;
  border-radius: 30px 30px 0px 0px;

  top: -65px;
`;

const DrawerKnob = styled.View`
  align-self: center;

  margin-bottom: 15px;

  width: 40px;
  height: 6px;

  border-radius: 8px;

  background-color: #7fcfe9;
`;

const WishContainer = styled.View``;

const DividingLine = styled(LinearGradient)`
  margin: 40px -10px;

  height: 2px;
`;

export default HomeDrawer;
