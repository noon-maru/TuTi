import { useRoute } from "@react-navigation/native";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import WebView from "react-native-webview";

import styled from "styled-components/native";

import { SERVER_URL } from "@env";

import { RootState } from "redux/reducers";
import { clearMessage } from "redux/slice/messageSlice";
import {
  MarkerState,
  setMarkerInfo,
  toggleMarkerClick,
} from "redux/slice/markerSlice";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface NativeEvent {
  nativeEvent: { data: string };
}

const KakaoMapWebView = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message.message);
  const { id } = useSelector((state: RootState) => state.user);
  const webViewRef = useRef<WebView | null>(null);

  const [deeplink, setDeeplink] = useState<string>("");

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
      dispatch(
        setMarkerInfo({
          address: infoData.address,
          markerName: infoData.markerName,
          admissionFee: infoData.admissionFee,
          closedDays: infoData.closedDays,
          subwayInfo: infoData.subwayInfo,
          busInfo: infoData.busInfo,
          isMarkerClicked: true,
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
