import { useCallback, useState } from "react";
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
import { StyledText } from "@styles/globalStyles";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import { RootState } from "@redux/reducers";
import { setCourseContainerHeight } from "@redux/slice/courseDrawerSlice";
import { Course } from "@redux/slice/courseSlice";

import PlaceSearch from "@components/Course/PlaceSearch";
import WishPlacesByRegion from "@components/Course/WishPlacesByRegion";
import CourseDrawer from "@components/Course/CourseDrawer";

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

  const [wishPlaces, setWishPlaces] = useState<WishPlace[]>([]);

  const [course, setCourse] = useState<Course>({
    courseName: "",
    travelTime: [],
    places: [
      {
        _id: "",
        region: "",
        name: "",
        address: "",
        image: "",
        numberHearts: 0,
        tags: [],
      },
      {
        _id: "",
        region: "",
        name: "",
        address: "",
        image: "",
        numberHearts: 0,
        tags: [],
      },
    ],
    totalFee: 0,
    isProgress: false,
  });

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setCourseContainerHeight(height));
  };

  const handleAddStopover = (index: number) => {
    setCourse((prev) => {
      const newPlaces = [...prev.places]; // 원본 배열을 복사

      newPlaces.splice(index + 1, 0, {
        _id: "",
        region: "",
        name: "",
        address: "",
        image: "",
        numberHearts: 0,
        tags: [],
      });

      return {
        ...prev,
        places: newPlaces,
      };
    });
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
                <View style={{ height: 40 }} />
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
