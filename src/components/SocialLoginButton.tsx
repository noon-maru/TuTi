import { PropsWithoutRef } from "react";
import { Dimensions, Image, ImageSourcePropType } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

export interface SocialLoginButtonProps {
  icon: ImageSourcePropType;
  backgroundColor: string;
  text: string;
  textColor: string;
  onPress: () => void;
}

interface LoginButtonProps {
  bgColor: string;
}

const SocialLoginButton = ({
  icon,
  backgroundColor,
  text,
  textColor,
  onPress,
}: PropsWithoutRef<SocialLoginButtonProps>) => {
  return (
    <LoginButton bgColor={backgroundColor} onPress={onPress}>
      {/* 소셜 로그인 버튼 디자인 및 내용 */}
      <Image
        source={icon}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
      <LoginText textColor={textColor}>{text}</LoginText>
    </LoginButton>
  );
};

const LoginButton = styled.TouchableOpacity<LoginButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.bgColor};

  width: ${SCREEN_WIDTH * 0.6}px;
  height: 45px;

  border-radius: 12px;
`;

const LoginText = styled(StyledText)<{ textColor: string }>`
  color: ${(props) => props.textColor};
  font-size: 14.5px;
`;

export default SocialLoginButton;
