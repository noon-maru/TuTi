import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LinearGradient from "react-native-linear-gradient";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";
import { Course, addCourse } from "@redux/slice/courseSlice";

import CourseContent from "@components/Tour/CourseContent";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const TourScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    const courseArr: Course[] = [
      {
        courseName: "A 코스",
        duration: "TIME 30 ~ 40",
        places: ["a 장소", "b 장소", "c 장소"],
        isProgress: true,
      },
      {
        courseName: "B 코스",
        duration: "TIME 10 ~ 20",
        places: ["a 장소"],
        isProgress: false,
      },
      {
        courseName: "C 코스",
        duration: "TIME 40 ~ 60",
        places: ["a 장소", "b 장소"],
        isProgress: false,
      },
    ];
    courseArr.map((course) => dispatch(addCourse(course)));
  }, [dispatch]);

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <ContentsContainer
          contentContainerStyle={{ gap: 20 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <CourseContainer
            contentContainerStyle={{ gap: 10 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Header>
              <StyledText style={{ fontSize: 15 }}>진행중인 Tour</StyledText>
              <GradientLine
                colors={["#90BEFB", "#99E1D7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 0 }}
              />
            </Header>
            {courses
              .filter((course) => course.isProgress)
              .map((course, index) => (
                <CourseContent course={course} key={index} />
              ))}
          </CourseContainer>
          <CourseContainer
            contentContainerStyle={{ gap: 10 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Header>
              <StyledText style={{ fontSize: 15 }}>종료된 Tour</StyledText>
              <GradientLine
                colors={["#90BEFB", "#99E1D7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 0 }}
              />
            </Header>
            {courses
              .filter((course) => !course.isProgress)
              .map((course, index) => (
                <CourseContent course={course} key={index} />
              ))}
          </CourseContainer>
        </ContentsContainer>
      </Container>
    </>
  );
};

const StatusBarBackgroundColor = styled.View<{ height: number }>`
  width: ${SCREEN_WIDTH}px;
  height: ${(props) => props.height}px;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  margin-top: 53px;
  padding: 25px;
`;

const ContentsContainer = styled.ScrollView`
  width: 100%;
`;

const CourseContainer = styled.ScrollView`
  width: 100%;
`;

const Header = styled.View`
  gap: 5px;

  width: 100%;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;
`;

export default TourScreen;
