import { Dimensions, Image, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";

import { useDispatch } from "react-redux";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import {
  setInsets,
  setSponserContainerHeight,
} from "@redux/slice/sponserDrawerSlice";

import GradientText from "@components/GradientText";
import SponserDrawer from "@components/Sponser/SponserDrawer";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SponserScreen = ({ route }: any) => {
  const { placeName } = route.params;

  console.log(placeName);

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setSponserContainerHeight(height));
    dispatch(setInsets(insets));
  };

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container onLayout={handleContainerLayout}>
        <MainImageFrame>
          <StyledText>{"이미지 들어갈 공간"}</StyledText>
        </MainImageFrame>
        <ContentsContainer>
          <Location>
            <Icon name="location-pin" size={22} color="black" />
            <StyledText style={{ fontSize: 17 }}>{"대충 주소"}</StyledText>
          </Location>
          <RatingContainer>
            <GradientText
              colors={["#8EFF5A", "#605CFF"]}
              style={{ fontSize: 13 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              {"★★★★☆"}
            </GradientText>
            <GradientText
              colors={["#8EFF5A", "#605CFF"]}
              style={{ fontSize: 13 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              {814}
            </GradientText>
            <Image
              source={require("@assets/icon/heart(line).png")}
              style={{ width: 13, height: 13 }}
            />
            <GradientText
              colors={["#8EFF5A", "#605CFF"]}
              style={{ fontSize: 13 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              {2023}
            </GradientText>
          </RatingContainer>
          <StyledText>{"장소 설명 및 사진작가들의 추천 소개말"}</StyledText>
          <SponserDrawer />
        </ContentsContainer>
      </Container>
    </>
  );
};

const StatusBarBackgroundColor = styled.View<{ height: number }>`
  width: ${SCREEN_WIDTH}px;
  height: ${(props) => props.height}px;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;

  margin-top: 53px;
`;

const MainImageFrame = styled.View`
  width: 100%;
  height: 350px;

  border: 1px solid #e6e6fa;
`;

const ContentsContainer = styled.View`
  flex: 1;
  gap: 10px;

  width: 100%;

  padding: 30px 25px;
`;

const Location = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: 3px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  gap: 7px;
`;

export default SponserScreen;
