import { Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styled from "styled-components/native";

import CustomTabBar from "components/navigation/CustomTabBar";

// 개별 스크린 컴포넌트 임포트
import HomeScreen from "screens/HomeScreen";
import NoteScreen from "screens/NoteScreen";
import ExploreScreen from "screens/ExploreScreen";
import CourseScreen from "screens/CourseScreen";
import BoxScreen from "screens/BoxScreen";
import TourScreen from "screens/TourScreen";

const Tab = createBottomTabNavigator();

// 메인으로 보여지는 페이지들 사이를 전환할 수 있는 하단 네비게이션 바
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          if (focused && route.name !== "Explore") {
            return (
              <SelectHighlight
                source={require("assets/icon/circle(color).png")}
              />
            ); // 해당 탭이 선택된 경우에만 점 표시
          }
          return <NonSelectHighlight />; // 선택되지 않은 경우에는 점 숨김
        },
        tabBarIcon: () => {
          let iconName;
          let iconSize;

          if (route.name === "Home") {
            iconName = require("assets/icon/home(black).png");
            iconSize = 30;
          } else if (route.name === "Note") {
            iconName = require("assets/icon/note.png");
            iconSize = 30;
          } else if (route.name === "Explore") {
            iconName = require("assets/icon/explore(color).png");
            iconSize = 35;
          } else if (route.name === "Course") {
            iconName = require("assets/icon/route(black).png");
            iconSize = 30;
          } else if (route.name === "Box") {
            iconName = require("assets/icon/box(black).png");
            iconSize = 30;
          }

          return (
            <Image
              source={iconName}
              style={{ width: iconSize, height: iconSize, marginTop: 15 }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Note" component={NoteScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Course" component={CourseScreen} />
      <Tab.Screen name="Box" component={BoxScreen} />
      <Tab.Screen name="Tour" component={TourScreen} />
    </Tab.Navigator>
  );
};

const SelectHighlight = styled.Image`
  width: 7px;
  height: 7px;
  margin-bottom: 5px;
`;

const NonSelectHighlight = styled.View`
  width: 7px;
  height: 7px;
  margin-bottom: 5px;
`;

export default BottomTabNavigator;
