import { useState, useEffect, PropsWithoutRef } from "react";
import { UserState } from "redux/userSlice";

import SocialLoginButton from "components/SocialLoginButton";

import NaverLogin, {
  NaverLoginResponse,
} from "@react-native-seoul/naver-login";

interface NaverSignInProps {
  handleLogin: (id: string, name: string) => void;
}

const consumerKey = "7ceLJlYIB6Syx2ULoKQX";
const consumerSecret = "gCNfVO54vy";
const appName = "TuTi";
const serviceUrlScheme = "tuti";

const NaverSignIn = ({ handleLogin }: PropsWithoutRef<NaverSignInProps>) => {
  const [success, setSuccessResponse] =
    useState<NaverLoginResponse["successResponse"]>();
  const [failure, setFailureResponse] =
    useState<NaverLoginResponse["failureResponse"]>();
  const [profileRes, setProfileRes] = useState<UserState>({
    id: "",
    name: "",
  });

  const signIn = async () => {
    const { failureResponse, successResponse } = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    setSuccessResponse(successResponse);
    setFailureResponse(failureResponse);
  };

  const logout = async () => {
    try {
      await NaverLogin.logout();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
    } catch (e: any) {
      console.error(e);
    }
  };

  const getProfile = async () => {
    try {
      const profileResult = await NaverLogin.getProfile(success!.accessToken);
      setProfileRes({
        id: profileResult!.response.id,
        name: profileResult!.response.name,
      });
      // console.log(profileResult);
    } catch (e: any) {
      setProfileRes({
        id: "",
        name: "",
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [success]);

  useEffect(() => {
    handleLogin(profileRes.id, profileRes.name);
  }, [profileRes]);

  return (
    <>
      <SocialLoginButton
        icon={require("assets/OAuth/Naver_login_icon.png")}
        backgroundColor={"#03c75a"}
        text={"네이버로 계속하기"}
        textColor={"white"}
        onPress={() => signIn()}
      />
      {/* <Button title={"네이버 로그아웃"} onPress={() => logout()} /> */}
    </>
  );
};

export default NaverSignIn;
