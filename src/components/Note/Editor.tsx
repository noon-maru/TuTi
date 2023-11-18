import { useEffect, useRef, useState } from "react";
import { Animated, Image, ScrollView } from "react-native";
import type { ColorValue } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { API, SERVER_URL } from "@env";

import styled from "styled-components/native";

import { StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";
import { updateCourse } from "@redux/slice/courseSlice";

import TitleImage from "./TitleImage";

const handleHead1 = ({ tintColor }: { tintColor: ColorValue }) => (
  <StyledText style={{ color: tintColor }}>H1</StyledText>
);
const handleHead2 = ({ tintColor }: { tintColor: ColorValue }) => (
  <StyledText style={{ color: tintColor }}>H2</StyledText>
);
const handleHead3 = ({ tintColor }: { tintColor: ColorValue }) => (
  <StyledText style={{ color: tintColor }}>H3</StyledText>
);

interface EditorProps {
  courseName: string;
}

const Editor = ({ courseName }: EditorProps) => {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);

  const richText = useRef<RichEditor | null>(null);
  const dynamicHeight = useRef(new Animated.Value(0)).current;

  const [course, setCourse] = useState<Course>();
  const [courseIndex, setCourseIndex] = useState<number>(0);
  const [postContent, setPostContent] = useState<string>();
  const [lock, setLock] = useState<boolean>(true);
  const [editorHeight, setEditorHeight] = useState<number>(0);

  const animatedStyle = {
    height: dynamicHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 50 + editorHeight], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  const handleHeightChange = (newHeight: number) => {
    setEditorHeight(newHeight);
  };

  const handlePostSave = async () => {
    try {
      if (!course) {
        return;
      }

      // 업데이트 된 코스 정보
      const updatedCourse = {
        ...course,
        placesId: course.places.map((place) => place._id),
        postContent,
      } as Course;

      await axios.put(
        SERVER_URL + API + `/course/${userId}/${course._id}`,
        JSON.stringify(updatedCourse),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(updateCourse({ courseIndex, updatedCourse }));

      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "저장 성공!", // 메시지 제목
        text2: `${courseName} 코스의 노트에 작성한 내용을 저장했습니다!`, // 메시지 내용
        visibilityTime: 4000, // 토스트 메시지 표시 시간 (밀리초)
      });
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  };

  useEffect(() => {
    const foundCourseIndex = courses.findIndex(
      (item) => item.courseName === courseName
    );
    setCourseIndex(foundCourseIndex);
    setCourse(courses[foundCourseIndex]);
    setPostContent(courses[foundCourseIndex].postContent);
  }, [courseName, courses]);

  useEffect(() => {
    // 애니메이션 값 변경
    Animated.timing(dynamicHeight, {
      toValue: editorHeight > 150 ? 1 : 0, // 확장되거나 축소될 때의 값
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  }, [dynamicHeight, editorHeight]);

  return (
    <Container style={animatedStyle}>
      {/* 왜 그러는지 전혀 알 수 없지만, Android에서 RichEditor컴포넌트를
      ScrollView로 감싸야지만 강제 종료가 되지 않는다. */}
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <StyledEditor
          ref={richText}
          initialContentHTML={postContent}
          onChange={(content) => setPostContent(content)}
          placeholder={
            "여행 중 또는 여행이 끝나고, 기록하고 싶은 것들을 적어보세요!"
          }
          onHeightChange={handleHeightChange}
          disabled={lock}
        />
      </ScrollView>
      <TitleImageContainer>
        <TitleImage courseName={courseName} />
      </TitleImageContainer>
      {/* 트래픽이 어느정도가 될지 알 수가 없어, 일단은 lock을 할 때마다 저장하도록 설정 */}
      <LockButton
        onPress={async () => {
          if (!lock) {
            await handlePostSave();
          }
          setLock((prev) => !prev);
        }}
      >
        {lock ? (
          <Image
            source={require("@assets/icon/lock.png")}
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <Image
            source={require("@assets/icon/unlock.png")}
            style={{ width: 40, height: 40 }}
          />
        )}
      </LockButton>

      {lock ? null : (
        <Toolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.checkboxList,
            actions.insertLink,
            actions.heading1,
            actions.heading2,
            actions.heading3,
            actions.undo,
            actions.redo,
          ]}
          iconMap={{
            [actions.heading1]: handleHead1,
            [actions.heading2]: handleHead2,
            [actions.heading3]: handleHead3,
          }}
        />
      )}
    </Container>
  );
};

const Container = styled(Animated.View)`
  margin-top: 8px;

  border-width: 1px;
  border-color: #acaeaf;
  border-radius: 10px;
`;

const StyledEditor = styled(RichEditor)`
  flex: 1;

  padding-top: 3px;
  padding-bottom: 10px;
  padding-left: 3px;
  padding-right: 110px;
`;

const LockButton = styled.Pressable`
  position: absolute;

  top: 7px;
  right: 7px;
`;

const TitleImageContainer = styled.View`
  position: absolute;
  top: 55px;
  right: 15px;
`;

const Toolbar = styled(RichToolbar)`
  height: 50px;

  border-top-width: 1px;
  border-top-color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  background-color: white;
`;

export default Editor;
