import { useState } from "react";
import { Modal, Pressable } from "react-native";

import styled from "styled-components/native";

import { StyledText } from "@styles/globalStyles";

interface ModalProps {
  handleCourseProgress: () => void;
  children: React.ReactNode;
}

const CheckModal = ({ handleCourseProgress, children }: ModalProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>{children}</Pressable>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Container>
          <PopoverContainer>
            <StyledText style={{ fontSize: 16 }}>
              {"정말로 해당 코스를 종료하시겠습니까?"}
            </StyledText>
            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>코스 유지</StyledText>
              </SelectionButton>
              <SelectionButton
                onPress={() => {
                  setVisible(false);
                  handleCourseProgress();
                }}
              >
                <StyledText>코스 종료</StyledText>
              </SelectionButton>
            </ButtonContainer>
          </PopoverContainer>
        </Container>
      </Modal>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopoverContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 150px;

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

export default CheckModal;
