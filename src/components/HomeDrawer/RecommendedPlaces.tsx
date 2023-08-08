import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

import { styled } from "styled-components/native";

import { SERVER_URL, API } from "@env";

import RecommendedPlace from "./RecommendedPlace";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface PlaceData {
  address: string;
  image: string;
  name: string;
  region: string;
}

interface RecommendedPlaceData {
  place: PlaceData;
}

const getRecommendedPlace = async () => {
  try {
    const url = SERVER_URL + API + `/recommendedplaces`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const RecommendedPlaces = () => {
  const insets = useSafeAreaInsets();

  const [recommendedPlaces, setRecommendedPlaces] = useState<[]>([]);

  useEffect(() => {
    if (recommendedPlaces.length === 0)
      (async () => {
        setRecommendedPlaces(await getRecommendedPlace());
      })();
  }, []);

  return (
    <>
      <HeaderTextContainer>
        <StarIcon source={require("@assets/icon/star.png")} />
        <RecommendText> 추천 장소 보기</RecommendText>
      </HeaderTextContainer>
      <RecommendedPlaceScrollContainer
        insetsTop={insets.top}
        insetsBottom={insets.bottom}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {recommendedPlaces.map((value: RecommendedPlaceData, index) => (
          <RecommendedPlace
            key={index}
            imageUrl={value.place.image}
            name={value.place.name}
          />
        ))}
        <Padding />
      </RecommendedPlaceScrollContainer>
    </>
  );
};

const HeaderTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StarIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

const RecommendedPlaceScrollContainer = styled.ScrollView<{
  insetsTop: number;
  insetsBottom: number;
}>`
  height: ${(props) =>
    SCREEN_HEIGHT - (props.insetsBottom + 70) - (props.insetsTop + 53)}px;
`;

const RecommendedPlaceContainer = styled.View`
  margin-bottom: 50px;
  gap: 10px;
`;

const RecommendText = styled.Text`
  color: black;
  font-size: 15px;
`;

const RecommendedPlaceImage = styled.Image`
  width: ${SCREEN_WIDTH - 60}px;
  height: ${SCREEN_WIDTH - 60}px;
`;

const PlaceName = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
`;

const Padding = styled.View`
  height: 70px;
`;

export default RecommendedPlaces;
