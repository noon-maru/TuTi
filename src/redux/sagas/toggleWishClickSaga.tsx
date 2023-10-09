import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { SERVER_URL, API } from "@env";
import { setMarkerInfo, toggleWishClick } from "@redux/slice/markerSlice";
import { RootState } from "@redux/reducers";

interface Action {
  type: string;
  payload: string;
}

function* toggleWishClickSaga(action: Action) {
  try {
    const userId = action.payload;
    const { isWishClicked, placeId } = yield select(
      (state: RootState) => state.marker
    ); // 현재 Redux 상태 가져오기

    if (isWishClicked) {
      yield call(
        axios.delete,
        SERVER_URL + API + `/users/${userId}/wishPlace`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ placeId }),
        }
      );
    } else {
      yield call(
        axios.post,
        SERVER_URL + API + `/users/${userId}/wishPlace`,
        JSON.stringify({ placeId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    yield put(
      setMarkerInfo({ isWishClicked: !isWishClicked, isLoading: true })
    );
  } catch (error) {
    console.error(error);
    yield put(setMarkerInfo({ isLoading: false }));
  }
}

export function* watchToggleWishClick() {
  yield takeLatest(toggleWishClick.type, toggleWishClickSaga);
}
