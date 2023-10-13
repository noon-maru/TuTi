import { useState } from "react";

import { useDispatch } from "react-redux";

import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

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
        <Pressable
          style={{
            alignSelf: "flex-end",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <AddStopoverButton
            colors={["#C8E0FD", "#CCF0EC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <StyledText>{"경유지 추가"}</StyledText>
          </AddStopoverButton>
        </Pressable>
        <PlaceSearch
          title={"도착지"}
          place={destination}
          setPlace={setDestination}
        />
        <ScrollView
          style={{ width: "100%", marginTop: 50, marginBottom: 50 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <WishPlacesByRegion title={"서울"} />
          <WishPlacesByRegion title={"인천"} />
        </ScrollView>
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
`;

const AddStopoverButton = styled(LinearGradient)`
  padding: 5px 12px;

  border-radius: 7px;
`;

export default CourseScreen;
