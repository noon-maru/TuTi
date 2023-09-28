import { Dimensions, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";
import CourseTabContent from "components/Tour/CourseTabContent";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const BoxScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <MainContentsContainer>
          <TabContentsContainer
            contentContainerStyle={{ gap: 10 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <CourseTabContent
              title={"A 코스"}
              duration={"TIME 30 ~ 40"}
            ></CourseTabContent>
            <CourseTabContent
              title={"B 코스"}
              duration={"TIME 10 ~ 20"}
            ></CourseTabContent>
            <CourseTabContent
              title={"C 코스"}
              duration={"TIME 40 ~ 60"}
            ></CourseTabContent>
          </TabContentsContainer>
        </MainContentsContainer>
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

const SearchBoxContainer = styled.View`
  position: relative;
  justify-content: flex-end;
  align-items: center;

  width: ${SCREEN_WIDTH}px;
  height: 51px;
`;

const MainContentsContainer = styled.View`
  flex: 1;

  width: 100%;

  padding: 25px;
`;

const TabButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const TabButton = styled(LinearGradient)`
  width: 100%;
  padding: 6px 10px;

  border-radius: 10px;
`;

const TabContentsContainer = styled.ScrollView`
  flex: 1;

  margin-top: 8px;
`;

const Submit = styled.Pressable`
  align-self: flex-end;

  justify-content: center;
  align-items: center;

  width: 90px;
  height: 25px;

  border-radius: 10px;

  background-color: gray;
`;

export default BoxScreen;
