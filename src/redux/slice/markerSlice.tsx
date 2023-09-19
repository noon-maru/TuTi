import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusInfo {
  busRoutes: string[];
  busStops: string[];
}

export interface MarkerState {
  markerName: string; // 해당 마커의 이름
  admissionFee: string; // 입장료
  closedDays: string[]; // 휴무일
  subwayInfo: string[]; // 지하철
  busInfo: BusInfo; // 버스
  isMarkerClicked: boolean; // 마커 클릭 여부
}

const initialState: MarkerState = {
  markerName: "",
  admissionFee: "",
  closedDays: [],
  subwayInfo: [],
  busInfo: {
    busRoutes: [],
    busStops: [],
  },
  isMarkerClicked: false,
};

const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    setMarkerInfo: (state, action: PayloadAction<Partial<MarkerState>>) => {
      // 주어진 액션에서 새로운 마커 정보를 받아 상태를 업데이트합니다.
      return { ...state, ...action.payload };
    },
    clearMarkerInfo: () => {
      // 마커 정보를 초기 상태로 리셋합니다.
      return initialState;
    },
    toggleMarkerClick: (state) => {
      // 마커 클릭 여부를 토글합니다.
      state.isMarkerClicked = !state.isMarkerClicked;
    },
  },
});

export const { setMarkerInfo, clearMarkerInfo, toggleMarkerClick } =
  markerSlice.actions;

export default markerSlice.reducer;
