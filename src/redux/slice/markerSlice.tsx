import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusInfo {
  busRoutes: string[];
  busStops: string[];
}

export interface MarkerState {
  placeId: string; // 해당 장소의 ID
  address: string; // 해당 마커의 주소
  markerName: string; // 해당 마커의 이름
  parkingInfo: string; // 해당 마커의 주차 정보
  advice: string; // 해당 장소에 갈 때, 필요 할 만한 조언
  admissionFee: string; // 입장료
  closedDays: string[]; // 휴무일
  subwayInfo: string[]; // 지하철
  busInfo: BusInfo; // 버스
  isMarkerClicked: boolean; // 마커 클릭 여부
  isWishClicked: boolean; // 찜 버튼 클릭 여부
  isLoading: boolean; // 마커 업데이트 로딩 여부
}

const initialState: MarkerState = {
  placeId: "",
  address: "",
  markerName: "",
  parkingInfo: "",
  advice: "",
  admissionFee: "",
  closedDays: [],
  subwayInfo: [],
  busInfo: {
    busRoutes: [],
    busStops: [],
  },
  isMarkerClicked: false,
  isWishClicked: false,
  isLoading: false,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleWishClick: (state, action: PayloadAction<string>) => {},
  },
});

export const {
  setMarkerInfo,
  clearMarkerInfo,
  toggleMarkerClick,
  toggleWishClick,
} = markerSlice.actions;

export default markerSlice.reducer;
