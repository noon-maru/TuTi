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
    <Container>
      <LogoContainer>
        <Logo source={require("assets/icon/logo/logo(white).png")} />
        <TextLogo source={require("assets/icon/logo/textLogo(white).png")} />
      </LogoContainer>
      <ButtonContainer>
        <GoogleSignIn handleLogin={handleLogin} />
        <KakaoSignIn handleLogin={handleLogin} />
        <NaverSignIn handleLogin={handleLogin} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const LogoContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 22px;
`;

const Logo = styled.Image`
  width: 130px;
  height: 130px;
`;

const TextLogo = styled.Image`
  width: 100px;
  height: 32px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 35px;
`;

export default SignInMethodScreen;
