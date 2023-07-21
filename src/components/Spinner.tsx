import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

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

        // 애니메이션을 반복하려면 주석을 제거하세요.
        animateSpinner();
      });
    };

    animateSpinner();
  }, [opacity1, opacity2, opacity3, opacity4, opacity5, opacity6]);

  return (
    <View style={styles.spinnerContainer}>
      <Animated.Image
        source={require("assets/spinner/loading1.png")}
        style={[styles.spinnerImage, { opacity: opacity1 }]}
      />
      <Animated.Image
        source={require("assets/spinner/loading2.png")}
        style={[styles.spinnerImage, { opacity: opacity2 }]}
      />
      <Animated.Image
        source={require("assets/spinner/loading3.png")}
        style={[styles.spinnerImage, { opacity: opacity3 }]}
      />
      <Animated.Image
        source={require("assets/spinner/loading4.png")}
        style={[styles.spinnerImage, { opacity: opacity4 }]}
      />
      <Animated.Image
        source={require("assets/spinner/loading5.png")}
        style={[styles.spinnerImage, { opacity: opacity5 }]}
      />
      <Animated.Image
        source={require("assets/spinner/loading6.png")}
        style={[styles.spinnerImage, { opacity: opacity6 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerImage: {
    width: 50,
    height: 50,
    position: "absolute",
  },
});

export default Spinner;
