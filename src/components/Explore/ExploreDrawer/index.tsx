import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, Animated, View } from "react-native";

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
import { Shadow } from "react-native-shadow-2";

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
          containerHeight={exploreContainerHeight}
          style={{
            transform: [{ translateY: translateY }],
          }}
        >
          <Shadow distance={4} offset={[3, -4]}>
            <View
              style={{
                alignItems: "center",
                gap: 15,

                width: SCREEN_WIDTH,
                height: exploreContainerHeight + 25,

                borderTopStartRadius: 30,
                borderTopEndRadius: 30,

                paddingTop: 15,
                paddingBottom: 15,

                backgroundColor: "white",
              }}
            >
              <DrawerKnob />
              <Inform>지역별 추천 장소를 확인해보세요!</Inform>
              <LoopList />
              <PlaceList />
            </View>
          </Shadow>
        </Container>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const Container = styled(Animated.View)<ContainerProps>`
  position: absolute;
  bottom: ${(props) => 65 - props.containerHeight - 25}px;
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
