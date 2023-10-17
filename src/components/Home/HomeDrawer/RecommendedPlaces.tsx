import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

import styled from "styled-components/native";
import { StyledText } from "styles/globalStyles";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import RecommendedPlace from "./RecommendedPlace";

interface PlaceData {
  address: string;
  image: string;
  name: string;
  region: string;
}

interface RecommendedPlaceData {
  place: PlaceData;
}

const isDevelopMode = DEVELOP_MODE === "true";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const getRecommendedPlace = async () => {
  try {
    let url = "";
    if (isDevelopMode) url = DEVELOP_SERVER_URL + API + "/recommendedplaces";
    else url = SERVER_URL + API + "/recommendedplaces";

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const RecommendedPlaces = () => {
  const insets = useSafeAreaInsets();

  const [recommendedPlaces, setRecommendedPlaces] = useState<
    RecommendedPlaceData[]
  >([]);

  useEffect(() => {
    if (recommendedPlaces.length === 0)
      (async () => {
        setRecommendedPlaces(await getRecommendedPlace());
      })();
  }, [recommendedPlaces.length]);

  return (
    <>
      <HeaderTextContainer>
        <StarIcon source={require("@assets/icon/star.png")} />
        <StyledText>{"추천 장소 보기"}</StyledText>
      </HeaderTextContainer>
      <RecommendedPlaceScrollContainer
        insetsTop={insets.top}
        insetsBottom={insets.bottom}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {recommendedPlaces.map((value, index) => (
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
  gap: 3px;
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

const Padding = styled.View`
  height: 70px;
`;

export default RecommendedPlaces;
