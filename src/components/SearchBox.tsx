import { useState } from "react";
import { Dimensions, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/FontAwesome";

import styled from "styled-components/native";

import STT from "./STT";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SearchBox = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <Container>
      <Shadow distance={4} offset={[0, 4]}>
        {/* 이유는 모르겠으나, Shadow 바로 아래에는 styled-components를 쓰면 radius가 안먹힌다. 버그인듯 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            width: SCREEN_WIDTH - 40,
            height: 36,

            paddingLeft: 10,
            paddingRight: 10,

            borderRadius: 10,

            backgroundColor: "#efefef",
          }}
        >
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
    </Container>
  );
};

const Container = styled.View`
  position: absolute;

  margin-top: 15px;
`;

const SearchIcon = styled(Icon)`
  padding-right: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 0;
  margin: 0;
  font-size: 17px;
`;

export default SearchBox;
