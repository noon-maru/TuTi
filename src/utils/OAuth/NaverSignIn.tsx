import { useState, useEffect, PropsWithoutRef } from "react";
import axios from "axios";

import { SERVER_URL, API } from "@env";

import { UserState } from "redux/slice/userSlice";

import SocialLoginButton from "components/SocialLoginButton";

import NaverLogin, {
  NaverLoginResponse,
} from "@react-native-seoul/naver-login";

interface NaverSignInProps {
  handleLogin: (id: string, name: string, profile: string) => void;
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
    profile: "",
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
        profile: profileResult!.response?.profile_image ?? "",
      });
      // console.log(profileResult);
    } catch (e: any) {
      setProfileRes({
        id: "",
        name: "",
        profile: "",
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [success]);

  useEffect(() => {
    if (profileRes.id !== "") {
      handleLogin(profileRes.id, profileRes.name, profileRes.profile);

      (async () => {
        const response = await axios.post(SERVER_URL + API + "/users/login", {
          id: profileRes.id,
          username: profileRes.name,
          profile: profileRes.profile,
        });

        // console.log(response.data);
      })();
    }
  }, [profileRes]);

  return (
    <>
      <SocialLoginButton
        icon={require("assets/OAuth/NaverIcon.png")}
        backgroundColor={"#03c75a"}
        text={"네이버로 로그인"}
        textColor={"white"}
        onPress={() => signIn()}
      />
      {/* <Button title={"네이버 로그아웃"} onPress={() => logout()} /> */}
    </>
  );
};

export default NaverSignIn;
