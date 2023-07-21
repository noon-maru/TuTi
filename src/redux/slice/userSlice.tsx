import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  // 사용자 상태 타입 정의
  id: string;
  name: string;
  profile: string;
}

const UserInitialState: UserState = {
  id: "",
  name: "",
  profile: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    logout: () => {
      return UserInitialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
