import { PropsWithoutRef } from "react";
import axios from "axios";

import { SERVER_URL, API } from "@env";

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

      const user = {
        id: result.id,
        username: result.nickname,
        profile: result.profileImageUrl,
      };
      handleLogin(user.id, user.username, user.profile);

      const response = await axios.post(
        SERVER_URL + API + "/users/login",
        user
      );
      // console.log(response);
    } catch (e: any) {
      console.log(`프로필 가져오기 실패(code:${e.code})`, e.message);
    }
  };

  return (
    <SocialLoginButton
      icon={require("assets/OAuth/KakaoIcon.png")}
      backgroundColor={"#FEE500"}
      text={"카카오로 로그인"}
      textColor={"black"}
      onPress={() => signin()}
    />
  );
};

export default KakaoSignIn;
