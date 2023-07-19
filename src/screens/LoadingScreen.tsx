import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Dimensions, Animated, ImageSourcePropType } from "react-native";
import { styled } from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface LoadingScreenProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingScreen = ({ setIsLoading }: LoadingScreenProps) => {
  const sloganWidth = useRef(new Animated.Value(0)).current;
  const runnerDistance = useRef(new Animated.Value(20)).current;

  const [imageSource, setImageSource] = useState(
    require("assets/icon/runner1.png")
  );

  useEffect(() => {
    const animation = Animated.timing(sloganWidth, {
      toValue: SCREEN_WIDTH * 0.8,
      duration: 1000,
      useNativeDriver: false,
    });
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  useEffect(() => {
    const animation = Animated.timing(runnerDistance, {
      toValue: 305,
      duration: 1000,
      useNativeDriver: false,
    });

    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSource((prevSource: ImageSourcePropType) => {
        if (prevSource === require("assets/icon/runner1.png")) {
          return require("assets/icon/runner2.png");
        } else {
          return require("assets/icon/runner1.png");
        }
      });
    }, 300);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsLoading(true);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container>
      <SloganContainer style={{ width: sloganWidth }}>
        <Slogan source={require("assets/icon/logo/slogan.png")} />
      </SloganContainer>
      <BottomBox>
        <RunnerContainer style={{ width: runnerDistance }}>
          <Runner source={imageSource} />
        </RunnerContainer>
      </BottomBox>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SloganContainer = styled(Animated.View)`
  flex: 1;
  justify-content: flex-end;

  overflow: hidden;
  align-self: flex-start;
  margin-left: ${SCREEN_WIDTH * 0.1}px;
`;

const Slogan = styled.Image`
  width: 305px;
  height: 25px;
`;

const BottomBox = styled.View`
  flex: 1;
  justify-content: center;

  align-self: flex-start;
  margin-left: ${SCREEN_WIDTH * 0.1}px;
`;

const RunnerContainer = styled(Animated.View)`
  padding-bottom: 10px;

  border-bottom-width: 6px;
  border-bottom-color: white;

  align-items: flex-end;
`;

const Runner = styled.Image`
  width: 20px;
  height: 27.27px;
`;
export default LoadingScreen;
