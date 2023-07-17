import { View } from "react-native";
import { useDispatch } from "react-redux";
import { login, logout } from "redux/userSlice";

import styled from "styled-components/native";

import GoogleSignIn from "utils/OAuth/GoogleSignIn";
import KakaoSignIn from "utils/OAuth/KakaoSignIn";
import NaverSignIn from "utils/OAuth/NaverSignIn";

const SignInMethodScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = (id: string, name: string) => {
    // 로그인 처리 후 사용자 정보 디스패치
    const userInfo = { id: id, name: name };
    dispatch(login(userInfo));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Logo source={require("assets/icon/logo/logo(white).png")} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 60 }}>
        <TextLogo source={require("assets/icon/logo/text_logo(white).png")} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 35,
        }}
      >
        <GoogleSignIn handleLogin={handleLogin} />
        <KakaoSignIn handleLogin={handleLogin} />
        <NaverSignIn handleLogin={handleLogin} />
      </View>
    </View>
  );
};

const Logo = styled.Image`
  width: 130px;
  height: 130px;
`;

const TextLogo = styled.Image`
  width: 100px;
  height: 32px;
`;

export default SignInMethodScreen;
