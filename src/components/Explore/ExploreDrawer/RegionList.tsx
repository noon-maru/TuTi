import { Dimensions } from "react-native";

import styled from "styled-components/native";
import { BoldStyledText } from "styles/globalStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const regions = [
  { region: "서울" },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

const RegionList = () => {
  return (
    <Container>
      <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
        {regions.map((value, index) => (
          <ScrollItem key={index}>
            <ContentText>{value.region}</ContentText>
          </ScrollItem>
        ))}
      </ScrollContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 30px;
  margin-bottom: 10px;
`;

const ScrollContainer = styled.ScrollView`
  width: ${SCREEN_WIDTH - 40}px;
`;

const ScrollItem = styled.View`
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 30px;

  border-radius: 10px;

  margin-right: 6px;

  background-color: rgba(118, 118, 128, 0.12);
`;

const ContentText = styled(BoldStyledText)`
  padding: 0;
  margin: 0;
  font-size: 15px;
  color: black;
`;

export default RegionList;
