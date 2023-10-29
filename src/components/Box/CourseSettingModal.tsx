import { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL, API } from "@env";

import { RootState } from "@redux/reducers";
import { deleteCourse, updateCourse } from "@redux/slice/courseSlice";

interface CourseSettingModalProps {
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
  isProgress?: boolean;
  isTermination?: boolean;
}

const CourseSettingModal = ({
  courseId,
  children,
}: CourseSettingModalProps) => {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<CourseUpdateData>(
    {} as CourseUpdateData
  );

  const courseDrop = async () => {
    try {
      Toast.show({
        type: "info",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "코스 삭제 중", // 메시지 제목
        text2: `${currentCourse.courseName} 코스를 삭제 중입니다. 잠시만 기다려주세요!`, // 메시지 내용
        visibilityTime: 10000, // 토스트 메시지 표시 시간 (밀리초)
      });

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
        visibilityTime: 4000, // 토스트 메시지 표시 시간 (밀리초)
      });
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  };

  const courseProgress = async () => {
    const isProgressCourse = courses.find((course) => course.isProgress);
    if (isProgressCourse) {
      return Toast.show({
        type: "error",
        position: "bottom",
        text1: "중복 오류",
        text2: "이미 진행 중인 코스가 존재합니다.",
        visibilityTime: 5000,
      });
    }
    const courseIndex = courses.findIndex((course) => course._id === courseId);

    // 이미지 정보를 수정하기 위해 기존 코스 객체를 복사
    const courseToUpdate = courses[courseIndex];

    // 업데이트 된 코스 정보
    const updatedCourse = {
      ...courseToUpdate,
      placesId: courseToUpdate.places.map((place) => place._id),
      isProgress: true,
      isTermination: false,
    } as Course;

    await axios.put(
      SERVER_URL + API + `/course/${userId}/${courseId}`,
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
      text1: "코스 진행 상태 변경", // 메시지 제목
      text2: `${currentCourse.courseName} 코스가 현재 진행 중 코스로 변경되었습니다!`, // 메시지 내용
      visibilityTime: 4000, // 토스트 메시지 표시 시간 (밀리초)
    });
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
              {`${currentCourse.courseName} 코스 설정`}
            </BoldStyledText>
            {currentCourse.isTermination ? (
              <>
                <StyledText>
                  {"해당 코스는 진행이 완료되어 종료된 코스입니다."}
                </StyledText>
                <StyledText style={{ textAlign: "center" }}>
                  {`해당 코스를 다시 진행 상태로 바꾸거나
삭제하시겠습니까?`}
                </StyledText>
              </>
            ) : currentCourse.isProgress ? (
              <>
                <StyledText>
                  {"해당 코스는 현재 진행 중인 코스입니다."}
                </StyledText>
                <StyledText>{"해당 코스를 삭제하시겠습니까?"}</StyledText>
              </>
            ) : (
              <>
                <StyledText>
                  {"해당 코스는 아직 진행 하지 않은 상태의 코스입니다."}
                </StyledText>
                <StyledText style={{ textAlign: "center" }}>
                  {`해당 코스를 진행 중인 코스로 변경하거나
삭제하시겠습니까?`}
                </StyledText>
              </>
            )}
            <StyledText>
              {"주의) 삭제 된 코스는 다시 복구할 수 없습니다!"}
            </StyledText>

            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>취소</StyledText>
              </SelectionButton>

              {(!currentCourse.isProgress || currentCourse.isTermination) && (
                <SelectionButton
                  onPress={() => {
                    (async () => {
                      setVisible(false);
                      await courseProgress();
                    })();
                  }}
                >
                  <StyledText>코스 진행</StyledText>
                </SelectionButton>
              )}
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

export default CourseSettingModal;
