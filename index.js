/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

import store, { persistor } from "redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const RootComponent = () => {
  // react-native-voice 모듈에서 발생하는 경고를 제거하기 위한 코드
  // Android에서만 발생하며, 경고는 발생하지만 작동은 잘 됨.
  // 가능한 한 해결 방법을 찾아보려했으나, 대체할만한 패키지도 존재하지 않아 일단은 사용.
  // 추후 업데이트로 해결 될 시, 해당 ignoreLogs 메서드는 삭제 요망.
  LogBox.ignoreLogs([
    "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
  ]);

  return (
    <Provider store={store}>
      {/* loading에는 리덕스 store에서 값을 가져올 때까지 대기할 때 보일 컴포넌트가 들어간다. */}
      {/* 보통 로딩 스피너 등이나 로딩 메세지가 보인다. */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
