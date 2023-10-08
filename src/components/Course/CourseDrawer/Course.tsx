import { Image } from "react-native";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

const Course = () => {
  return (
    <Container>
      <Image
        source={require("@assets/icon/star.png")}
        style={{ width: 60, height: 60 }}
      />
      <ContentsContainer>
        <BoldStyledText>{`ex) 날 좋은날 한강공원 나들이`}</BoldStyledText>
        <StyledText
          style={{ fontSize: 14, color: "#777777" }}
        >{`출발지 -> 경유지 -> 경유지 -> 도착지
총 비용 : <단어 수정 필요> : `}</StyledText>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  gap: 15px;

  width: 100%;
  height: 84px;

  border: 1px solid #7fcfe9;
  border-radius: 10px;

  padding: 10px 10px;

  background-color: white;
`;

const ContentsContainer = styled.View``;

export default Course;
