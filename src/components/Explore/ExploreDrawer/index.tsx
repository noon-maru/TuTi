import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, Animated } from "react-native";

import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

import { RootState } from "redux/reducers";
import { setTranslateY, animateDrawer } from "redux/slice/drawerSlice";

import PlaceList from "./PlaceList";
import LoopList from "./LoopList";

interface ContainerProps {
  containerHeight: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreDrawer = () => {
  const dispatch = useDispatch();

  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    dispatch(setTranslateY(translateY));
  }, []);

  const { isDrawerOpen, exploreContainerHeight } = useSelector(
    (state: RootState) => state.drawer
  );

  const onUpFlingGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE && !isDrawerOpen) {
      dispatch(animateDrawer({ direction: "UP" })); // 사가에서 애니메이션 시작
    }
  };

  const onDownFlingGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE && isDrawerOpen) {
      dispatch(animateDrawer({ direction: "DOWN" })); // 사가에서 애니메이션 시작
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
          containerHeight={exploreContainerHeight}
        >
          <DrawerKnob />
          <Inform>지역별 추천 장소를 확인해보세요!</Inform>
          <LoopList />
          <PlaceList />
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
