import { Dimensions } from "react-native";

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const places = [
  { placeName: "석촌호수", numberHearts: 10 },
  { placeName: "성수구름다리", numberHearts: 6 },
  { placeName: "서울숲", numberHearts: 3 },
  { placeName: "뚝섬한강공원", numberHearts: 15 },
];

const PlaceList = () => {
  return (
    <Container>
      <ListHeader></ListHeader>
      <List>
        {places.map((value, index) => (
          <ItemContainer key={index}>
            {/* <PlaceImage /> */}
            <PlaceName>{value.placeName}</PlaceName>
            <HeartContainer>
              <Heart source={require("assets/icon/heart(line).png")} />
              <PlaceNumberHearts>{value.numberHearts}</PlaceNumberHearts>
            </HeartContainer>
          </ItemContainer>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
`;

const ListHeader = styled.View`
  width: ${SCREEN_WIDTH - 30}px;
  height: 25px;

  background-color: blue;
`;

const List = styled.ScrollView``;

const ItemContainer = styled.View``;

const PlaceImage = styled.Image``;

const PlaceName = styled(StyledText)``;

const HeartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const Heart = styled.Image`
  width: 10px;
  height: 10px;
`;

const PlaceNumberHearts = styled(StyledText)``;

export default PlaceList;
