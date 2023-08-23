import { combineReducers, Reducer } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./slice/userSlice";
import screenReducer, { ScreenState } from "./slice/screenSlice";
import navigationReducer, { NavigationState } from "./slice/navigationSlice";
import ThemeReducer, { ThemeState } from "./slice/themeSlice";
import MessageReducer, { MessageState } from "./slice/messageSlice";

export interface RootState {
  user: UserState;
  screen: ScreenState;
  navigation: NavigationState;
  theme: ThemeState;
  message: MessageState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  user: userReducer,
  screen: screenReducer,
  navigation: navigationReducer,
  theme: ThemeReducer,
  message: MessageReducer,
});

export default rootReducer;
