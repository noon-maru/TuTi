import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import styled from "styled-components/native";

import NavigationDrawer from "navigators/NavigationDrawer";

// App 컴포넌트에는 앱 전반에 적용되는 레이아웃 등을 넣어준다.
const App = () => {
  return (
    // 아이폰에서 각 View가 시계 영역까지 침범하지 않도록 SafeAreaView를 최외곽 컴포넌트로 삽입
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NavigationDrawer />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
