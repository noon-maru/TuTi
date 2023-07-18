import { PropsWithoutRef } from "react";

import SocialLoginButton from "components/SocialLoginButton";

import * as KakaoLogin from "@react-native-seoul/kakao-login";

interface KakaoSignInProps {
  handleLogin: (id: string, name: string, profile: string) => void;
}

const KakaoSignIn = ({ handleLogin }: PropsWithoutRef<KakaoSignInProps>) => {
  const signin = async () => {
    try {
      const result = await KakaoLogin.login();
      console.log("로그인 성공", JSON.stringify(result));
      getProfile();
    } catch (e: any) {
      if (e.code === "E_CANCELLED_OPERATION") {
        console.log("로그인 취소", e.message);
      } else {
        console.log(`로그인 실패(code:${e.code})`, e.message);
      }
    }
  };

  const getProfile = async () => {
    try {
      const result = await KakaoLogin.getProfile();
      console.log("프로필 가져오기 성공", JSON.stringify(result));
      handleLogin(result.id, result.nickname, result.profileImageUrl);
    } catch (e: any) {
      console.log(`프로필 가져오기 실패(code:${e.code})`, e.message);
    }
  };

  return (
    <SocialLoginButton
      icon={require("assets/OAuth/Kakao_login_icon.png")}
      backgroundColor={"#FEE500"}
      text={"카카오로 계속하기"}
      textColor={"black"}
      onPress={() => signin()}
    />
  );
};

export default KakaoSignIn;
