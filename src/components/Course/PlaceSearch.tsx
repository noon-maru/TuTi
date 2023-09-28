import Icon from "react-native-vector-icons/FontAwesome";

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
      <StyledText style={{ fontSize: 15, width: "100%" }}>{title}</StyledText>
      <GradientLine
        colors={["#518FFF", "#33E1C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Modal searchText={place} setSearchText={setPlace}>
        <SearchBox>
          <Icon name="search" size={20} color="gray" />
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
