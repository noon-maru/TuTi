import { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL, API } from "@env";

import { RootState } from "@redux/reducers";
import { updateCourse } from "@redux/slice/courseSlice";

import getTravelTime from "@utils/getTravelTime";

interface PlaceDropCheckModalProps {
  courseId: string;
  placeName: string;
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

const PlaceDropCheckModal = ({
  courseId,
  placeName,
  children,
}: PlaceDropCheckModalProps) => {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<CourseUpdateData>(
    {} as CourseUpdateData
  );

  const placeDrop = async () => {
    if (currentCourse.places!.length <= 2) {
      return Toast.show({
        type: "error",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "장소 최소 개수 오류", // 메시지 제목
        text2: "하나의 코스에는 최소 2개 이상의 장소가 있어야합니다!", // 메시지 내용
        visibilityTime: 6000, // 토스트 메시지 표시 시간 (밀리초)
      });
    }
    try {
      Toast.show({
        type: "info",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "장소 삭제 중", // 메시지 제목
        text2: `${placeName} 장소를 삭제 중입니다. 잠시만 기다려주세요!`, // 메시지 내용
        visibilityTime: 10000, // 토스트 메시지 표시 시간 (밀리초)
      });
      const courseIndex = courses.findIndex(
        (course) => course._id === courseId
      );

      const dropIndex = currentCourse.places!.findIndex(
        (place) => place.name === placeName
      );

      const places = currentCourse.places!.filter(
        (_, index) => index !== dropIndex
      );

      const updatedCourse = {
        ...currentCourse,
        placesId: places?.map((place) => place._id),
        travelTime: await getTravelTime(
          places.map((place) => ({
            x: place.longitude,
            y: place.latitude,
          }))
        ),
        totalFee: places
          .map((place) =>
            Number(place.tourismInfo.admissionFee.match(/\d+/g)[0])
          )
          .reduce((accumulator, currentValue) => accumulator + currentValue),
        // 문자열을 /를 기준으로 분리하고, 현재 장소의 ID와 같은 placeId들만 필터링
        recordImages: currentCourse.recordImages.filter(
          (recordImage) =>
            recordImage.split("/")[5] !== currentCourse.places![dropIndex]._id
        ),
      };

      const response = await axios.put(
        SERVER_URL + API + `/course/${userId}/${courseId}`,
        JSON.stringify(updatedCourse),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        updateCourse({ courseIndex, updatedCourse: response.data.course })
      );
      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "장소 삭제 성공!", // 메시지 제목
        text2: `정상적으로 ${placeName} 장소를 삭제했습니다!`, // 메시지 내용
        visibilityTime: 4000, // 토스트 메시지 표시 시간 (밀리초)
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
            <BoldStyledText style={{ fontSize: 16 }}>
              {`이 코스에서 ${placeName} 장소를 삭제하시겠습니까?`}
            </BoldStyledText>
            <StyledText>
              {`주의) 하나의 코스에는
최소 2개 이상의 장소가 있어야 됩니다!`}
            </StyledText>

            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>장소 유지</StyledText>
              </SelectionButton>

              <SelectionButton
                onPress={() => {
                  (async () => {
                    setVisible(false);
                    await placeDrop();
                  })();
                }}
              >
                <StyledText>장소 삭제</StyledText>
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
