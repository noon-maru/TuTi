import { all, fork } from "redux-saga/effects";
import watchDrawerAnimation from "./drawerSaga";
import watchCourseDrawerAnimation from "./courseDrawerSaga";

export default function* rootSaga() {
  yield all([
    fork(watchDrawerAnimation),
    fork(watchCourseDrawerAnimation),
    // 그 외 기타 watchers
  ]);
}
