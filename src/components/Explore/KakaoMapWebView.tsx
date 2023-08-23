import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import WebView from "react-native-webview";

import styled from "styled-components/native";

import { SERVER_URL } from "@env";

import { RootState } from "redux/reducers";
import { clearMessage } from "redux/slice/messageSlice";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const KakaoMapWebView = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message.message);
  const webViewRef = useRef<WebView | null>(null);

  useEffect(() => {
    if (message && webViewRef.current) {
      webViewRef.current.postMessage(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  return (
    // react 개발 서버 url: https://code.tutiserver.kro.kr/proxy/3000
    // <KakaoMap source={{ uri: SERVER_URL }} />
    <KakaoMap ref={webViewRef} source={{ uri: SERVER_URL }} />
  );
};

const KakaoMap = styled(WebView)`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
`;

export default KakaoMapWebView;
