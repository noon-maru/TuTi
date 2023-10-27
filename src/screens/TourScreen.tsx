import { useCallback } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LinearGradient from "react-native-linear-gradient";

import { useDispatch, useSelector } from "react-redux";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import { RootState } from "@redux/reducers";
import { setCourses } from "@redux/slice/courseSlice";

import CourseContent from "@components/Tour/CourseContent";

const isDevelopMode = DEVELOP_MODE === "true";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const getCourse = async (userId: string) => {
  try {
    if (userId === "guest") return [];

    let url = "";
    if (isDevelopMode) url = DEVELOP_SERVER_URL + API + `/course/${userId}`;
    else url = SERVER_URL + API + `/course/${userId}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const TourScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await getCourse(id);
          dispatch(setCourses(response));
        } catch (error) {
          console.error("네트워킹 오류:", error);
          throw error;
        }
      };

      fetchData();
    }, [id, dispatch])
  );

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
              .filter((course) => course.isTermination)
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
