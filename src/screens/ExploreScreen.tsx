import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import styled from "styled-components/native";

import ExploreDrawer from "components/Explore/ExploreDrawer/ExploreDrawer";
import SearchBox from "components/Explore/SearchBox";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        {/* react 개발 서버 url: https://code.tutiserver.kro.kr/proxy/3000/ */}
        <KakaoMap source={{ uri: SERVER_URL }} />
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
