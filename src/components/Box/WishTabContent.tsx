import { BoldStyledText, StyledText } from "@styles/globalStyles";
import { Image } from "react-native";
import styled from "styled-components/native";

interface WishTabContentProps {
  title: string;
  address: string;
}

const WishTabContent = ({ title, address }: WishTabContentProps) => {
  return (
    <Container>
      <Header>
        <BoldStyledText style={{ fontSize: 15 }}>{title}</BoldStyledText>
        <Image
          source={require("@assets/icon/trash(black).png")}
          style={{ width: 15, height: 15 }}
        />
      </Header>
      <StyledText style={{ fontSize: 10 }}>{address}</StyledText>
    </Container>
  );
};

const Container = styled.View`
  width: 330px;
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
