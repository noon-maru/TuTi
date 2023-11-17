import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  LayoutChangeEvent,
  Pressable,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/globalStyles";

import Editor from "./Editor";

interface PostProps {
  headTitle: string;
  date: string;
}

const Post = ({ headTitle, date }: PostProps) => {
  const dynamicHeight = useRef(new Animated.Value(0)).current;
  const [contentsBoxHeight, setContentsBoxHeight] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const animatedStyle = {
    height: dynamicHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [36, 36 + contentsBoxHeight], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  useEffect(() => {
    // 애니메이션 값 변경
    Animated.timing(dynamicHeight, {
      toValue: expanded ? 1 : 0, // 확장되거나 축소될 때의 값
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  }, [dynamicHeight, expanded]);

  const handleContentsBoxLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentsBoxHeight(height);
  };

  return (
    <Container>
      <BoardContent style={animatedStyle}>
        <Pressable onPress={toggleExpand}>
          <Header
            colors={
              expanded ? ["#1F78FC80", "#33C5AD80"] : ["#1F78FC40", "#33C5AD40"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <BoldStyledText>{headTitle}</BoldStyledText>

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <StyledText>{date}</StyledText>

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
            </View>
          </Header>
        </Pressable>
        <ContentsBox onLayout={handleContentsBoxLayout}>
          <Editor courseName={headTitle} />
        </ContentsBox>
      </BoardContent>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  background-color: white;
`;

const BoardContent = styled(Animated.View)`
  overflow: hidden;
  margin-bottom: 20px;

  background-color: white;
`;

const Header = styled(LinearGradient)`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  height: 36px;
  border-radius: 10px;

  padding: 0 20px;
`;

const ContentsBox = styled.View`
  border-radius: 8px;
`;

export default Post;
