import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import styled from "styled-components/native";

import { RootState } from "redux/reducers";

import WishHeader from "./WishHeader";
import WishItem from "./WishItem";

interface WishPlaceData {
  address: string;
  image: string;
  name: string;
  region: string;
}

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

  const [wishPlaces, setWishPlaces] = useState<[]>([]);

  let flag: boolean = false;

  useEffect(() => {
    if (wishPlaces.length === 0 && flag === false)
      (async () => {
        setWishPlaces(await getWishPlace(id));
        flag = true;
      })();
  }, []);

  return (
    <>
      <WishHeader />
      <WishPlacesContainer>
        {wishPlaces.map((value: WishPlaceData, index) => (
          <WishItem key={index} imageUrl={value.image} name={value.name} />
        ))}
      </WishPlacesContainer>
    </>
  );
};

const WishPlacesContainer = styled.View`
  margin-top: 30px;
`;

export default WishPlace;