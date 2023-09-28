import { useState } from "react";
import { Pressable, View } from "react-native";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/FontAwesome";

import styled from "styled-components/native";

import { BoldStyledText } from "styles/globalStyles";

import STT from "components/STT";

interface ModalProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

const Modal = ({ searchText, setSearchText, children }: ModalProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      from={
        <Pressable onPress={() => setVisible(true)} style={{ width: "100%" }}>
          {children}
        </Pressable>
      }
      popoverStyle={{
        width: 300,
        height: 200,

        borderRadius: 30,
        borderWidth: 0.5,
        borderLeftColor: "#EFEFF0",
        borderRightColor: "#EFEFF0",
        borderTopColor: "#EFEFF0",
        borderBottomColor: "#EFEFF0",
      }}
      placement={PopoverPlacement.FLOATING}
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      statusBarTranslucent
    >
      <PopoverContainer>
        <SearchBoxContainer>
          <Shadow distance={4} offset={[0, 4]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                width: 280,
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
        </SearchBoxContainer>
      </PopoverContainer>
    </Popover>
  );
};

const PopoverContainer = styled.View`
  margin: 10px;

  gap: 8px;
`;

const SearchBoxContainer = styled.View``;

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

export default Modal;
