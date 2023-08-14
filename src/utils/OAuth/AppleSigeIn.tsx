import { useEffect, PropsWithoutRef } from "react";
import { Platform } from "react-native";
// import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import axios from "axios";

import { SERVER_URL, API } from "@env";

import {
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";

import SocialLoginButton from "components/SocialLoginButton";

interface AppleSignInProps {
  handleLogin: (id: string, name: string, profile: string) => void;
}

// 추후 Apple 개발자 계정 만들고, 실제 로그인 기능 추가해야 됨.
const AppleSignIn = ({ handleLogin }: PropsWithoutRef<AppleSignInProps>) => {
  const signIn = async () => {
    try {
      if (Platform.OS === "ios") {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user
        );

        if (credentialState === appleAuth.State.AUTHORIZED) {
          // 사용자가 인증되었습니다.
          // IOS에서 Apple 로그인 완료
        }
      } else if (Platform.OS === "android") {
        const rawNonce = uuid();
        const state = uuid();

        appleAuthAndroid.configure({
          clientId: "YOUR_CLIENT_ID",
          redirectUri: "YOUR_REDIRECT_URI",
          responseType: appleAuthAndroid.ResponseType.ALL,
          scope: appleAuthAndroid.Scope.ALL,
          nonce: rawNonce,
          state,
        });

        const response = await appleAuthAndroid.signIn();

        // 결과를 서버로 보내 인증 코드를 확인
        // Android에서 Apple 로그인 완료
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      const unsubscribe = appleAuth.onCredentialRevoked(() => {
        console.warn("사용자 자격증명이 취소되었습니다.");
      });

      return unsubscribe;
    }
  }, []);

  return (
    <SocialLoginButton
      icon={require("assets/OAuth/AppleIcon.png")}
      backgroundColor={"white"}
      text={"Apple로 로그인"}
      textColor={"black"}
      onPress={signIn}
    />
  );
};

export default AppleSignIn;
