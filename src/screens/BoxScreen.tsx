import { Dimensions, View, Text, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styled } from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const BoxScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <StatusBarBackgroundColor height={insets.top} />
      <Container paddingTop={insets.top}>
        <Text>Box Screen</Text>
      </Container>
    </>
  );
};

const StatusBarBackgroundColor = styled.View<{ height: number }>`
  width: ${SCREEN_WIDTH}px;
  height: ${(props) => props.height}px;
  background-color: white;
`;

const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-top: 53px;
`;

export default BoxScreen;
