import { useEffect, useState } from "react";
import { Image } from "react-native";

import styled from "styled-components/native";
import { StyledText, BoldStyledText } from "styles/globalStyles";

import { SERVER_URL } from "@env";

import Spinner from "components/Spinner";

interface WishItemProps {
  imageUrl: string;
  name: string;
}

const WishItem = ({ imageUrl, name }: WishItemProps) => {
  // TODO: 이 부분 고정값이 아닌 계산 된 값으로 수정해야 됨.
  const requiredTimeDestination = 10;
  const unit = "minutes";

  const [loading, setLoading] = useState(true);

  const url = SERVER_URL + imageUrl;

  useEffect(() => {
    // 이미지 로딩 시작
    const image = Image.prefetch(url);
    image
      .then(() => {
        // 이미지 로딩이 완료되면 loading을 false로 설정
        setLoading(false);
      })
      .catch(() => {
        // 이미지 로딩에 실패하면 loading을 false로 설정
        setLoading(false);
      });
  }, [url]);

  return (
    <Container>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <PreviewImage
          source={{
            uri: url,
          }}
        />
      )}
      <PlaceInfo>
        <PlaceName>{name}</PlaceName>
        <RequiredTimeDestination>
          {requiredTimeDestination} {unit} drive
        </RequiredTimeDestination>
      </PlaceInfo>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  gap: 15px;

  margin-bottom: 15px;
`;

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const PreviewImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const PlaceInfo = styled.View`
  margin-top: 5px;
  gap: 2px;
`;

const PlaceName = styled(BoldStyledText)`
  color: black;
  font-size: 15px;
  font-weight: 700;
`;

const RequiredTimeDestination = styled(StyledText)`
  color: #777777;
  font-size: 14px;
`;

export default WishItem;
