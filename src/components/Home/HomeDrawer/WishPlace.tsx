import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import axios from "axios";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import styled from "styled-components/native";

import { RootState } from "redux/reducers";

import WishHeader from "./WishHeader";
import WishItem from "./WishItem";
import { StyledText } from "@styles/globalStyles";

const isDevelopMode = DEVELOP_MODE === "true";

const getWishPlace = async (userId: string) => {
  try {
    if (userId === "guest") return [];

    let url = "";
    if (isDevelopMode)
      url = DEVELOP_SERVER_URL + API + `/users/${userId}/wishPlace/random`;
    else url = SERVER_URL + API + `/users/${userId}/wishPlace/random`;

    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const WishPlace = () => {
  const { id } = useSelector((state: RootState) => state.user);

  const [wishPlaces, setWishPlaces] = useState<WishPlace[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setWishPlaces(await getWishPlace(id));
        } catch (error) {
          console.error("네트워킹 오류:", error);
          throw error;
        }
      };

      fetchData();
    }, [id])
  );

  return (
    <>
      <WishHeader />
      {wishPlaces.length !== 0 ? (
        <WishPlacesContainer>
          {wishPlaces.map((value, index) => (
            <WishItem
              key={index}
              imageUrl={value.image}
              name={value.name}
              coordinate={{ x: value.longitude, y: value.latitude }}
            />
          ))}
        </WishPlacesContainer>
      ) : (
        <EmptyWishPlaceContainer>
          <Icon source={require("@assets/icon/heart(red-gra).png")} />
          <StyledText style={{ textAlign: "center" }}>
            {`찜 한 장소가 없습니다.
관심 있는 장소에 하트를 눌러보세요.`}
          </StyledText>
        </EmptyWishPlaceContainer>
      )}
    </>
  );
};

const WishPlacesContainer = styled.View`
  margin-top: 30px;
`;

const EmptyWishPlaceContainer = styled.View`
  gap: 7px;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 150px;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;

export default WishPlace;
