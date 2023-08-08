import { useState, useEffect } from "react";
import { Dimensions, Image } from "react-native";

import { styled } from "styled-components/native";

import { SERVER_URL } from "@env";

import Spinner from "components/Spinner";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface RecommendedPlaceProps {
  imageUrl: string;
  name: string;
}

const RecommendedPlace = ({ imageUrl, name }: RecommendedPlaceProps) => {
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
    <RecommendedPlaceContainer>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <RecommendedPlaceImage source={{ uri: url }} />
      )}
      <PlaceName>{name}</PlaceName>
    </RecommendedPlaceContainer>
  );
};

const RecommendedPlaceContainer = styled.View`
  margin-bottom: 50px;
  gap: 10px;
`;

const RecommendedPlaceImage = styled.Image`
  width: ${SCREEN_WIDTH - 60}px;
  height: ${SCREEN_WIDTH - 60}px;
  border-radius: 30px;
`;

const PlaceName = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
`;

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

export default RecommendedPlace;
