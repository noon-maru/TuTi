import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  courseName: string;
  duration: string;
  places: string[];
  isProgress: boolean;
}

export interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses = [...state.courses, action.payload];
    },
    updateCourse: (
      state,
      action: PayloadAction<{ courseId: number; updatedCourse: Course }>
    ) => {
      const { courseId, updatedCourse } = action.payload;
      state.courses = state.courses.map((course, index) =>
        index === courseId ? updatedCourse : course
      );
    },
    deleteCourse: (state, action: PayloadAction<number>) => {
      const courseIdToDelete = action.payload;
      state.courses = state.courses.filter(
        (_, index) => index !== courseIdToDelete
      );
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
