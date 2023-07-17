import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  // 사용자 상태 타입 정의
  id: string;
  name: string;
}

const initialState: UserState = {
  id: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
