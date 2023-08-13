import { useCallback } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import WebView from "react-native-webview";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import styled from "styled-components/native";

import { setTheme } from "redux/slice/themeSlice";

import ExploreDrawer from "components/ExploreDrawer";
import SearchBox from "~/components/SearchBox";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setTheme({ dark: true }));
      return () => {}; // 필요한 경우 cleanup 함수 추가
    }, [])
  );

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <KakaoMap
          source={{ uri: "https://code.tutiserver.kro.kr/proxy/3000/" }}
        />
        <SearchBox />
        <ExploreDrawer />
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

const KakaoMap = styled(WebView)`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
`;

export default ExploreScreen;
