import { Image, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
        tabBarLabel: ({ focused }) => {
          if (focused) {
            return <Text>{route.name}</Text>; // 해당 탭이 선택된 경우에만 이름 표시
          }
          return null; // 선택되지 않은 경우에는 이름 숨김
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize;

          if (route.name === "Home") {
            iconName = focused
              ? require("assets/icon/home(line-color).png")
              : require("assets/icon/home(line-color).png");
            iconSize = focused ? 24 : 20; // 활성화된 탭과 비활성화된 탭의 아이콘 크기 조정
          } else if (route.name === "Note") {
            iconName = focused
              ? require("assets/icon/note.png")
              : require("assets/icon/note.png");
            iconSize = focused ? 24 : 20;
          } else if (route.name === "Explore") {
            iconName = focused
              ? require("assets/icon/explore(color).png")
              : require("assets/icon/explore(color).png");
            iconSize = focused ? 24 : 20;
          } else if (route.name === "SOL") {
            iconName = focused
              ? require("assets/icon/route(color).png")
              : require("assets/icon/route(color).png");
            iconSize = focused ? 24 : 20;
          } else if (route.name === "Box") {
            iconName = focused
              ? require("assets/icon/box.png")
              : require("assets/icon/box.png");
            iconSize = focused ? 24 : 20;
          }

          return (
            <Image
              source={iconName}
              style={{ width: iconSize, height: iconSize }}
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

export default BottomTabNavigator;
