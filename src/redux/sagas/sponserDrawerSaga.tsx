import { Animated, Easing } from "react-native";
import { takeEvery, select, call, put } from "redux-saga/effects";
import {
  toggleDrawer,
  setCurrentY,
  animateDrawer,
} from "redux/slice/sponserDrawerSlice";
import { RootState } from "redux/reducers";

// 액션 타입 정의
interface AnimateDrawerAction {
  type: string;
  payload: {
    translateY: Animated.Value;
    direction: string;
    amount?: number;
  };
}

function* handleDrawerAnimation(action: AnimateDrawerAction) {
  const { direction, amount } = action.payload;
  const { translateY, currentY, sponserContainerHeight, insets } = yield select(
    (state: RootState) => state.sponserDrawer
  );

  let toValue =
    direction === "UP"
      ? currentY - sponserContainerHeight + insets.bottom + 65 + 60
      : currentY + sponserContainerHeight - insets.bottom - 65 - 60;

  if (amount !== undefined) {
    toValue = direction === "UP" ? currentY - amount : currentY + amount;
  }

  const animation = Animated.timing(translateY, {
    toValue: toValue,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.quad),
  });

  yield call([animation, animation.start]);

  // 애니메이션이 끝난 후 redux store 업데이트
  yield put(setCurrentY(toValue));
  yield put(toggleDrawer(direction === "UP"));
}

export default function* watchSponserDrawerAnimation() {
  yield takeEvery(animateDrawer.type, handleDrawerAnimation);
}
