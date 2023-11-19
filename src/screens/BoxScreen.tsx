import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, Pressable } from "react-native";
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

import CourseTabContent from "@components/Box/CourseTabContent";
import WishTabContent from "@components/Box/WishTabContent";

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

const getWishPlace = async (userId: string) => {
  try {
    if (userId === "guest") return [];

    let url = "";
    if (isDevelopMode)
      url = DEVELOP_SERVER_URL + API + `/users/${userId}/wishPlace`;
    else url = SERVER_URL + API + `/users/${userId}/wishPlace`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const BoxScreen = ({ navigation, route }: any) => {
  const { fromHome } = route.params;
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);

  const [wishPlaces, setWishPlaces] = useState<Place[]>([]);
  const [isCourse, setIsCourse] = useState<boolean>(!fromHome);

  const dataSetting = useCallback(() => {
    const fetchData = async () => {
      try {
        dispatch(setCourses(await getCourse(id)));
        setWishPlaces(await getWishPlace(id));
      } catch (error) {
        console.error("네트워킹 오류:", error);
        throw error;
      }
    };

    fetchData();
  }, [id, dispatch]);

  useFocusEffect(dataSetting);

  useEffect(() => dataSetting(), [dataSetting]);

  useEffect(() => {
    setIsCourse(!fromHome);
  }, [fromHome]);

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
                  {"저장된 코스"}
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
                  {"찜 한 장소"}
                </StyledText>
              </TabButton>
            </Pressable>
          </TabButtonContainer>
          {isCourse ? (
            courses.length !== 0 ? (
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
              <EmptyTabContentsContainer>
                <Icon source={require("@assets/icon/route(color).png")} />
                <StyledText
                  style={{ textAlign: "center" }}
                >{`저장한 코스가 없습니다.
원하는 코스를 저장해 보세요!`}</StyledText>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Course");
                  }}
                >
                  <RecommendedButton
                    colors={["#90BEFB", "#99E0D8"]} // 그라데이션 색상 배열
                    start={{ x: 0, y: 0 }} // 그라데이션 시작점 (왼쪽 상단) (범위: 0~1)
                    end={{ x: 1, y: 1 }} // 그라데이션 끝점 (오른쪽 상단) (범위: 0~1)
                  >
                    <StyledText>{"추천 코스 보러가기"}</StyledText>
                  </RecommendedButton>
                </Pressable>
              </EmptyTabContentsContainer>
            )
          ) : wishPlaces.length !== 0 ? (
            <TabContentsContainer
              contentContainerStyle={{ gap: 10 }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              {wishPlaces?.map((wishPlace, index) => (
                <WishTabContent
                  key={index}
                  wishPlace={wishPlace}
                  setWishPlaces={setWishPlaces}
                />
              ))}
            </TabContentsContainer>
          ) : (
            <EmptyTabContentsContainer>
              <Icon source={require("@assets/icon/heart(line-red).png")} />
              <StyledText
                style={{ textAlign: "center" }}
              >{`찜 한 장소가 없습니다
관심 있는 장소에 하트를 눌러보세요`}</StyledText>
              <Pressable
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <RecommendedButton
                  colors={["#90BEFB", "#99E0D8"]} // 그라데이션 색상 배열
                  start={{ x: 0, y: 0 }} // 그라데이션 시작점 (왼쪽 상단) (범위: 0~1)
                  end={{ x: 1, y: 1 }} // 그라데이션 끝점 (오른쪽 상단) (범위: 0~1)
                >
                  <StyledText>{"추천 장소 보러가기"}</StyledText>
                </RecommendedButton>
              </Pressable>
            </EmptyTabContentsContainer>
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
  gap: 5px;
  align-items: center;

  width: 100%;
  padding: 6px 17px;

  border-radius: 10px;
`;

const TabContentsContainer = styled.ScrollView`
  flex: 1;

  margin-top: 8px;
`;

const EmptyTabContentsContainer = styled.View`
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 90%;

  border-width: 1px;
  border-color: #7fcfe9;
  border-radius: 10px;

  margin-top: 10%;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;

const RecommendedButton = styled(LinearGradient)`
  padding: 8px 43px;

  border-radius: 10px;
`;

export default BoxScreen;
