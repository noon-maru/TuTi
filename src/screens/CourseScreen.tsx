import { useRef } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import Modal from "components/Course/Modal";
import { StyledText } from "~/styles/globalStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CourseScreen = () => {
  const insets = useSafeAreaInsets();

  const ref = useRef(null);

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <StyledText style={{ fontSize: 15, color: black }}></StyledText>
        <Modal />
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

  background-color: white;
`;

export default CourseScreen;
