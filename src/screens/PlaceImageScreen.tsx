import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

const PlaceImageScreen = () => {
  return (
    <Container>
      <StyledText>테스트</StyledText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: white;
`;

export default PlaceImageScreen;
