import { useEffect, useState } from "react";
import { Image, Modal, Pressable } from "react-native";
import FastImage from "react-native-fast-image";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

interface ImageCheckModalProps {
  pickImageChange: (index: number) => Promise<void>;
  pickImageDrop: (index: number) => Promise<void>;
  imageIndex: number;
  imageUri: string;
  children: React.ReactNode;
}

const ImageCheckModal = ({
  pickImageChange,
  pickImageDrop,
  imageIndex,
  imageUri,
  children,
}: ImageCheckModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [tempImageHeight, setTempImageHeight] = useState<number>(0);

  useEffect(() => {
    // 이미지 너비는 300px로 고정, 너비는 원본 비율에 따라 조절
    Image.getSize(imageUri, (width, height) =>
      setTempImageHeight(300 * (height / width))
    );
  }, [imageUri]);

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
            <StyledText style={{ fontSize: 16 }}>
              {"해당 이미지를 수정 또는 삭제하시겠습니까?"}
            </StyledText>
            <FastImage
              source={{
                uri: imageUri,
                cache: FastImage.cacheControl.immutable,
              }}
              style={{ width: 300, height: tempImageHeight, borderRadius: 10 }}
            />
            <ButtonContainer>
              <SelectionButton onPress={() => setVisible(false)}>
                <StyledText>이미지 유지</StyledText>
              </SelectionButton>
              <SelectionButton
                onPress={() => {
                  (async () => {
                    await pickImageChange(imageIndex);
                    setVisible(false);
                  })();
                }}
              >
                <StyledText>이미지 수정</StyledText>
              </SelectionButton>
              <SelectionButton
                onPress={() => {
                  (async () => {
                    await pickImageDrop(imageIndex);
                    setVisible(false);
                  })();
                }}
              >
                <StyledText>이미지 삭제</StyledText>
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
  gap: 10px;
`;

const SelectionButton = styled.Pressable`
  justify-content: center;
  align-items: center;

  padding: 10px;

  border: 1px solid #7fcfe9;
  border-radius: 7px;

  background-color: white;
`;

export default ImageCheckModal;
