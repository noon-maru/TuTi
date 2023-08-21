import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

import styled from "styled-components/native";
import { BoldStyledText } from "styles/globalStyles";

import axios from "axios";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import Place from "./Place";

const isDevelopMode = DEVELOP_MODE === "true";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface tag {
  tagName: string;
  associatedCount: number;
  relatedTags: any; // 관련 태그의 오브젝트id
}

export interface PlaceData {
  region: string;
  name: string;
  address: string;
  image: string;
  numberHearts: number;
  tags: tag[];
}

const getPlaceData = async (region: string) => {
  try {
    let url = "";
    if (isDevelopMode)
      url = DEVELOP_SERVER_URL + API + "/place/region/" + region;
    else url = SERVER_URL + API + "/place/region/" + region;

    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("네트워킹 오류:", err);
    throw err;
  }
};

const PlaceList = ({ region }: { region: string }) => {
  const [placeDataArray, setPlaceDataArray] = useState<PlaceData[]>([]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const data = await getPlaceData(region);
        setPlaceDataArray(data);
      } catch (error) {
        console.error("이미지 데이터 가져오기 오류:", error);
      }
    };

    fetchImageData();
  }, [region]);

  return (
    <Container>
      <ListHeader>
        <ListHeadeText>추천순</ListHeadeText>
      </ListHeader>
      <List>
        {placeDataArray.map((value, index) => (
          <Place placeData={value} key={index} />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;

  width: ${SCREEN_WIDTH - 60}px;
`;

const ListHeader = styled.View`
  align-items: flex-end;

  height: 25px;
`;

const ListHeadeText = styled(BoldStyledText)`
  align-items: flex-end;

  height: 25px;

  text-decoration-line: underline;
  font-size: 11px;
  color: black;
`;

const List = styled.ScrollView``;

export default PlaceList;
