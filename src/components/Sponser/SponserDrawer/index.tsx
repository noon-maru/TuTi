import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, Animated, View, ScrollView } from "react-native";

import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import styled from "styled-components/native";

import { StyledText } from "styles/globalStyles";

import { RootState } from "redux/reducers";
import { setTranslateY, animateDrawer } from "redux/slice/sponserDrawerSlice";

import { Shadow } from "react-native-shadow-2";
import Picture from "./Picture";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ContainerProps {
  containerHeight: number;
  insets: EdgeInsets;
}

const SponserDrawer = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    dispatch(setTranslateY(translateY));
  }, [dispatch, translateY]);

  const { isDrawerOpen, sponserContainerHeight } = useSelector(
    (state: RootState) => state.sponserDrawer
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
          containerHeight={sponserContainerHeight}
          insets={insets}
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
                height: sponserContainerHeight + 25,

                borderTopStartRadius: 30,
                borderTopEndRadius: 30,

                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 25,
                paddingRight: 25,

                backgroundColor: "white",
              }}
            >
              <DrawerKnob />
              <StyledText style={{ fontSize: 13, color: "#9292B9" }}>
                {"다른 작가님들의 사진을 구경해 보세요!"}
              </StyledText>
              <ContentsContainer>
                <ScrollView
                  style={{ flex: 1, marginBottom: 120 }}
                  contentContainerStyle={{ gap: 20 }}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <Picture />
                  <Picture />
                </ScrollView>
              </ContentsContainer>
            </View>
          </Shadow>
        </Container>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const Container = styled(Animated.View)<ContainerProps>`
  position: absolute;
  bottom: ${(props) => 65 - props.containerHeight + props.insets.bottom - 25}px;
`;

const DrawerKnob = styled.View`
  width: 40px;
  height: 6px;

  border-radius: 50px;

  background-color: #7fcfe9;
`;

const ContentsContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 30px;
`;

export default SponserDrawer;
