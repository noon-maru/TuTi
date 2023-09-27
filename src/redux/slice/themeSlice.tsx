import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusBar } from "react-native";

export interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: true,
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      StatusBar.setBarStyle(
        action.payload.isDark ? "dark-content" : "light-content"
      );
      state.isDark = action.payload.isDark;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
