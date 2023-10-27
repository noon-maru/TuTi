import { useRef, useState } from "react";
import {
  Animated,
  Image,
  LayoutChangeEvent,
  Pressable,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { BoldStyledText } from "styles/globalStyles";
import PlaceContainer from "@components/Tour/PlaceContainer";
import CourseDeleteCheckModal from "./CourseDeleteCheckModal";

interface CourseContentProps {
  course: Course;
}

const CourseTabContent = ({ course }: CourseContentProps) => {
  const { courseName, places } = course;

  const dynamicHeight = useRef(new Animated.Value(0)).current;
  const [ContentsBoxHeight, setContentsBoxHeight] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);

    // 애니메이션 값 변경
    Animated.timing(dynamicHeight, {
      toValue: expanded ? 0 : 1, // 확장되거나 축소될 때의 값
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  };

  const animatedStyle = {
    height: dynamicHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [36, 36 + ContentsBoxHeight], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  const handleContentsBoxLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentsBoxHeight(height);
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
          </TitleTextContainer>
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
        </Header>
      </Pressable>
      <ContentsBox onLayout={handleContentsBoxLayout}>
        {places?.map((place, index) => (
          <PlaceContainer
            key={index}
            courseId={course._id}
            place={place}
            isLast={index === places.length - 1}
          />
        ))}
        <View style={{ alignItems: "flex-end" }}>
          <CourseDeleteCheckModal courseId={course._id}>
            <CourseDeleteButton
              colors={["#C8E0FD", "#CCF0EC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <BoldStyledText>{"코스 삭제"}</BoldStyledText>
            </CourseDeleteButton>
          </CourseDeleteCheckModal>
        </View>
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
  padding: 25px;
`;

const CourseDeleteButton = styled(LinearGradient)`
  padding: 5px 12px;

  border-radius: 7px;
`;

export default CourseTabContent;
