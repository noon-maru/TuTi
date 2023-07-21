import { useState } from "react";
import {
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "redux/reducers";
import { logout } from "redux/slice/userSlice";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import BottomTabNavigator from "navigators/BottomTabNavigator";

import styled from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface DrawerHeaderContainerProps {
  dw: number;
}

const Drawer = createDrawerNavigator();

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 로그아웃 처리 후 사용자 정보 초기화
    dispatch(logout());
  };

  const user = useSelector((state: RootState) => state.user);
  const ProfileContainer = styled.View`
    align-self: center;

    justify-content: center;
    align-items: center;

    margin-bottom: 15px;
  `;

  const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;

    margin-bottom: 15px;
  `;

  const ProfileText = styled.Text`
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 7px;
  `;

  const LogoutText = styled.Text`
    font-size: 10px;
    color: #808080;
    text-decoration-line: underline;
  `;

  return (
    <>
      <ProfileContainer>
        <ProfileImage
          source={
            user.profile !== ""
              ? { uri: user.profile }
              : require("assets/defaultProfileImage.png")
          }
        />
        <ProfileText>{user.name}님</ProfileText>
        <TouchableOpacity onPress={handleLogout}>
          <LogoutText>로그아웃</LogoutText>
        </TouchableOpacity>
      </ProfileContainer>
    </>
  );
};

const CustomDrawerContent = ({ navigation }: any) => {
  const [drawerWidth, setDrawerWidth] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setDrawerWidth(width);
  };

  return (
    <DrawerContentScrollView onLayout={handleLayout}>
      <DrawerHeaderContainer dw={drawerWidth}>
        <OptionContainer>
          <TouchableOpacity onPress={() => {}}>
            <Image source={require("assets/icon/setting.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Arrow source={require("assets/icon/arrow.png")} />
          </TouchableOpacity>
        </OptionContainer>
        <Profile />
      </DrawerHeaderContainer>
      <DrawerItem
        label="구독 서비스"
        onPress={() => {
          Alert.alert("구독 서비스 구현 예정입니다.");
        }}
      />
    </DrawerContentScrollView>
  );
};

const CustomHeader = ({
  navigation,
  name,
}: {
  navigation: any;
  name: string;
}) => {
  const bottomNavigation = useSelector((state: RootState) => state.navigation);
  const screen = useSelector((state: RootState) => state.screen);
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainer screenName={screen.name} marginTop={insets.top}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Image
          source={require("assets/icon/profile(color).png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      {screen.name !== "Home" && (
        <Logo source={require("assets/icon/logo/textLogo(color).png")} />
      )}
      <TouchableOpacity
        onPress={() => {
          bottomNavigation.navigate("Tour");
        }}
      >
        <Image
          source={require("assets/icon/bag(color).png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const NavigationDrawer = () => {
  const [name, setName] = useState<string>("");
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        swipeEnabled: false,
        overlayColor: "rgba(0, 0, 0, 0)",
        header: (props) => <CustomHeader name={name} {...props} />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Main"
    >
      {/* 메인 페이지들은 BottomTabNavigator 컴포넌트를 통해 각 페이지간 이동 가능 */}
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          headerTransparent: true,
        }}
      />
    </Drawer.Navigator>
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

const DrawerHeaderContainer = styled.View<DrawerHeaderContainerProps>`
  width: ${(props) => props.dw - props.dw * 0.15}px;
  height: 200px;
  border-bottom-width: 1px;
  border-bottom-color: #8583ff;

  align-self: center;

  justify-content: space-between;
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Arrow = styled.Image`
  width: 30px;
  height: 30px;
  transform: scaleX(-1);
`;

export default NavigationDrawer;
