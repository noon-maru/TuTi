import { useDispatch, useSelector } from "react-redux";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import { RootState } from "@redux/reducers";
import { setExploreContainerHeight } from "@redux/slice/drawerSlice";

import SearchBox from "@components/Explore/SearchBox";
import KakaoMapWebView from "@components/Explore/KakaoMapWebView";
import ExploreDrawer from "@components/Explore/ExploreDrawer";
import InformBox from "@components/Explore/InformBox";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();
  const { isMarkerClicked } = useSelector((state: RootState) => state.marker);
  const dispatch = useDispatch();

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setExploreContainerHeight(height));
  };

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container onLayout={handleContainerLayout}>
        <KakaoMapWebView />
        <SearchBox />
        {isMarkerClicked ? <InformBox /> : null}
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

export default ExploreScreen;
