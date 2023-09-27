import { useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "styles/globalStyles";

interface CourseTabContentProps {
  title: string;
  duration: string;
}

const CourseTabContent = ({ title, duration }: CourseTabContentProps) => {
  const [expanded, setExpanded] = useState(false);
  const dynamicHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);

    // 애니메이션 값 변경
    Animated.timing(dynamicHeight, {
      toValue: expanded ? 0 : 1, // 확장되거나 축소될 때의 값
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  };

  const animatedStyle = {
    height: dynamicHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [36, 360], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  return (
    <Container style={[animatedStyle]}>
      <Pressable onPress={toggleExpand}>
        <Header
          colors={
            expanded ? ["#1F78FC80", "#33C5AD80"] : ["#1F78FC40", "#33C5AD40"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TitleTextContainer>
            <BoldStyledText
              style={{ fontSize: 15, color: "black" }}
            >{`□ ${title}`}</BoldStyledText>
            <StyledText style={{ fontSize: 13, color: "#777777" }}>
              {duration}
            </StyledText>
          </TitleTextContainer>
          {expanded ? (
            <Image
              source={require("@assets/icon/unfold.png")}
              style={{ width: 12, height: 11.74 }}
            />
          ) : (
            <Image
              source={require("@assets/icon/open.png")}
              style={{ width: 12, height: 11.74 }}
            />
          )}
        </Header>
      </Pressable>
      <ContentsBox>
        <LineContainer>
          <LineWithDiamonds>
            <TopDiamond />
          </LineWithDiamonds>
          <LineWithDiamonds>
            <TopDiamond />
          </LineWithDiamonds>
          <LineWithDiamonds>
            <TopDiamond />
            <BottonDiamond />
          </LineWithDiamonds>
        </LineContainer>
        <TextContainer>
          <TextUnderLine>
            <PlaceText>A장소</PlaceText>
          </TextUnderLine>
          <TextUnderLine>
            <PlaceText>B장소</PlaceText>
          </TextUnderLine>
          <TextUnderLine>
            <PlaceText>C장소</PlaceText>
          </TextUnderLine>
          <TextUnderLine>
            <PlaceText>D장소</PlaceText>
          </TextUnderLine>
        </TextContainer>
        <ScrollViewContainer>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <StyledText>대충 이미지 들어갈 위치</StyledText>
            <StyledText>대충 이미지 들어갈 위치</StyledText>
            <StyledText>대충 이미지 들어갈 위치</StyledText>
          </ScrollView>
        </ScrollViewContainer>
        <DeleteContainer>
          <Image
            source={require("@assets/icon/trash.png")}
            style={{ width: 15, height: 15 }}
          />
          <Image
            source={require("@assets/icon/trash.png")}
            style={{ width: 15, height: 15 }}
          />
          <Image
            source={require("@assets/icon/trash.png")}
            style={{ width: 15, height: 15 }}
          />
          <Image
            source={require("@assets/icon/trash.png")}
            style={{ width: 15, height: 15 }}
          />
        </DeleteContainer>
      </ContentsBox>
    </Container>
  );
};

const Container = styled(Animated.View)`
  overflow: hidden;

  border-width: 1px;
  border-color: #7fcfe9;
  border-radius: 10px;
`;

const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 36px;

  padding: 0 15px;
`;

const TitleTextContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ContentsBox = styled.View`
  flex-direction: row;
  gap: 10px;

  padding-top: 25px;
  padding-bottom: 30px;
  padding-left: 23px;
  padding-right: 23px;
`;

const LineContainer = styled.View``;

const LineWithDiamonds = styled.View`
  position: relative;

  align-items: center;

  width: 1px;
  height: 90px;

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

const TextContainer = styled.View`
  margin-top: -3px;
  gap: 70px;
`;

const TextUnderLine = styled.View`
  border-bottom: 1px solid black;
  padding-bottom: 3px;
`;

const PlaceText = styled(StyledText)`
  font-size: 13px;
  line-height: 15px;
  color: black;
`;

const ScrollViewContainer = styled.ScrollView`
  height: 75px;
  border-radius: 10px;

  padding: 3px;

  background-color: #d9d9d9;
`;

const DeleteContainer = styled.View`
  gap: 70px;
`;

export default CourseTabContent;
