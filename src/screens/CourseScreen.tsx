import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import axios from "axios";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import { RootState } from "@redux/reducers";
import { setCourseContainerHeight } from "@redux/slice/courseDrawerSlice";

import PlaceSearch from "@components/Course/PlaceSearch";
import WishPlacesByRegion from "@components/Course/WishPlacesByRegion";
import CourseDrawer from "@components/Course/CourseDrawer";
import CourseRegistrationModal from "@components/Course/CourseRegistrationModal";

import getTravelTime from "@utils/getTravelTime";

const isDevelopMode = DEVELOP_MODE === "true";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const regions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "강원",
  "제주",
];

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

const CourseScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.user);

  const [wishPlaces, setWishPlaces] = useState<Place[]>([]);

  const [course, setCourse] = useState<Course>({
    places: [{} as Place, {} as Place],
  } as Course);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setCourseContainerHeight(height));
  };

  const handleAddStopover = (index: number) => {
    setCourse((prev) => {
      const newPlaces = [...prev.places]; // 원본 배열을 복사
      newPlaces.splice(index + 1, 0, {} as Place);

      return {
        ...prev,
        places: newPlaces,
      };
    });
  };

  const handleCourseRegistration = async (
    userId: string,
    courseName: string
  ) => {
    Toast.show({
      type: "info",
      position: "bottom", // 토스트 메시지 위치 (top, bottom)
      text1: "코스 등록 중", // 메시지 제목
      text2: `${courseName} 코스를 등록 중입니다. 잠시만 기다려주세요!`, // 메시지 내용
      visibilityTime: 10000, // 토스트 메시지 표시 시간 (밀리초)
    });
    try {
      let url = "";
      if (isDevelopMode) url = DEVELOP_SERVER_URL + API + `/course/${userId}`;
      else url = SERVER_URL + API + `/course/${userId}`;

      const jsonData = {
        courseName,
        placesId: course.places.map((place) => place._id),
        // 카카오 모빌리티 다중 경유지 길찾기 API를 통해 실시간으로 이동 시간을 받아온다.
        travelTime: await getTravelTime(
          course.places.map((place) => ({
            x: place.longitude,
            y: place.latitude,
          }))
        ),
        // 각 장소의 admissionFee를 전부 합한 값
        // admissionFee는 "성인: 1000원, 아이: 500원" 형태의 문자열이므로,
        // match(/\d+/g)를 통해 숫자만 따로 분리해준 뒤,
        // 각 첫번째 값(일반적으로 성인 요금)을 숫자로 변환하여 더해준다.
        totalFee: course.places
          .map((place) =>
            Number(place.tourismInfo.admissionFee.match(/\d+/g)[0])
          )
          .reduce((accumulator, currentValue) => accumulator + currentValue),
      };

      const isArrayOfTypeNumber = (arr: any[]): arr is number[] => {
        return arr.every((item) => typeof item === "number");
      };

      if (!isArrayOfTypeNumber(jsonData.travelTime))
        throw new Error(`${jsonData.travelTime[0]}, ${jsonData.travelTime[1]}`);

      const response = await axios.post(url, JSON.stringify(jsonData), {
        headers: { "Content-Type": "application/json" },
      });

      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "코스 등록 성공!", // 메시지 제목
        text2: `정상적으로 ${courseName} 코스를 등록했습니다!`, // 메시지 내용
        visibilityTime: 6000, // 토스트 메시지 표시 시간 (밀리초)
      });

      return response.data;
    } catch (error: any) {
      if (Number(error.message.match(/\d+/g)) === 409)
        Toast.show({
          type: "error",
          position: "bottom", // 토스트 메시지 위치 (top, bottom)
          text1: "중복 오류", // 메시지 제목
          text2: "등록을 시도한 코스와 중복된 장소를 가지는 코스가 있습니다!", // 메시지 내용
          visibilityTime: 6000, // 토스트 메시지 표시 시간 (밀리초)
        });
      else if (Number(error.message.match(/\d+/g)) <= 304) {
        Toast.show({
          type: "error",
          position: "bottom", // 토스트 메시지 위치 (top, bottom)
          text1: "이동 시간 계산 실패", // 메시지 제목
          text2: `code ${error.message}`, // 메시지 내용
          visibilityTime: 6000, // 토스트 메시지 표시 시간 (밀리초)
        });
      } else {
        console.error("네트워킹 오류:", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setWishPlaces(await getWishPlace(id));
        } catch (error) {
          console.error("네트워킹 오류:", error);
          throw error;
        }
      };

      fetchData();
    }, [id])
  );

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container onLayout={handleContainerLayout}>
        <ScrollView
          style={{ width: "100%", marginBottom: 50 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {course.places.map((_, index, array) => (
            <PlaceContainer key={index}>
              <PlaceSearch
                index={index}
                title={
                  index === 0
                    ? "출발지"
                    : index === array.length - 1
                    ? "도착지"
                    : "경유지"
                }
                course={course}
                setCourse={setCourse}
              />
              {index === array.length - 1 ? (
                array.every((place) => !!place.name) ? (
                  <CourseRegistrationModal
                    handleCourseRegistration={handleCourseRegistration}
                  >
                    <AddStopoverButton
                      colors={["#C8E0FD", "#CCF0EC"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <BoldStyledText>{"코스 등록"}</BoldStyledText>
                    </AddStopoverButton>
                  </CourseRegistrationModal>
                ) : (
                  <View style={{ height: 50 }} />
                )
              ) : (
                <Pressable
                  onPress={() => handleAddStopover(index)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <AddStopoverButton
                    colors={["#C8E0FD", "#CCF0EC"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <StyledText>{"경유지 추가"}</StyledText>
                  </AddStopoverButton>
                </Pressable>
              )}
            </PlaceContainer>
          ))}
          {regions
            .filter((region) =>
              wishPlaces.some((wishPlace) => wishPlace.region === region)
            )
            .map((region, index) => (
              <WishPlacesByRegion
                key={index}
                setCourse={setCourse}
                region={region}
                wishPlaces={wishPlaces.filter(
                  (wishPlace) => wishPlace.region === region
                )}
              />
            ))}
        </ScrollView>
        <CourseDrawer setCourse={setCourse} />
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

  padding: 30px;
`;

const PlaceContainer = styled.View``;

const AddStopoverButton = styled(LinearGradient)`
  padding: 5px 12px;

  border-radius: 7px;
`;

export default CourseScreen;
