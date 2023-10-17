import { Dimensions, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { RootState } from "redux/reducers";

import styled from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomHeader = ({ navigation }: { navigation: any }) => {
  const screen = useSelector((state: RootState) => state.screen);
  const theme = useSelector((state: RootState) => state.theme);
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainer screenName={screen.name} marginTop={insets.top}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        {theme.isDark ? (
          <Image
            source={require("assets/icon/profile(black).png")}
            style={{ width: 30, height: 30 }}
          />
        ) : (
          <Image
            source={require("assets/icon/profile(white).png")}
            style={{ width: 30, height: 30 }}
          />
        )}
      </TouchableOpacity>

      {screen.name !== "Home" && (
        <Logo source={require("assets/icon/logo/textLogo(color).png")} />
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Tour");
        }}
      >
        {theme.isDark ? (
          <Image
            source={require("assets/icon/bag(black).png")}
            style={{ width: 30, height: 30 }}
          />
        ) : (
          <Image
            source={require("assets/icon/bag(white).png")}
            style={{ width: 30, height: 30 }}
          />
        )}
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View<{ screenName: string; marginTop: number }>`
  width: ${SCREEN_WIDTH}px;
  height: 53px;

  margin-top: ${(props) => props.marginTop}px;
  padding-left: 25px;
  padding-right: 25px;
  background-color: ${(props) =>
    props.screenName === "Home" ? "transparent" : "white"};

  flex-direction: row;

  align-self: center;

  justify-content: space-between;
  align-items: center;
`;

// 헤더 로고 이미지
const Logo = styled.Image`
  width: 55.88px;
  height: 18px;
`;

export default CustomHeader;
