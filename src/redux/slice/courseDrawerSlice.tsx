import { Animated } from "react-native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseDrawerState {
  translateY: Animated.Value;
  currentY: number;
  isDrawerOpen: boolean;
  courseContainerHeight: number;
}

const initialState: CourseDrawerState = {
  translateY: new Animated.Value(0),
  currentY: 0,
  isDrawerOpen: false,
  courseContainerHeight: 0,
};

const courseDrawerSlice = createSlice({
  name: "courseDrawer",
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
    setCourseContainerHeight: (state, action: PayloadAction<number>) => {
      state.courseContainerHeight = action.payload;
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
  setTranslateY,
  setCurrentY,
  toggleDrawer,
  setCourseContainerHeight,
  animateDrawer,
} = courseDrawerSlice.actions;

export default courseDrawerSlice.reducer;
