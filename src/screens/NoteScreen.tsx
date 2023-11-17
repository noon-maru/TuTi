import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SectionList,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { API, SERVER_URL } from "@env";

import styled from "styled-components/native";

import { StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";
import { setCourses } from "@redux/slice/courseSlice";

import Post from "@components/Note/Post";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const getCourse = async (userId: string) => {
  try {
    if (userId === "guest") return [];

    const url = SERVER_URL + API + `/course/${userId}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

// 오브젝트 ID에서 날짜 분리하는 함수
// const dateFromObjectId = (objectId: string) => {
//   const utcDate = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
//   const formattedDate = `${utcDate.getUTCFullYear()}/${utcDate.getMonth()}/${utcDate.getDate()}`;
//   return formattedDate;
// };

const NoteScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);

  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const dataSetting = useCallback(() => {
    const fetchData = async () => {
      try {
        dispatch(setCourses(await getCourse(id)));
      } catch (error) {
        console.error("네트워킹 오류:", error);
        throw error;
      }
    };

    fetchData();
  }, [id, dispatch]);

  useFocusEffect(dataSetting);

  useEffect(() => dataSetting(), [dataSetting]);

  // 섹션 데이터 생성 함수
  const createSections = () => {
    return [
      {
        title: "진행 중 Tour",
        data: courses.filter(
          (course) => course.isProgress && !course.isTermination
        ),
      },
      {
        title: "진행 예정 Tour",
        data: courses.filter(
          (course) => !course.isProgress && !course.isTermination
        ),
      },
      {
        title: "종료된 Tour",
        data: courses.filter(
          (course) => !course.isProgress && course.isTermination
        ),
      },
    ];
  };

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <Container>
          <SectionList
            style={{ width: "100%" }}
            sections={createSections()}
            keyExtractor={(_, index) => index.toString()} // 각 아이템에 대한 고유한 키 제공
            renderItem={({ item }) => (
              <Post headTitle={item.courseName} date={item.startDate} />
            )}
            renderSectionHeader={({ section }) => (
              <Header>
                <StyledText style={{ fontSize: 15 }}>
                  {section.title}
                </StyledText>
                <GradientLine
                  colors={["#90BEFB", "#99E1D7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.7, y: 0 }}
                />
              </Header>
            )}
            showsVerticalScrollIndicator={false}
            bounces={false}
            stickySectionHeadersEnabled
          />
          {/* 안드로이드에서 키보드가 활성화될 때만 패딩 추가 */}
          {Platform.OS === "android" && keyboardIsVisible && (
            <View style={{ height: 300 }} />
          )}
        </Container>
      </KeyboardAvoidingView>
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
  align-items: center;

  padding: 0 25px;
  margin-top: 53px;
`;

const Header = styled.View`
  gap: 5px;
  width: 100%;

  margin-bottom: 10px;

  background-color: white;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;
`;

export default NoteScreen;
