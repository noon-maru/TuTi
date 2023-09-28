import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, Animated, View, ScrollView, Image } from "react-native";

import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "styles/globalStyles";

import { RootState } from "redux/reducers";
import { setTranslateY, animateDrawer } from "redux/slice/courseDrawerSlice";

import { Shadow } from "react-native-shadow-2";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ContainerProps {
  containerHeight: number;
}

const CourseDrawer = () => {
  const dispatch = useDispatch();

  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    dispatch(setTranslateY(translateY));
  }, []);

  const { isDrawerOpen, courseContainerHeight } = useSelector(
    (state: RootState) => state.courseDrawer
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
          containerHeight={courseContainerHeight}
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
                height: courseContainerHeight + 25,

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
              <ContentsContainer>
                <StyledText style={{ fontSize: 15, width: "100%" }}>
                  추천 코스
                </StyledText>
                <GradientLine
                  colors={["#518FFF", "#33E1C0"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <ScrollView
                  contentContainerStyle={{ gap: 40 }}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <CourseContainer>
                    <Image
                      source={require("@assets/icon/star.png")}
                      style={{ width: 60, height: 60 }}
                    />
                    <BoldStyledText
                      style={{ fontSize: 15 }}
                    >{`A 코스`}</BoldStyledText>
                    <ButtonContainer>
                      <Image
                        source={require("@assets/icon/share.png")}
                        style={{ width: 15, height: 15 }}
                      />
                      <Image
                        source={require("@assets/icon/box.png")}
                        style={{ width: 15, height: 15 }}
                      />
                      <Image
                        source={require("@assets/icon/unfold.png")}
                        style={{ width: 15, height: 15 }}
                      />
                    </ButtonContainer>
                  </CourseContainer>
                  <CourseContainer></CourseContainer>
                  <CourseContainer></CourseContainer>
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
  bottom: ${(props) => 65 - props.containerHeight - 25}px;
`;

const DrawerKnob = styled.View`
  width: 40px;
  height: 6px;

  border-radius: 50px;

  background-color: #7fcfe9;
`;

const ContentsContainer = styled.View`
  width: 100%;
  margin-top: 30px;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;

  margin-top: 3px;
  margin-bottom: 8px;
`;

const CourseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 84px;

  border-radius: 10px;

  padding: 10px 10px;

  background-color: #efeff0;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 5px;
`;

export default CourseDrawer;
