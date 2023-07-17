/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

import store, { persistor } from "redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const RootComponent = () => (
  <Provider store={store}>
    {/* loading에는 리덕스 store에서 값을 가져올 때까지 대기할 때 보일 컴포넌트가 들어간다. */}
    {/* 보통 로딩 스피너 등이나 로딩 메세지가 보인다. */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
