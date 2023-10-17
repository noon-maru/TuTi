import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";

import FastImage from "react-native-fast-image";
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

import Icon from "react-native-vector-icons/AntDesign";

import axios from "axios";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { SERVER_URL } from "@env";

interface PlaceContainerProps {
  place: Place;
  isLast?: boolean;
}

const PlaceContainer = ({ place, isLast = false }: PlaceContainerProps) => {
  const [image, setImage] = useState<string>("");
  const [imageWidth, setImageWidth] = useState<number[]>([]);

  const pickImage = async () => {
    const result = await launchImageLibrary({} as ImageLibraryOptions);

    if (result.didCancel) {
      console.log("사용자가 이미지 선택을 취소했습니다.");
    } else if (result.errorCode) {
      console.log("ImagePicker Error: ", result.errorMessage);
    } else {
      const source = { uri: result.uri };
      setImage(source.uri);
    }
  };

  useEffect(() => {
    Image.getSize(SERVER_URL + place.image, (width, height) => {
      // 원본 비율 계산
      const originalAspectRatio = width / height;

      // 이미지를 화면에 표시하고 높이는 90px로 고정, 너비는 원본 비율에 따라 조절
      setImageWidth((prev) => [...prev, 90 * originalAspectRatio]);
    });
  }, [place.image]);

  return (
    <Container>
      <LineWithDiamonds>
        <TopDiamond />
        {isLast ? <BottonDiamond /> : null}
      </LineWithDiamonds>
      <PlaceContentsContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextUnderLine>
            <PlaceText>{place.name}</PlaceText>
          </TextUnderLine>
          <Image
            source={require("@assets/icon/trash(black).png")}
            style={{ width: 15, height: 15 }}
          />
        </View>
        <ScrollViewContainer>
          <ScrollView
            contentContainerStyle={{ gap: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* TODO: 사용자가 스스로 이미지를 추가할 수 있도록 수정 */}
            <Pressable onPress={() => pickImage()}>
              <FastImage
                source={{
                  uri: SERVER_URL + place.image,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={{
                  width: imageWidth[0],
                  height: "100%",
                  borderRadius: 10,
                }}
              />
              <ImageOverlay>
                <TopLeftCorner />
                <TopRightCorder />
                <BottomLeftCorner />
                <BottomRightCorner />
                <Icon name="plussquareo" size={24} color="white" />
              </ImageOverlay>
            </Pressable>
          </ScrollView>
        </ScrollViewContainer>
        {isLast ? <StyledText>코스 끝</StyledText> : null}
      </PlaceContentsContainer>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
`;

const LineWithDiamonds = styled.View`
  position: relative;

  align-items: center;

  width: 1px;
  height: 135px;

  background-color: black;
`;
const Diamond = styled.View`
  position: absolute;

  width: 5px;
  height: 5px;
  background-color: black;
  transform: rotate(45deg);
`;
const TopDiamond = styled(Diamond)`
  top: 0px;
`;
const BottonDiamond = styled(Diamond)`
  bottom: 0px;
`;

const PlaceContentsContainer = styled.View`
  width: 100%;
  margin-top: -4px;
  margin-left: 10px;
  gap: 5px;
`;

const TextUnderLine = styled.View`
  border-color: black;
  border-bottom-width: 0.5px;
  padding-bottom: 3px;
`;

const PlaceText = styled(StyledText)`
  font-size: 13px;
  line-height: 15px;
`;

const ScrollViewContainer = styled.View`
  height: 100px;
  border-radius: 10px;

  padding: 5px;

  background-color: #d9d9d9;
`;

const ImageOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Corner = styled.View`
  position: absolute;

  width: 15px;
  height: 15px;

  border-color: white;
`;
const TopLeftCorner = styled(Corner)`
  top: 10px;
  left: 10px;

  border-top-width: 1px;
  border-left-width: 1px;
`;
const TopRightCorder = styled(Corner)`
  top: 10px;
  right: 10px;

  border-top-width: 1px;
  border-right-width: 1px;
`;
const BottomLeftCorner = styled(Corner)`
  bottom: 10px;
  left: 10px;

  border-bottom-width: 1px;
  border-left-width: 1px;
`;
const BottomRightCorner = styled(Corner)`
  bottom: 10px;
  right: 10px;

  border-bottom-width: 1px;
  border-right-width: 1px;
`;

export default PlaceContainer;
