import { useState } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import KakaoMapWebView from "components/Explore/KakaoMapWebView";
import SearchBox from "components/Explore/SearchBox";
import ExploreDrawer from "components/Explore/ExploreDrawer";

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
        <KakaoMapWebView />
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

export default ExploreScreen;
