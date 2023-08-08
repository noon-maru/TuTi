import { useState } from "react";
import { StatusBar, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { RootState } from "redux/reducers";

import NavigationDrawer from "navigators/NavigationDrawer";
import SignInMethodScreen from "screens/SignInMethodScreen";
import LoadingScreen from "screens/LoadingScreen";

// App 컴포넌트에는 앱 전반에 적용되는 레이아웃 등을 넣어준다.
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  // 로그인이 안된 상황 또는 로그인은 되었으나, 로딩이 안된 상황
  if (!user.id || (user.id && !isLoading)) {
    return (
      <>
        {/* 스테이터스바의 스타일을 밝게 변경,
        안드로이드 기준으로 스테이터스바에 접근 가능하게 하고 투명화,
        IOS는 애초에 기본값이 스테이터스바에 View를 그릴 수 있기에 barStyle만 적용 됨 */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <ImageBackground
          source={require("assets/signInBackground.png")}
          style={{ flex: 1 }}
        >
          {!user.id ? (
            <SignInMethodScreen />
          ) : (
            <LoadingScreen setIsLoading={setIsLoading} />
          )}
        </ImageBackground>
      </>
    );
  }

  // 로그인과 로딩 모두 끝난 상황
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavigationDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
