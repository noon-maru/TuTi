import { Image, ScrollView, View } from "react-native";

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

interface PlaceContainerProps {
  placeName: string;
  isLast?: boolean;
}

const PlaceContainer = ({ placeName, isLast = false }: PlaceContainerProps) => {
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
            <PlaceText>{placeName}</PlaceText>
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
            <StyledText>대충 이미지 들어갈 위치</StyledText>
            <StyledText>대충 이미지 들어갈 위치</StyledText>
            <StyledText>대충 이미지 들어갈 위치</StyledText>
          </ScrollView>
        </ScrollViewContainer>
        {isLast ? <StyledText>코스 종료</StyledText> : null}
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
  height: 100px;

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
  color: black;
`;

const ScrollViewContainer = styled.View`
  height: 70px;
  border-radius: 10px;

  padding: 5px;

  background-color: #d9d9d9;
`;

export default PlaceContainer;
