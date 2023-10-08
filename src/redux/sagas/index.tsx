import { all, fork } from "redux-saga/effects";
import watchDrawerAnimation from "./drawerSaga";
import watchCourseDrawerAnimation from "./courseDrawerSaga";
import watchSponserDrawerAnimation from "./sponserDrawerSaga";

export default function* rootSaga() {
  yield all([
    fork(watchDrawerAnimation),
    fork(watchCourseDrawerAnimation),
    fork(watchSponserDrawerAnimation),
    // 그 외 기타 watchers
  ]);
}
