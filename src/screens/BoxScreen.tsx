import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";
import { Course, addCourse } from "@redux/slice/courseSlice";

import CourseTabContent from "@components/Box/CourseTabContent";
import WishTabContent from "@components/Box/WishTabContent";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const BoxScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.courses);

  const [isCourse, setIsCourse] = useState<boolean>(true);

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
        <MainContentsContainer>
          <TabButtonContainer>
            <Pressable onPress={() => setIsCourse(true)}>
              <TabButton
                colors={
                  isCourse
                    ? ["#1F78FC80", "#33C5AD80"]
                    : ["#1F78FC40", "#33C5AD40"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <StyledText style={{ fontSize: 17, color: "black" }}>
                  저장된 코스
                </StyledText>
              </TabButton>
            </Pressable>
            <Pressable onPress={() => setIsCourse(false)}>
              <TabButton
                colors={
                  isCourse
                    ? ["#1F78FC40", "#33C5AD40"]
                    : ["#1F78FC80", "#33C5AD80"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Image
                  source={require("@assets/icon/heart(red).png")}
                  style={{ width: 15, height: 15 }}
                />
                <StyledText style={{ fontSize: 17, color: "black" }}>
                  {" 찜 한 장소"}
                </StyledText>
              </TabButton>
            </Pressable>
          </TabButtonContainer>
          {isCourse ? (
            <TabContentsContainer
              contentContainerStyle={{ gap: 10 }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              {courses.map((course, index) => (
                <CourseTabContent course={course} key={index} />
              ))}
            </TabContentsContainer>
          ) : (
            <TabContentsContainer
              contentContainerStyle={{ gap: 10 }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              <WishTabContent title={"A 장소"} address={"대충 적당한 주소"} />
              <WishTabContent title={"B 장소"} address={"대충 적당한 주소"} />
            </TabContentsContainer>
          )}
        </MainContentsContainer>
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
`;

const MainContentsContainer = styled.View`
  flex: 1;

  width: 100%;

  padding: 25px;
`;

const TabButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const TabButton = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 6px 17px;

  border-radius: 10px;
`;

const TabContentsContainer = styled.ScrollView`
  flex: 1;

  margin-top: 8px;
`;

export default BoxScreen;
