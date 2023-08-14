import { useDispatch } from "react-redux";
import { login } from "redux/slice/userSlice";

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

import AppleSignIn from "utils/OAuth/AppleSigeIn";
import GoogleSignIn from "utils/OAuth/GoogleSignIn";
import KakaoSignIn from "utils/OAuth/KakaoSignIn";
import NaverSignIn from "utils/OAuth/NaverSignIn";

const SignInMethodScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = (id: string, name: string, profile: string = "") => {
    // 로그인 처리 후 사용자 정보 디스패치
    const userInfo = { id, name, profile };
    dispatch(login(userInfo));
  };

  return (
    <Container>
      <LogoContainer>
        <Logo source={require("assets/icon/logo/logo(white).png")} />
        <TextLogo source={require("assets/icon/logo/textLogo(white).png")} />
      </LogoContainer>
      <ButtonContainer>
        <AppleSignIn handleLogin={handleLogin} />
        <GoogleSignIn handleLogin={handleLogin} />
        <KakaoSignIn handleLogin={handleLogin} />
        <NaverSignIn handleLogin={handleLogin} />
        <GuestLogin onPress={() => handleLogin("guest", "게스트")}>
          <GuestLoginText>게스트로 로그인</GuestLoginText>
        </GuestLogin>
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
  gap: 6px;
`;

const GuestLogin = styled.TouchableOpacity``;
const GuestLoginText = styled(StyledText)`
  margin-top: 10px;

  text-decoration-line: underline;
  color: rgba(255, 255, 255, 0.7);
`;

export default SignInMethodScreen;
