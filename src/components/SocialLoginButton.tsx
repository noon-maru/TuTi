import { PropsWithoutRef } from "react";
import { Dimensions, Image, ImageSourcePropType, Text } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

import styled from "styled-components/native";

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
      <Text style={{ color: textColor, fontSize: 19 }}>{text}</Text>
    </LoginButton>
  );
};

const LoginButton = styled.TouchableOpacity<LoginButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.bgColor};

  width: ${SCREEN_WIDTH * 0.6}px;
  height: 44px;

  border-radius: 12px;
`;

export default SocialLoginButton;
