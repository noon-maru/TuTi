import { useCallback } from "react";
import { Dimensions, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { styled } from "styled-components/native";

import { setTheme } from "redux/slice/themeSlice";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const NoteScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setTheme({ dark: true }));
      return () => {}; // 필요한 경우 cleanup 함수 추가
    }, [])
  );

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <Text>Note Screen</Text>
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

export default NoteScreen;
