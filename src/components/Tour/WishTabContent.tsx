import { useRef, useState } from "react";
import { Animated, Image, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "styles/globalStyles";

interface WishTabContentProps {
  title: string;
  address: string;
}

const WishTabContent = ({ title, address }: WishTabContentProps) => {
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
      outputRange: [36, 350], // 버튼의 높이를 확장하려면 이 값을 조절
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
          <TextContainer>
            <BoldStyledText
              style={{ fontSize: 15, color: "black" }}
            >{`□ ${title}`}</BoldStyledText>
            <StyledText style={{ fontSize: 13, color: "#777777" }}>
              {address}
            </StyledText>
          </TextContainer>
          {expanded ? (
            <IconContainer>
              <Image
                source={require("@assets/icon/trash.png")}
                style={{ width: 13, height: 13 }}
              />
              <Image
                source={require("@assets/icon/unfold.png")}
                style={{ width: 12, height: 11.74 }}
              />
            </IconContainer>
          ) : (
            <IconContainer>
              <Image
                source={require("@assets/icon/trash.png")}
                style={{ width: 13, height: 13 }}
              />
              <Image
                source={require("@assets/icon/open.png")}
                style={{ width: 12, height: 11.74 }}
              />
            </IconContainer>
          )}
        </Header>
      </Pressable>
      <ContentsBox>
        {/* <Image></Image>
        <Image></Image> */}
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

const TextContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ContentsBox = styled.View``;

const IconContainer = styled.View`
  flex-direction: row;
  gap: 6px;
`;

export default WishTabContent;
