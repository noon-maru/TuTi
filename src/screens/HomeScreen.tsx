import { useEffect, useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { setNavigation } from "redux/slice/navigationSlice";
import { setTheme } from "redux/slice/themeSlice";

import styled from "styled-components/native";

import Carousel from "components/Home/Carousel";
import HomeDrawer from "components/Home/HomeDrawer";
import { RootState } from "redux/reducers";
import { useIsFocused } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const [flingCount, setFlingCount] = useState<number>(0);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    // 드로어 헤더에 하단 탭바 네비게이션을 전달하기 위한 세팅
    dispatch(setNavigation(navigation));
  }, []);

  useEffect(() => {
    if (flingCount === 2) dispatch(setTheme({ isDark: true }));
  }, [flingCount]);

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
