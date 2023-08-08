import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NavigationState {
  navigate: any;
}

const NavigatorInitialState: NavigationState = {
  navigate: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: NavigatorInitialState,
  reducers: {
    setNavigation: (state, action: PayloadAction<NavigationState>) => {
      return action.payload;
    },
  },
});

export const { setNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
