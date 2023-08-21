import { useState } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import styled from "styled-components/native";

import ExploreDrawer from "components/Explore/ExploreDrawer";
import SearchBox from "components/Explore/SearchBox";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();

  const [containerHeight, setContainerHeight] = useState<number>(0);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container onLayout={handleContainerLayout}>
        {/* react 개발 서버 url: https://code.tutiserver.kro.kr/proxy/3000/ */}
        <KakaoMap source={{ uri: SERVER_URL }} />
        <SearchBox />
        <ExploreDrawer containerHeight={containerHeight} />
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
