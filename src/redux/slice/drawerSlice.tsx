import { Animated, Easing } from "react-native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DrawerState {
  region: string;
  translateY: Animated.Value;
  currentY: number;
  isDrawerOpen: boolean;
  exploreContainerHeight: number;
}

const initialState: DrawerState = {
  region: "서울",
  translateY: new Animated.Value(0),
  currentY: 0,
  isDrawerOpen: false,
  exploreContainerHeight: 0, // 초기값을 제대로 설정해야 할 수도 있습니다.
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
    setTranslateY: (state, action: PayloadAction<Animated.Value>) => {
      state.translateY = action.payload;
    },
    setCurrentY: (state, action: PayloadAction<number>) => {
      state.currentY = action.payload;
    },
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setExploreContainerHeight: (state, action: PayloadAction<number>) => {
      state.exploreContainerHeight = action.payload;
    },
    animateDrawer: (
      state,
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
  setRegion,
  setTranslateY,
  setCurrentY,
  toggleDrawer,
  setExploreContainerHeight,
  animateDrawer,
} = drawerSlice.actions;

export default drawerSlice.reducer;
