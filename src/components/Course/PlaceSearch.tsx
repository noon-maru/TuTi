import { Image, Pressable } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";

import Modal from "./Modal";
import { StyledText } from "styles/globalStyles";

interface PlaceSearchProps {
  title: string;
  place: string;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
}

const PlaceSearch = ({ title, place, setPlace }: PlaceSearchProps) => {
  return (
    <Container>
      <HeaderContainer>
        <StyledText style={{ fontSize: 15 }}>{title}</StyledText>
        {/* TODO: onPress에 코스에 등록된 장소 제거 기능 추가해야 됨 */}
        <Pressable onPress={() => {}}>
          <Icon name="minuscircleo" size={15} />
        </Pressable>
      </HeaderContainer>
      <GradientLine
        colors={["#518FFF", "#33E1C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Modal searchText={place} setSearchText={setPlace}>
        <SearchBox>
          <Image
            source={require("@assets/icon/search.png")}
            style={{ width: 20, height: 20 }}
          />
        </SearchBox>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;

  margin-top: 3px;
  margin-bottom: 8px;
`;

const SearchBox = styled.View`
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 90px;

  border: 1px solid #7fcfe9;
  border-radius: 10px;

  background-color: white;
`;

export default PlaceSearch;
