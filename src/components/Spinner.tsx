import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { styled } from "styled-components/native";

// TODO: 스피너 이미지 새로 수정해야 됨
const Spinner = () => {
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  const opacity4 = useRef(new Animated.Value(0)).current;
  const opacity5 = useRef(new Animated.Value(0)).current;
  const opacity6 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSpinner = () => {
      Animated.sequence([
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity4, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity5, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity6, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity6, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity5, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity4, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 애니메이션이 완료되면 opacity 값을 초기화하여 다음 애니메이션을 위해 준비합니다.
        opacity1.setValue(0);
        opacity2.setValue(0);
        opacity3.setValue(0);
        opacity4.setValue(0);
        opacity5.setValue(0);
        opacity6.setValue(0);

        animateSpinner();
      });
    };

    animateSpinner();
  }, [opacity1, opacity2, opacity3, opacity4, opacity5, opacity6]);

  return (
    <SpinnerContainer>
      <SpinnerImage
        source={require("assets/spinner/loading1.png")}
        style={{ opacity: opacity1 }}
      />
      <SpinnerImage
        source={require("assets/spinner/loading2.png")}
        style={{ opacity: opacity2 }}
      />
      <SpinnerImage
        source={require("assets/spinner/loading3.png")}
        style={{ opacity: opacity3 }}
      />
      <SpinnerImage
        source={require("assets/spinner/loading4.png")}
        style={{ opacity: opacity4 }}
      />
      <SpinnerImage
        source={require("assets/spinner/loading5.png")}
        style={{ opacity: opacity5 }}
      />
      <SpinnerImage
        source={require("assets/spinner/loading6.png")}
        style={{ opacity: opacity6 }}
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
