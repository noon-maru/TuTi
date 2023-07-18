import { Image, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { styled } from "styled-components/native";

// 개별 스크린 컴포넌트 임포트
import HomeScreen from "screens/HomeScreen";
import NoteScreen from "screens/NoteScreen";
import ExploreScreen from "screens/ExploreScreen";
import SOLScreen from "screens/SOLScreen";
import BoxScreen from "screens/BoxScreen";

const Tab = createBottomTabNavigator();

// 메인으로 보여지는 페이지들 사이를 전환할 수 있는 하단 네비게이션 바
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 70 },
        tabBarLabel: ({ focused }) => {
          if (focused && route.name !== "Explore") {
            return (
              <SelectHighlight
                source={require("assets/icon/circle(color).png")}
              />
            ); // 해당 탭이 선택된 경우에만 점 표시
          }
          return (
            <View
              style={{
                width: 7,
                height: 7,
                marginBottom: 10,
              }}
            />
          ); // 선택되지 않은 경우에는 점 숨김
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize;

          if (route.name === "Home") {
            iconName = require("assets/icon/home(line-color).png");
            iconSize = 30;
          } else if (route.name === "Note") {
            iconName = require("assets/icon/note.png");
            iconSize = 30;
          } else if (route.name === "Explore") {
            iconName = require("assets/icon/explore(color).png");
            iconSize = 35;
          } else if (route.name === "SOL") {
            iconName = require("assets/icon/route(color).png");
            iconSize = 30;
          } else if (route.name === "Box") {
            iconName = require("assets/icon/box.png");
            iconSize = 30;
          }

          return (
            <Image
              source={iconName}
              style={{ width: iconSize, height: iconSize, marginTop: 10 }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Note"
        component={NoteScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SOL"
        component={SOLScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Box"
        component={BoxScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const SelectHighlight = styled.Image`
  width: 7px;
  height: 7px;
  margin-bottom: 10px;
`;

export default BottomTabNavigator;
