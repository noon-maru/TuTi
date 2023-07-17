import { combineReducers, Reducer } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./userSlice";

export interface RootState {
  user: UserState;
  // 다른 리듀서들도 여기에 추가
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  user: userReducer,
  // 다른 리듀서들도 여기에 추가
});

export default rootReducer;
