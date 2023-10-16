import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { setTheme } from "redux/slice/themeSlice";

import styled from "styled-components/native";

import Carousel from "components/Home/Carousel";
import HomeDrawer from "components/Home/HomeDrawer";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [flingCount, setFlingCount] = useState<number>(0);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (flingCount === 2) dispatch(setTheme({ isDark: true }));
  }, [flingCount, dispatch]);

  return (
    <Container>
      {flingCount === 2 ? <StatusBarCover height={insets.top} /> : <></>}
      <Carousel flingCount={flingCount} />
      <HomeDrawer flingCount={flingCount} setFlingCount={setFlingCount} />
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  flex: 1;
`;

const StatusBarCover = styled.View<{ height: number }>`
  position: absolute;
  width: ${SCREEN_WIDTH}px;
  background-color: white;
  z-index: 1;
`;

export default HomeScreen;
