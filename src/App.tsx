/**
 * @format
 */

import { useState } from "react";
import { StatusBar, ImageBackground, Linking } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { RootState } from "redux/reducers";

import NavigationDrawer from "navigators/NavigationDrawer";
import SignInMethodScreen from "screens/SignInMethodScreen";
import LoadingScreen from "screens/LoadingScreen";

const config = {
  initialRouteName: "Main", // 초기 화면 설정
  screens: {
    Main: {
      initialRouteName: "Home", // Main 화면의 초기 화면 설정
      screens: {
        Home: "home",
        Note: "note",
        Explore: {
          path: "explore/:address?",
          // URL에서 화면으로 주소 가져올 때,
          parse: {
            address: (address: string) => address.replace(/_/g, " "),
          },
          // 화면에서 URL로 주소를 변환할 때,
          stringify: {
            address: (address: string) => address.replace(/\s+/g, "_"),
          },
        },
        Course: "course",
        Box: "box",
        Tour: "tour",
      },
    },
    PlaceImage: "placeimage",
  },
};

const linking = {
  prefixes: ["com.noonmaru.tuti://", "https://tuti.noonmaru.com"],

  async getInitialURL() {
    const url = await Linking.getInitialURL();

    if (url != null) return url;

    return null;
  },

  // 받아준 딥링크 url을 subscribe에 넣어줘야 한다
  subscribe(listener: any) {
    const urlListener = Linking.addEventListener("url", (event: any) =>
      listener(event.url)
    );

    return () => urlListener.remove();
  },
  config, // 네비게이션 디렉터리 정보 설정
};

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
      <NavigationContainer linking={linking}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <NavigationDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
