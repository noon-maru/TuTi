import { Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";
import { setMarkerInfo, toggleWishClick } from "@redux/slice/markerSlice";

interface WishTabContentProps {
  wishPlace: Place;
  setWishPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
}

const WishTabContent = ({ wishPlace, setWishPlaces }: WishTabContentProps) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state: RootState) => state.user);

  const handleWish = () => {
    dispatch(setMarkerInfo({ placeId: wishPlace._id, isWishClicked: true }));
    dispatch(toggleWishClick(userId));
    setWishPlaces((prev) =>
      prev.filter((place) => place._id !== wishPlace._id)
    );
  };

  return (
    <Container>
      <Header>
        <BoldStyledText style={{ fontSize: 15 }}>
          {wishPlace.name}
        </BoldStyledText>
        <Pressable onPress={() => handleWish()}>
          <Image
            source={require("@assets/icon/trash(black).png")}
            style={{ width: 15, height: 15 }}
          />
        </Pressable>
      </Header>
      <StyledText style={{ fontSize: 10 }}>{wishPlace.address}</StyledText>
    </Container>
  );
};

const Container = styled.View`
  height: 150px;

  padding: 15px;

  border: 1px solid #7fcfe9;
  border-radius: 10px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

export default WishTabContent;
