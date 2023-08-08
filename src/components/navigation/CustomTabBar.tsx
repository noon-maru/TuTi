import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";

import { TabNavigationState, ParamListBase } from "@react-navigation/native";

import { navigate } from "redux/slice/screenSlice";

import { styled } from "styled-components/native";

type TabNavigationProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
};

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: TabNavigationProps) => {
  const dispatch = useDispatch();

  const handleNavigate = (name: string) => {
    dispatch(navigate({ name }));
  };

  useEffect(() => {
    if (state.index !== null) {
      handleNavigate(state.routes[state.index].name);
    }
  }, [state.index]);

  const insets = useSafeAreaInsets();
  return (
    <BorderGradient
      colors={["#55D31C", "#5270FF"]} // 그라데이션 색상 배열
      start={{ x: 0.45, y: 0 }} // 그라데이션 시작점 (왼쪽 상단) (범위: 0~1)
      end={{ x: 0.75, y: 0 }} // 그라데이션 끝점 (오른쪽 상단) (범위: 0~1)
      height={insets.bottom}
    >
      <Container height={insets.bottom}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          // 하단 탭바에 Tour Screen은 안뜨도록 커스텀
          if (route.name === "Tour") return null;

          const { options } = descriptors[route.key];

          // 탭바 요소 가져오기
          const tabBarLabelFunc = options.tabBarLabel;
          const tabBarIconFunc = options.tabBarIcon;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TabItemContainer
              key={route.key}
              onPress={onPress}
              activeOpacity={1}
            >
              {tabBarIconFunc()}
              {tabBarLabelFunc({ focused: isFocused })}
            </TabItemContainer>
          );
        })}
      </Container>
    </BorderGradient>
  );
};

const BorderGradient = styled(LinearGradient)<{ height: number }>`
  height: ${(props) => props.height + 70}px;
`;

const Container = styled.View<{ height: number }>`
  top: 2px;
  flex-direction: row;
  background-color: white;
  height: ${(props) => props.height + 70}px;
`;

const TabItemContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  gap: 6px;
`;

export default CustomTabBar;
