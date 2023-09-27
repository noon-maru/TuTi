import { useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LinearGradient from "react-native-linear-gradient";

import { styled } from "styled-components/native";
import { StyledText } from "styles/globalStyles";

import SearchBox from "components/SearchBox";
import CourseTabContent from "components/Tour/CourseTabContent";
import WishTabContent from "components/Tour/WishTabContent";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const TourScreen = () => {
  const insets = useSafeAreaInsets();

  const [isCourse, setIsCourse] = useState<boolean>(true);

  return (
    <>
      <StatusBarBackgroundColor height={insets.top} />
      <Container>
        <SearchBoxContainer>
          <SearchBox />
        </SearchBoxContainer>
        <MainContentsContainer>
          <TabButtonContainer>
            <Pressable onPress={() => setIsCourse(true)}>
              <TabButton
                colors={
                  isCourse
                    ? ["#1F78FC80", "#33C5AD80"]
                    : ["#00000000", "#00000000"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <StyledText style={{ fontSize: 17, color: "black" }}>
                  코스 가져오기
                </StyledText>
              </TabButton>
            </Pressable>
            <Pressable onPress={() => setIsCourse(false)}>
              <TabButton
                colors={
                  isCourse
                    ? ["#00000000", "#00000000"]
                    : ["#1F78FC80", "#33C5AD80"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <StyledText style={{ fontSize: 17, color: "black" }}>
                  찜 가져오기
                </StyledText>
              </TabButton>
            </Pressable>
          </TabButtonContainer>
          {isCourse ? (
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
          ) : (
            <TabContentsContainer
              contentContainerStyle={{ gap: 10 }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              <WishTabContent
                title={"A 장소"}
                address={"대충 적당한 주소"}
              ></WishTabContent>
              <WishTabContent
                title={"B 장소"}
                address={"대충 적당한 주소"}
              ></WishTabContent>
            </TabContentsContainer>
          )}

          <Submit>
            <StyledText style={{ fontSize: 15, color: "white" }}>
              선택
            </StyledText>
          </Submit>
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

  background-color: white;
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

export default TourScreen;
