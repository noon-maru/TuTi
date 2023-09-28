import { useState } from "react";

import { useDispatch } from "react-redux";

import { Dimensions, Image, LayoutChangeEvent, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import { StyledText } from "styles/globalStyles";

import { setCourseContainerHeight } from "redux/slice/courseDrawerSlice";

import PlaceSearch from "components/Course/PlaceSearch";
import WishPlacesByRegion from "components/Course/WishPlacesByRegion";
import CourseDrawer from "components/Course/CourseDrawer";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CourseScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setCourseContainerHeight(height));
  };

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container onLayout={handleContainerLayout}>
        <PlaceSearch
          title={"출발지"}
          place={departure}
          setPlace={setDeparture}
        />
        <PlaceSearch
          title={"도착지"}
          place={destination}
          setPlace={setDestination}
        />
        <WishPlaceTextContainer>
          <Image
            source={require("@assets/icon/heart(red).png")}
            style={{ width: 20, height: 20 }}
          />
          <StyledText style={{ fontSize: 17 }}>찜 한 장소</StyledText>
        </WishPlaceTextContainer>
        <ScrollView
          style={{ width: "100%" }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <WishPlacesByRegion title={"서울"} />
          <WishPlacesByRegion title={"인천"} />
        </ScrollView>
        <HiddenBox />
        <CourseDrawer />
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
  justify-content: center;
  align-items: center;

  margin-top: 53px;

  padding: 30px;

  background-color: white;
`;

const WishPlaceTextContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;

  width: 100%;

  margin-top: 27px;
`;

const HiddenBox = styled.View`
  height: 50px;
`;

export default CourseScreen;
