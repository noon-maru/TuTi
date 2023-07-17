import { PropsWithoutRef } from "react";
import { View } from "react-native";

import SocialLoginButton from "components/SocialLoginButton";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

interface GoogleSignInProps {
  handleLogin: (id: string, name: string) => void;
}

GoogleSignin.configure({
  webClientId:
    "785213727290-7oabnbha5ph1dp7prtf9mm6rhrc2blk3.apps.googleusercontent.com",
  iosClientId:
    "785213727290-3u5j999or02njgumpf0qfec0tvvtt6li.apps.googleusercontent.com",
  offlineAccess: true,
});

const GoogleSignIn = ({ handleLogin }: PropsWithoutRef<GoogleSignInProps>) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log(result);

      handleLogin(result.user.id, result.user?.name ?? "");
    } catch (e: any) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("사용자가 로그인 과정을 취소했습니다.");
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log("로그인이 이미 진행 중입니다.");
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(
          "Google Play 서비스를 사용할 수 없거나 오래된 버전을 사용중입니다."
        );
      } else {
        console.error(e);
      }
    }
  };

  return (
    <SocialLoginButton
      icon={require("assets/OAuth/Google_login_icon.png")}
      backgroundColor={"white"}
      text={"Google로 계속하기"}
      textColor={"black"}
      onPress={signIn}
    />
  );
};

export default GoogleSignIn;
