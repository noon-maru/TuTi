import { combineReducers, Reducer } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./slice/userSlice";
import screenReducer, { ScreenState } from "./slice/screenSlice";
import navigationReducer, { NavigationState } from "./slice/navigationSlice";
import ThemeReducer, { ThemeState } from "./slice/themeSlice";
import MessageReducer, { MessageState } from "./slice/messageSlice";
import DrawerReducer, { DrawerState } from "./slice/drawerSlice";
import MarkerReducer, { MarkerState } from "./slice/markerSlice";
import CourseDrawerReducer, {
  CourseDrawerState,
} from "./slice/courseDrawerSlice";
import SponserDrawerReducer, {
  SponserDrawerState,
} from "./slice/sponserDrawerSlice";
import CoursesReducer, { CoursesState } from "./slice/courseSlice";

export interface RootState {
  user: UserState;
  screen: ScreenState;
  navigation: NavigationState;
  theme: ThemeState;
  message: MessageState;
  drawer: DrawerState;
  marker: MarkerState;
  courseDrawer: CourseDrawerState;
  sponserDrawer: SponserDrawerState;
  courses: CoursesState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  user: userReducer,
  screen: screenReducer,
  navigation: navigationReducer,
  theme: ThemeReducer,
  message: MessageReducer,
  drawer: DrawerReducer,
  marker: MarkerReducer,
  courseDrawer: CourseDrawerReducer,
  sponserDrawer: SponserDrawerReducer,
  courses: CoursesReducer,
});

export default rootReducer;
