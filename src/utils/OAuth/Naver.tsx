import { useState } from "react";
import { View, Text, Button } from "react-native";

import NaverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
} from "@react-native-seoul/naver-login";

const consumerKey = "7ceLJlYIB6Syx2ULoKQX";
const consumerSecret = "gCNfVO54vy";
const appName = "TuTi";
const serviceUrlScheme = "tuti";

const Naver = () => {
  const [success, setSuccessResponse] =
    useState<NaverLoginResponse["successResponse"]>();
  const [failure, setFailureResponse] =
    useState<NaverLoginResponse["failureResponse"]>();
  const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

  const naverSigin = async () => {
    const { failureResponse, successResponse } = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    });
    setSuccessResponse(successResponse);
    setFailureResponse(failureResponse);
    naverGetProfile();
  };

  const naverLogout = async () => {
    try {
      await NaverLogin.logout();
      setSuccessResponse(undefined);
      setFailureResponse(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const naverGetProfile = async () => {
    try {
      const profileResult = await NaverLogin.getProfile(success!.accessToken);
      setGetProfileRes(profileResult);
      console.log(profileResult);
    } catch (e) {
      setGetProfileRes(undefined);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title={"네이버 로그인"} onPress={() => naverSigin()} />
      <Button title="Get Profile" onPress={naverGetProfile} />
      <Button title={"네이버 로그아웃"} onPress={() => naverLogout()} />
    </View>
  );
};

export default Naver;
