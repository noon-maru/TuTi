import { Image } from "react-native";
import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import GradientText from "@components/GradientText";

const Picture = () => {
  return (
    <Container>
      <ImageFrame>
        <Image
          source={require("@assets/icon/star.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </ImageFrame>
      <InformContainer>
        <RatingContainer>
          <GradientText
            colors={["#518FFF", "#33E1C0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            {"★★★★☆"}
          </GradientText>
          <StyledText style={{ fontSize: 13, color: "#777777" }}>
            {"@qorhvk_22"}
          </StyledText>
        </RatingContainer>
        <StyledText style={{ fontSize: 13, color: "#777777" }}>
          {
            "꽃이 피는 시즌에 맞춰 가시면 파란 하늘과 노란 꽃들 사이에서 인생샷을 건지실 수 있습니다~^^"
          }
        </StyledText>
      </InformContainer>
    </Container>
  );
};

const Container = styled.View``;

const ImageFrame = styled.View`
  width: 100%;
  height: 350px;

  border: 1px solid #7fcfe9;
  border-radius: 25px;
`;

const InformContainer = styled.View`
  gap: 10px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default Picture;
