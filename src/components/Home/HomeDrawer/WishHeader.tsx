import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

interface MyNavigation {
  navigate: (screen: string, params: { fromHome: boolean }) => void;
}

const WishHeader = () => {
  const navigation = useNavigation<MyNavigation>();

  return (
    <Container>
      <WishPlacesTextContainer>
        <WishIcon source={require("@assets/icon/heart(color).png")} />
        <WishPlacesText>{"찜 한 장소 보기"}</WishPlacesText>
      </WishPlacesTextContainer>
      <TouchableOpacity
        onPress={() => navigation.navigate("Box", { fromHome: true })}
      >
        <MoreDetails>{"더보기"}</MoreDetails>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WishPlacesTextContainer = styled.View`
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const WishIcon = styled.Image`
  width: 13px;
  height: 13px;
`;

const WishPlacesText = styled(StyledText)`
  color: black;
  font-size: 15px;
`;

const MoreDetails = styled(StyledText)`
  font-size: 15px;
  color: #6c6c6c;
  text-decoration-line: underline;
`;

export default WishHeader;
