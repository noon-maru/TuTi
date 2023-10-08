import { Animated } from "react-native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EdgeInsets } from "react-native-safe-area-context";

export interface SponserDrawerState {
  translateY: Animated.Value;
  currentY: number;
  isDrawerOpen: boolean;
  sponserContainerHeight: number;
  insets: EdgeInsets;
}

const initialState: SponserDrawerState = {
  translateY: new Animated.Value(0),
  currentY: 0,
  isDrawerOpen: false,
  sponserContainerHeight: 0,
  insets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const sponserDrawerSlice = createSlice({
  name: "sponserDrawer",
  initialState,
  reducers: {
    setTranslateY: (state, action: PayloadAction<Animated.Value>) => {
      state.translateY = action.payload;
    },
    setCurrentY: (state, action: PayloadAction<number>) => {
      state.currentY = action.payload;
    },
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setSponserContainerHeight: (state, action: PayloadAction<number>) => {
      state.sponserContainerHeight = action.payload;
    },
    setInsets: (state, action: PayloadAction<EdgeInsets>) => {
      state.insets = action.payload;
    },
    animateDrawer: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{
        direction: string;
        amount?: number;
      }>
    ) => {
      // 이 리듀서는 의도적으로 비워 두었습니다!
      // 실제 애니메이션 로직은 redux-saga가 담당합니다.
      // 이 리듀서는 redux-saga가 실행되도록 하는 트리거 역할만 합니다.
    },
  },
});

export const {
  setTranslateY,
  setCurrentY,
  toggleDrawer,
  setSponserContainerHeight,
  setInsets,
  animateDrawer,
} = sponserDrawerSlice.actions;

export default sponserDrawerSlice.reducer;
