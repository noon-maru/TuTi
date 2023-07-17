import { Button } from "react-native";
import * as KakaoLogin from "@react-native-seoul/kakao-login";

const KakaoSignIn = () => {
  const kakaoSignin = () => {
    KakaoLogin.login()
      .then((result) => {
        console.log("Login Success", JSON.stringify(result));
        kakaoGetProfile();
      })
      .catch((error) => {
        if (error.code === "E_CANCELLED_OPERATION") {
          console.log("Login Cancel", error.message);
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  const kakaoGetProfile = () => {
    KakaoLogin.getProfile()
      .then((result) => {
        console.log("GetProfile Success", JSON.stringify(result));
      })
      .catch((error) => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  return <Button title={"카카오 로그인"} onPress={() => kakaoSignin()} />;
};

export default KakaoSignIn;
