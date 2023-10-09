import { all, fork } from "redux-saga/effects";
import watchDrawerAnimation from "./drawerSaga";
import watchCourseDrawerAnimation from "./courseDrawerSaga";
import watchSponserDrawerAnimation from "./sponserDrawerSaga";
import { watchToggleWishClick } from "./toggleWishClickSaga";

export default function* rootSaga() {
  yield all([
    fork(watchDrawerAnimation),
    fork(watchCourseDrawerAnimation),
    fork(watchSponserDrawerAnimation),
    fork(watchToggleWishClick),
  ]);
}
