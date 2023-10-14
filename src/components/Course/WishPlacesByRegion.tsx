import { useRef, useState } from "react";
import { Animated, Image, LayoutChangeEvent, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

interface WishPlacesByRegionProps {
  region: string;
  wishPlaces: WishPlace[];
}

const WishPlacesByRegion = ({
  region,
  wishPlaces,
}: WishPlacesByRegionProps) => {
  const [expandBoxHeight, setExpandBoxHeight] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
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
      outputRange: [28, expandBoxHeight + 40], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setExpandBoxHeight(height);
  };

  return (
    <Container style={[animatedStyle]}>
      <Pressable onPress={toggleExpand}>
        <Header>
          <Title>
            <Image
              source={require("@assets/icon/heart(red).png")}
              style={{ width: 15, height: 15 }}
            />
            <StyledText style={{ fontSize: 15 }}>{region}</StyledText>
          </Title>
          <HeaderRightSide>
            <StyledText style={{ fontSize: 10 }}>{"찜 한 장소"}</StyledText>
            {expanded ? (
              <Image
                source={require("@assets/icon/unfold.png")}
                style={{ width: 15, height: 15 }}
              />
            ) : (
              <Image
                source={require("@assets/icon/open.png")}
                style={{ width: 15, height: 15 }}
              />
            )}
          </HeaderRightSide>
        </Header>
        <GradientLine
          colors={["#518FFF", "#33E1C0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Pressable>
      <PlacesContainer onLayout={handleContainerLayout}>
        {wishPlaces.map((wishPlace, index) => (
          <Place
            key={index}
            colors={["#C7DFFD", "#CCF0EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <StyledText>{`□ ${wishPlace.name}`}</StyledText>
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
        ))}
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
  align-items: center;

  height: 22px;

  padding: 0 5px;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const HeaderRightSide = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 7px;
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

const Place = styled(LinearGradient)`
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
