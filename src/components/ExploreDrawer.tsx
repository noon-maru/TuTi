import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ExploreDrawer = () => {
  return (
    <DrawerContainer>
      <PullBar />
      <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
        <ScrollItem>
          <ContentText>서울</ContentText>
        </ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
        <ScrollItem></ScrollItem>
      </ScrollContainer>
    </DrawerContainer>
  );
};

const DrawerContainer = styled.View`
  position: absolute;
  bottom: 0;

  align-items: center;

  width: ${SCREEN_WIDTH}px;
  height: 65px;
  border-radius: 30px 30px 0 0;

  padding: 8px 0;

  background-color: white;
`;

const PullBar = styled.View`
  width: ${SCREEN_WIDTH - 90}px;
  height: 5px;

  margin-bottom: 11px;

  border-radius: 50px;

  background-color: #959595;
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

const ContentText = styled.Text`
  padding: 0;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: black;
`;
export default ExploreDrawer;
