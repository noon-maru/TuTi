import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dimensions, FlatList, View } from "react-native";

import styled from "styled-components/native";

import axios from "axios";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import { RootState } from "redux/reducers";

import Place from "./Place";
import TouchablePopover from "./TouchablePopover";

const isDevelopMode = DEVELOP_MODE === "true";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export type SortOrder = "recommend" | "recent" | "highHeart" | "lowHeart";

const ITEM_GAP = 15;

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

const dateFromObjectId = (objectId: string) => {
  const utcDate = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  return utcDate.getTime();
};

const PlaceList = () => {
  const { region } = useSelector((state: RootState) => state.drawer);

  const [placeDataArray, setPlaceDataArray] = useState<Place[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("추천순");

  const sortData = (order: SortOrder) => {
    switch (order) {
      case "recent":
        setPlaceDataArray(
          [...placeDataArray].sort(
            (a, b) => dateFromObjectId(a._id) - dateFromObjectId(b._id)
          )
        );
        setSortOrder("최근 등록 순");
        break;
      case "highHeart":
        setPlaceDataArray(
          [...placeDataArray].sort(
            (a, b) => b.wishPlaceCount - a.wishPlaceCount
          )
        );
        setSortOrder("하트 높은 순");
        break;
      case "lowHeart":
        setPlaceDataArray(
          [...placeDataArray].sort(
            (a, b) => a.wishPlaceCount - b.wishPlaceCount
          )
        );
        setSortOrder("하트 낮은 순");
        break;
      default:
        // 기본 추천 순이나 다른 기준으로 정렬
        setSortOrder("추천순");
        break;
    }
  };

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

  const renderItem = useCallback(
    ({ item }: { item: Place }) => <Place placeData={item} />,
    []
  );

  const renderSeparator = useCallback(
    () => <View style={{ height: ITEM_GAP }} />,
    []
  );

  return (
    <Container>
      <ListHeader>
        <TouchablePopover sortData={sortData} sortOrder={sortOrder} />
      </ListHeader>
      <FlatList
        data={placeDataArray}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;

  width: ${SCREEN_WIDTH - 60}px;
`;

const ListHeader = styled.View`
  align-items: flex-end;

  height: 35px;
`;

export default PlaceList;
