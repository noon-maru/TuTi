import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/FontAwesome";

import styled from "styled-components/native";

import STT from "../STT";
import SearchResults from "./SearchResults";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SearchBox = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);

  const dynamicHeight = useRef(new Animated.Value(0)).current;

  const animatedStyle = {
    height: dynamicHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [36, 300], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  useEffect(() => {
    if (searchText !== "") setExpanded(true);
    else setExpanded(false);
  }, [searchText]);

  useEffect(() => {
    Animated.timing(dynamicHeight, {
      toValue: expanded ? 1 : 0, // 확장되거나 축소될 때의 값
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  }, [dynamicHeight, expanded]);

  return (
    <Container>
      <Shadow distance={4} offset={[0, 4]}>
        <View style={styles.searchBoxContainer}>
          <SearchIcon name="search" size={17} color="gray" />
          <SearchInput
            placeholder="Search"
            placeholderTextColor={"#3C3C43"}
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
          <STT setSearchText={setSearchText} />
        </View>
      </Shadow>
      <SearchResultsBackground style={animatedStyle}>
        <SearchResults searchText={searchText} />
      </SearchResultsBackground>
    </Container>
  );
};

const Container = styled.Pressable`
  position: absolute;

  margin-top: 15px;
`;

const SearchResultsBackground = styled(Animated.View)`
  top: -36px;

  width: ${SCREEN_WIDTH - 40}px;

  padding-top: 36px;

  border-radius: 10px;

  background-color: white;

  overflow: hidden;
  z-index: -1;
`;

const SearchIcon = styled(Icon)`
  padding-right: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 0;
  margin: 0;
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 17px;
`;

const styles = StyleSheet.create({
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",

    width: SCREEN_WIDTH - 40,
    height: 36,

    paddingLeft: 10,
    paddingRight: 10,

    borderRadius: 10,

    backgroundColor: "white",
  },
});

export default SearchBox;
