import { useState } from "react";
import { StatusBar, SafeAreaView, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import NavigationDrawer from "navigators/NavigationDrawer";
import SignInMethodScreen from "screens/SignInMethodScreen";

import { RootState } from "redux/reducers";
import LoadingScreen from "./screens/LoadingScreen";

// App 컴포넌트에는 앱 전반에 적용되는 레이아웃 등을 넣어준다.
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  // 로그인이 안되어 있는 상황
  if (!user.id)
    return (
      <>
        {StatusBar.setBarStyle("light-content")}
        {/* 안드로이드에서도 스테이터스바까지 배경을 채우기 위해
    ackgroundColor="transparent" 설정 */}
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require("assets/signInBackground.png")}
          style={{
            flex: 1,
          }}
        >
          <SignInMethodScreen />
        </ImageBackground>
      </>
    );
  // 로그인은 되었으나, 로딩이 안된 상황
  if (user.id && !isLoading)
    return (
      <>
        {StatusBar.setBarStyle("light-content")}
        {/* 안드로이드에서도 스테이터스바까지 배경을 채우기 위해
    ackgroundColor="transparent" 설정 */}
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require("assets/signInBackground.png")}
          style={{
            flex: 1,
          }}
        >
          <LoadingScreen setIsLoading={setIsLoading} />
        </ImageBackground>
      </>
    );
  // 로그인과 로딩 모두 끝난 상황
  if (user.id && isLoading)
    return (
      <>
        {StatusBar.setBarStyle("dark-content")}
        <StatusBar backgroundColor="white" />
        {/* IOS에서 각 View가 스테이터스바까지 침범하지 않도록 
          SafeAreaView를 View 중에서 최외곽 컴포넌트로 삽입..이긴 한데,
          일부 화면에서는 View가 스테이터스바까지 침범해야 됨... 나중에 수정 */}
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <NavigationDrawer />
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
};

export default App;
