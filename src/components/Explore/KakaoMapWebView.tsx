import { useRoute } from "@react-navigation/native";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import WebView from "react-native-webview";

import styled from "styled-components/native";

import axios from "axios";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import { RootState } from "redux/reducers";
import { clearMessage } from "redux/slice/messageSlice";
import { MarkerState, setMarkerInfo } from "redux/slice/markerSlice";

const isDevelopMode = DEVELOP_MODE === "true";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface NativeEvent {
  nativeEvent: { data: string };
}

interface WishPlaceData {
  _id: string;
  address: string;
  image: string;
  name: string;
  region: string;
}

const getWishPlace = async (userId: string) => {
  try {
    if (userId === "guest") return [];

    let url = "";
    if (isDevelopMode)
      url = DEVELOP_SERVER_URL + API + `/users/${userId}/wishPlace`;
    else url = SERVER_URL + API + `/users/${userId}/wishPlace`;

    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const KakaoMapWebView = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message.message);
  const { id } = useSelector((state: RootState) => state.user);
  const webViewRef = useRef<WebView | null>(null);

  const [deeplink, setDeeplink] = useState<string>("");
  const [wishPlaces, setWishPlaces] = useState<WishPlaceData[]>([]);

  const route = useRoute();
  useEffect(() => {
    if (route && route.params) {
      const { address } = route?.params as { address?: string };
      try {
        const decodedString = decodeURIComponent(address!);
        setDeeplink(decodedString);
      } catch (error) {
        setDeeplink(address!);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      setWishPlaces(await getWishPlace(id));
    })();
  }, []);

  useEffect(() => {
    if (message && webViewRef.current) {
      webViewRef.current.postMessage(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  const handleOnMessage = ({ nativeEvent: { data } }: NativeEvent) => {
    if (JSON.parse(data).type === "initialize" && webViewRef.current) {
      const jsonData = {
        type: "enteringExplore",
        data: { userId: id },
      };

      webViewRef.current.postMessage(JSON.stringify(jsonData));
      dispatch(clearMessage());
    }
    // 마커를 클릭했을 때
    else if (JSON.parse(data).type === "markerClick" && webViewRef.current) {
      const infoData: MarkerState = JSON.parse(data).data;
      const hasMatchingPlace = wishPlaces.some(
        (wishPlace) => wishPlace.address === infoData.address
      );
      dispatch(
        setMarkerInfo({
          placeId: infoData.placeId,
          address: infoData.address,
          markerName: infoData.markerName,
          parkingInfo: infoData.parkingInfo,
          advice: infoData.advice,
          admissionFee: infoData.admissionFee,
          closedDays: infoData.closedDays,
          subwayInfo: infoData.subwayInfo,
          busInfo: infoData.busInfo,
          isMarkerClicked: true,
          isWishClicked: hasMatchingPlace,
        })
      );
    }
    // 마커 외의 부분을 클릭했을 때
    else if (JSON.parse(data).type === "mapClick" && webViewRef.current) {
      // 마커를 끈다.
      dispatch(setMarkerInfo({ isMarkerClicked: false }));
    }
    if (
      JSON.parse(data).type === "initializationComplete" &&
      webViewRef.current &&
      deeplink !== ""
    ) {
      const jsonData = {
        type: "placeSelect",
        data: { zoomLevel: 6, address: deeplink },
      };
      webViewRef.current.postMessage(JSON.stringify(jsonData));
      dispatch(clearMessage());
    }
  };

  return (
    <KakaoMap
      onMessage={handleOnMessage}
      ref={webViewRef}
      source={{ uri: SERVER_URL + "/kakaomap" }}
    />
    // <KakaoMap
    //   onMessage={handleOnMessage}
    //   ref={webViewRef}
    //   source={{ uri: "https://code.tutiserver.kro.kr/proxy/3000/kakaomap" }}
    // />
  );
};

const KakaoMap = styled(WebView)`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
`;

export default KakaoMapWebView;
