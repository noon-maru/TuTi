import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, Animated, View, ScrollView, Image } from "react-native";

import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

import LinearGradient from "react-native-linear-gradient";

import { Shadow } from "react-native-shadow-2";

import axios from "axios";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import { RootState } from "redux/reducers";
import { setTranslateY, animateDrawer } from "@redux/slice/courseDrawerSlice";
import { Course } from "@redux/slice/courseSlice";

import CourseItem from "./CourseItem";

const isDevelopMode = DEVELOP_MODE === "true";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ContainerProps {
  containerHeight: number;
}

interface CourseDrawerProps {
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}

const getRecommendedCourses = async (userId: string) => {
  try {
    let url = "";
    if (isDevelopMode)
      url = DEVELOP_SERVER_URL + API + "/course/recommended/" + userId;
    else url = SERVER_URL + API + "/course/recommended/" + userId;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const CourseDrawer = ({ setCourse }: CourseDrawerProps) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);

  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);

  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    dispatch(setTranslateY(translateY));
  }, [dispatch, translateY]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendedCourses(await getRecommendedCourses(id));
      } catch (error) {
        console.error("네트워킹 오류:", error);
        throw error;
      }
    };

    fetchData();
  }, [id]);

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
              <Inform>{"추천 코스를 확인해보세요!"}</Inform>
              <ContentsContainer>
                <HeaderTitle>
                  <Image
                    source={require("@assets/icon/star.png")}
                    style={{ width: 15, height: 15 }}
                  />
                  <StyledText style={{ fontSize: 15, width: "100%" }}>
                    추천 코스
                  </StyledText>
                </HeaderTitle>
                <GradientLine
                  colors={["#518FFF", "#33E1C0"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <ScrollView
                  contentContainerStyle={{ gap: 20 }}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  {recommendedCourses.map((course, index) => (
                    <CourseItem
                      setCourse={setCourse}
                      thumbnail={course.places[0].image}
                      courseName={course.courseName}
                      places={course.places}
                      travelTime={course.travelTime}
                      totalFee={course.totalFee}
                      key={index}
                    />
                  ))}
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

const Inform = styled(StyledText)`
  font-size: 13px;
  color: #9292b9;
`;

const ContentsContainer = styled.View`
  width: 100%;
  margin-top: 10px;
`;

const HeaderTitle = styled.View`
  flex-direction: row;
  gap: 3px;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;

  margin-top: 3px;
  margin-bottom: 8px;
`;

export default CourseDrawer;
