import { StatusBar, SafeAreaView, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import NavigationDrawer from "navigators/NavigationDrawer";
import SignInMethodScreen from "screens/SignInMethodScreen";

import { RootState } from "redux/reducers";

StatusBar.setBarStyle("light-content");

// App 컴포넌트에는 앱 전반에 적용되는 레이아웃 등을 넣어준다.
const App = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <ImageBackground
      source={require("assets/background-color1.png")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      {/* 아이폰에서 각 View가 시계 영역까지 침범하지 않도록 SafeAreaView를 View 중에서 최외곽 컴포넌트로 삽입 */}
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {user.id !== "" && user.name !== "" ? (
            <NavigationDrawer />
          ) : (
            <SignInMethodScreen />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;
