import { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { useDispatch } from "react-redux";

import { setNavigation } from "redux/slice/navigationSlice";

import { styled } from "styled-components/native";

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 드로어 헤더에 하단 탭바 네비게이션을 전달하기 위한 세팅
    dispatch(setNavigation(navigation));
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Container>
        <Text>Home Screen</Text>
      </Container>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
`;

export default HomeScreen;
