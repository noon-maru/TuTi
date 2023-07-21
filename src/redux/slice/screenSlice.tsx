import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScreenState {
  name: string;
}

const ScreenInitialState: ScreenState = {
  name: "",
};

const screenSlice = createSlice({
  name: "screen",
  initialState: ScreenInitialState,
  reducers: {
    navigate: (state, action: PayloadAction<ScreenState>) => {
      return action.payload;
    },
  },
});

export const { navigate } = screenSlice.actions;
export default screenSlice.reducer;
