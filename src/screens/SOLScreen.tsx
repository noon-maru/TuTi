import { Dimensions, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SOLScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <Text>SOL Screen</Text>
      </Container>
    </>
  );
};

const StatusBarBackgroundColor = styled.View<{ height: number }>`
  width: ${SCREEN_WIDTH}px;
  height: ${(props) => props.height}px;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  margin-top: 53px;
`;

export default SOLScreen;
