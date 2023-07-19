import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { styled } from "styled-components/native";

// TODO: 스피너 이미지 새로 수정해야 됨
const Spinner = () => {
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationDuration1 = 100; // 첫 번째 이미지의 나타나는 시간 간격 (밀리초)
    const animationDuration2 = 300; // 두 번째 이미지의 나타나는 시간 간격 (밀리초)
    const animationDuration3 = 100; // 세 번째 이미지의 나타나는 시간 간격 (밀리초)

    const animateSpinner = () => {
      Animated.sequence([
        Animated.timing(opacity1, {
          toValue: 1,
          duration: animationDuration1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: animationDuration2,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          duration: animationDuration3,
          useNativeDriver: true,
        }),
      ]).start(() => {
        opacity1.setValue(0);
        opacity2.setValue(0);
        opacity3.setValue(0);
        animateSpinner();
      });
    };

    animateSpinner();
  }, [opacity1, opacity2, opacity3]);

  return (
    <SpinnerContainer>
      <SpinnerImage
        source={require("assets/spinner/spinner1.png")}
        style={{ opacity: opacity1 }}
      />
      <SpinnerImage
        source={require("assets/spinner/spinner2.png")}
        style={{ opacity: opacity2 }}
      />
      <SpinnerImage
        source={require("assets/spinner/spinner3.png")}
        style={{ opacity: opacity3 }}
      />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const SpinnerImage = styled(Animated.Image)`
  width: 50px;
  height: 50px;
  position: absolute;
`;

export default Spinner;
