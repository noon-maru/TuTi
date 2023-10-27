import { useState } from "react";
import { Modal, Pressable } from "react-native";

import { useSelector } from "react-redux";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";

interface CourseRegistrationModalProps {
  handleCourseRegistration: (
    userId: string,
    courseName: string
  ) => Promise<any>;

  children: React.ReactNode;
}

const CourseRegistrationModal = ({
  handleCourseRegistration,
  children,
}: CourseRegistrationModalProps) => {
  const { id } = useSelector((state: RootState) => state.user);

  const [visible, setVisible] = useState(false);
  const [courseName, setCourseName] = useState<string>("");

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={{
          alignSelf: "flex-end",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        {children}
      </Pressable>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
      >
        <Container onPress={() => setVisible(false)}>
          <ModalWindowContainer>
            <StyledText style={{ fontSize: 16 }}>
              {"등록할 코스의 이름을 지어주세요!"}
            </StyledText>
            <CourseNameInput
              placeholder="ex) 맑은 날 한강공원 나들이"
              placeholderTextColor={"#3C3C43"}
              onChangeText={(text: string) => setCourseName(text)}
              value={courseName}
            />
            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>취소</StyledText>
              </SelectionButton>
              <SelectionButton
                onPress={() => {
                  (async () => {
                    setVisible(false);
                    await handleCourseRegistration(id, courseName);
                  })();
                }}
              >
                <StyledText>코스 등록</StyledText>
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

  padding: 30px;

  gap: 20px;

  background-color: white;
`;

const CourseNameInput = styled.TextInput`
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 17px;

  width: 250px;

  border-radius: 20px;

  background-color: #e4e4e4;
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

export default CourseRegistrationModal;
