import { all, fork } from "redux-saga/effects";
import watchDrawerAnimation from "./drawerSaga";

export default function* rootSaga() {
  yield all([
    fork(watchDrawerAnimation),
    // 그 외 기타 watchers
  ]);
}
