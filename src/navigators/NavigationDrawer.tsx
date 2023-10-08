/* eslint-disable react/no-unstable-nested-components */
import { useState } from "react";
import {
  Alert,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "redux/reducers";
import { logout } from "redux/slice/userSlice";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import BottomTabNavigator from "navigators/BottomTabNavigator";

import CustomHeader from "components/navigation/CustomHeader";
import ImageScreenCustomHeader from "components/navigation/ImageScreenCustomHeader";

import styled from "styled-components/native";
import { StyledText, BoldStyledText } from "styles/globalStyles";

import PlaceImageScreen from "@screens/PlaceImageScreen";
import SponserScreen from "@screens/SponserScreen";

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

  const ProfileText = styled(BoldStyledText)`
    font-size: 17px;
    color: black;
    margin-bottom: 7px;
  `;

  const LogoutText = styled(StyledText)`
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
      <DrawerHeaderContainer width={drawerWidth}>
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
        labelStyle={{ fontFamily: "SpoqaHanSansNeo-Regular" }}
        onPress={() => {
          Alert.alert("구독 서비스 구현 예정입니다.");
        }}
      />
    </DrawerContentScrollView>
  );
};

const NavigationDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        swipeEnabled: false,
        overlayColor: "rgba(0, 0, 0, 0)",
        sceneContainerStyle: { backgroundColor: "white" },
        header: (props) => <CustomHeader {...props} />,
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
      <Drawer.Screen
        name="PlaceImage"
        component={PlaceImageScreen}
        options={{
          header: (props) => <ImageScreenCustomHeader {...props} />, // CustomHeader 컴포넌트를 렌더링
          headerTransparent: true, // 커스텀 헤더를 투명하게 만듭니다.
        }}
      />
      <Drawer.Screen
        name="Sponser"
        component={SponserScreen}
        options={{
          header: (props) => <ImageScreenCustomHeader {...props} />, // CustomHeader 컴포넌트를 렌더링
          headerTransparent: true, // 커스텀 헤더를 투명하게 만듭니다.
        }}
      />
    </Drawer.Navigator>
  );
};

const DrawerHeaderContainer = styled.View<{ width: number }>`
  width: ${(props) => props.width - props.width * 0.15}px;
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
