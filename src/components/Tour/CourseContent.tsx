import { useEffect, useRef, useState } from "react";
import { Animated, Image, LayoutChangeEvent, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "styles/globalStyles";
import PlaceContainer from "./PlaceContainer";

import { toggleCourse } from "redux/slice/courseSlice";
import { useDispatch } from "react-redux";
import CheckModal from "./CheckModal";

interface CourseContentProps {
  course: Course;
}

const CourseContent = ({ course }: CourseContentProps) => {
  const { courseName, travelTime, places, isProgress } = course;

  const dispatch = useDispatch();

  const dynamicHeight = useRef(new Animated.Value(0)).current;
  const [ContentsBoxHeight, setContentsBoxHeight] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    if (travelTime.length)
      setTotalTime(
        travelTime.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      );
  }, [travelTime]);

  useEffect(() => {
    if (isProgress) setExpanded(true);
  }, [isProgress]);

  const toggleExpand = () => {
    if (!isProgress) {
      setExpanded(!expanded);

      // 애니메이션 값 변경
      Animated.timing(dynamicHeight, {
        toValue: expanded ? 0 : 1, // 확장되거나 축소될 때의 값
        duration: 300, // 애니메이션 지속 시간 (밀리초)
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
    }
  };

  const animatedStyle = {
    height: isProgress
      ? 36 + ContentsBoxHeight
      : dynamicHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [36, 36 + ContentsBoxHeight], // 버튼의 높이를 확장하려면 이 값을 조절
        }),
  };

  const handleContentsBoxLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentsBoxHeight(height);
  };

  const handleCourseProgress = () => {
    setExpanded(!expanded);
    dispatch(toggleCourse(courseName));
  };

  return (
    <Container style={[animatedStyle]}>
      <Pressable onPress={toggleExpand}>
        <Header
          colors={
            expanded ? ["#1F78FC80", "#33C5AD80"] : ["#1F78FC40", "#33C5AD40"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TitleTextContainer>
            <BoldStyledText
              style={{ fontSize: 15, color: "black" }}
            >{`□ ${courseName}`}</BoldStyledText>
            {isProgress ? (
              <StyledText style={{ fontSize: 13, color: "white" }}>
                {`${
                  Math.floor(totalTime / 60)
                    ? `${Math.floor(totalTime / 60)} 시간`
                    : ""
                } ${totalTime % 60} 분`}
              </StyledText>
            ) : null}
          </TitleTextContainer>
          {isProgress ? (
            <CheckModal handleCourseProgress={handleCourseProgress}>
              <EndButton>
                <StyledText style={{ fontSize: 11, color: "#7FCFE9" }}>
                  종료
                </StyledText>
              </EndButton>
            </CheckModal>
          ) : (
            <>
              {expanded ? (
                <Image
                  source={require("@assets/icon/unfold.png")}
                  style={{ width: 12, height: 11.74 }}
                />
              ) : (
                <Image
                  source={require("@assets/icon/open.png")}
                  style={{ width: 12, height: 11.74 }}
                />
              )}
            </>
          )}
        </Header>
      </Pressable>
      <ContentsBox onLayout={handleContentsBoxLayout}>
        {places?.map((place, index) => (
          <PlaceContainer
            key={index}
            courseId={course._id}
            place={place}
            recordedImages={course.recordImages}
            isLast={index === places.length - 1}
          />
        ))}
      </ContentsBox>
    </Container>
  );
};

const Container = styled(Animated.View)`
  overflow: hidden;

  border-width: 1px;
  border-color: #7fcfe9;
  border-radius: 10px;
`;

const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 36px;

  padding: 0 15px;
`;

const TitleTextContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ContentsBox = styled.View`
  padding-top: 25px;
  padding-bottom: 30px;
  padding-left: 23px;
  padding-right: 23px;
`;

const EndButton = styled.View`
  justify-content: center;
  align-items: center;

  width: 46px;
  height: 20px;

  border-radius: 7px;

  background-color: white;
`;

export default CourseContent;
