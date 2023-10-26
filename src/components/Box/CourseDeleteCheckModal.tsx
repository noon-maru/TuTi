import { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL, API } from "@env";

import { RootState } from "@redux/reducers";
import { deleteCourse } from "@redux/slice/courseSlice";

interface CourseDeleteCheckModalProps {
  courseId: string;
  children: React.ReactNode;
}

interface CourseUpdateData {
  _id: string;
  courseName: string;
  places?: Place[];
  placesId?: string[];
  travelTime: number[];
  totalFee: number;
  recordImages: string[];
}

const CourseDeleteCheckModal = ({
  courseId,
  children,
}: CourseDeleteCheckModalProps) => {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<CourseUpdateData>(
    {} as CourseUpdateData
  );

  const courseDrop = async () => {
    try {
      const courseIndex = courses.findIndex(
        (course) => course._id === courseId
      );

      await axios.delete(SERVER_URL + API + `/course/${userId}/${courseId}`);

      dispatch(deleteCourse(courseIndex));

      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "코스 삭제 성공!", // 메시지 제목
        text2: `정상적으로 ${currentCourse.courseName} 코스를 삭제했습니다!`, // 메시지 내용
        visibilityTime: 6000, // 토스트 메시지 표시 시간 (밀리초)
      });
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  };

  useEffect(() => {
    const result = courses.find((course) => courseId === course._id);
    if (!result) {
      return;
    }
    setCurrentCourse(result);
  }, [courseId, courses]);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>{children}</Pressable>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
      >
        <Container onPress={() => setVisible(false)}>
          <ModalWindowContainer>
            <BoldStyledText style={{ fontSize: 17 }}>
              {`${currentCourse.courseName} 코스를 삭제하시겠습니까?`}
            </BoldStyledText>
            <StyledText>
              {"주의) 삭제 된 코스는 다시 복구할 수 없습니다!"}
            </StyledText>

            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>코스 유지</StyledText>
              </SelectionButton>

              <SelectionButton
                onPress={() => {
                  (async () => {
                    setVisible(false);
                    await courseDrop();
                  })();
                }}
              >
                <StyledText>코스 삭제</StyledText>
              </SelectionButton>
            </ButtonContainer>
          </ModalWindowContainer>
        </Container>
      </Modal>
    </>
  );
};

const Container = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWindowContainer = styled.Pressable`
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  border-width: 0.5px;
  border-color: #efeff0;

  padding: 10px;

  gap: 20px;

  background-color: white;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const SelectionButton = styled.Pressable`
  justify-content: center;
  align-items: center;

  padding: 10px;

  border: 1px solid #7fcfe9;
  border-radius: 7px;

  background-color: white;
`;

export default CourseDeleteCheckModal;
