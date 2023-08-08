import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  dark: boolean;
}

const initialState: ThemeState = {
  dark: false,
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      return action.payload;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
