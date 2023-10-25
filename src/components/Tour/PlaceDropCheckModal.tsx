import { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL, API } from "@env";

import { RootState } from "@redux/reducers";
import { updateCourse } from "@redux/slice/courseSlice";

interface PlaceDropCheckModalProps {
  courseId: string;
  placeName: string;
  pickImageChange?: (index: number) => Promise<void>;
  pickImageDrop?: (index: number) => Promise<void>;
  imageIndex?: number;
  imageUri?: string;
  children: React.ReactNode;
}

const PlaceDropCheckModal = ({
  courseId,
  placeName,
  children,
}: PlaceDropCheckModalProps) => {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course>({} as Course);

  const placeDrop = async () => {
    try {
      // places에서 해당하는 place를 제거하고 place._id 배열을 반환
      setCurrentCourse((prev) => ({
        ...prev,
        places:
          typeof prev.places === "string[]"
            ? [prev.places]
            : (prev.places as Place[])
                .filter((place) => place.name !== placeName)
                .map((place) => place._id),
      }));

      const courseIndex = courses.findIndex(
        (course) => course.courseName === currentCourse.courseName
      );

      console.log(currentCourse.places?.map((place) => place.name));

      // dispatch(updateCourse({ courseIndex, updatedCourse: currentCourse }));

      const response = await axios.put(
        SERVER_URL + API + `/course/${userId}/${courseId}`,
        JSON.stringify(currentCourse),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
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
            <BoldStyledText style={{ fontSize: 16 }}>
              {`이 코스에서 ${placeName} 장소를 삭제하시겠습니까?`}
            </BoldStyledText>
            <StyledText>
              {`주의) 하나의 코스에는
최소 두개의 장소가 있어야 됩니다!`}
            </StyledText>

            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>코스 유지</StyledText>
              </SelectionButton>

              <SelectionButton
                onPress={() => {
                  (async () => {
                    await placeDrop();
                    setVisible(false);
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

export default PlaceDropCheckModal;
