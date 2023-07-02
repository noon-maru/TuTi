import { Dimensions } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import styled from "styled-components/native";

import BottomTabNavigator from "navigators/BottomTabNavigator";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Drawer = createDrawerNavigator();

// 개별 스크린 컴포넌트 임포트
import ProfileScreen from "screens/ProfileScreen";
import SubscribeScreen from "screens/SubscribeScreen";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
      <DrawerItem
        label="Subscribe"
        onPress={() => props.navigation.navigate("Subscribe")}
      />
    </DrawerContentScrollView>
  );
};

const NavigationDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: () => (
          <Logo
            source={require("assets/icon/logo/text_logo(color).png")}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Main"
    >
      {/* 메인 페이지들은 BottomTabNavigator 컴포넌트를 통해 각 페이지간 이동 가능 
        프로필 수정페이지와 마이페이지에선 하단 네비게이션 바가 안보이게 구성 */}
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Subscribe" component={SubscribeScreen} />
    </Drawer.Navigator>
  );
};

// 헤더 로고 이미지
const Logo = styled.Image`
  width: ${SCREEN_WIDTH * 0.15}px;
  z-index: -1;
`;

export default NavigationDrawer;
