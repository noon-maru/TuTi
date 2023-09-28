import { useRef, useState } from "react";
import { Animated, Image, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";

import { StyledText } from "styles/globalStyles";

interface WishPlacesByRegionProps {
  title: string;
}

const WishPlacesByRegion = ({ title }: WishPlacesByRegionProps) => {
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
      outputRange: [28, 360], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  return (
    <Container style={[animatedStyle]}>
      <Pressable onPress={toggleExpand}>
        <Header>
          <StyledText style={{ fontSize: 15 }}>{title}</StyledText>
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
        <GradientLine
          colors={["#518FFF", "#33E1C0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Pressable>
      <PlacesContainer>
        <Place>
          <StyledText style={{ fontSize: 15 }}>{`□ A 장소`}</StyledText>
          <ButtonContainer>
            <Image
              source={require("@assets/icon/star.png")}
              style={{ width: 15, height: 15 }}
            />
            <Image
              source={require("@assets/icon/star.png")}
              style={{ width: 15, height: 15 }}
            />
            <Image
              source={require("@assets/icon/star.png")}
              style={{ width: 15, height: 15 }}
            />
          </ButtonContainer>
        </Place>
      </PlacesContainer>
    </Container>
  );
};

const Container = styled(Animated.View)`
  overflow: hidden;

  width: 100%;

  margin-top: 10px;

  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  height: 22px;

  padding: 0 5px;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;

  margin-top: 3px;
  margin-bottom: 8px;
`;

const PlacesContainer = styled.View`
  width: 100%;
  gap: 3px;
`;

const Place = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 36px;

  padding-left: 18px;
  padding-right: 10px;

  border-radius: 10px;

  background-color: #efeff0;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export default WishPlacesByRegion;
