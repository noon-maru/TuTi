import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

const WishHeader = () => {
  return (
    <Container>
      <WishPlacesTextContainer>
        <WishIcon source={require("@assets/icon/heart(color).png")} />
        <WishPlacesText> 찜 한 장소 보기</WishPlacesText>
      </WishPlacesTextContainer>
      <MoreDetails>더보기</MoreDetails>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WishPlacesTextContainer = styled(StyledText)`
  color: black;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WishIcon = styled.Image`
  width: 13px;
  height: 13px;
`;

const WishPlacesText = styled.Text`
  color: black;
  font-size: 15px;
`;

const MoreDetails = styled.Text`
  font-size: 15px;
  color: #6c6c6c;
  text-decoration-line: underline;
`;

export default WishHeader;
