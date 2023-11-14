import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import FastImage from "react-native-fast-image";

import { SERVER_URL, API } from "@env";
import axios from "axios";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/globalStyles";
import { useDispatch } from "react-redux";
import { postMessage } from "@redux/slice/messageSlice";

interface SearchResultsProps {
  searchText: string;
}

const getPlaces = async () => {
  try {
    const url = SERVER_URL + API + "/place";

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const SearchResults = ({ searchText }: SearchResultsProps) => {
  const dispatch = useDispatch();

  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  const handleSendMessage = (address: string) => {
    const jsonData = {
      type: "placeSelect",
      data: { zoomLevel: 5, address: address },
    };
    dispatch(postMessage(JSON.stringify(jsonData)));
  };

  const renderSeparator = useCallback(
    () => <View style={{ height: 10 }} />,
    []
  );

  useEffect(() => {
    const filtered =
      searchText === "*"
        ? places
        : places.filter((place) =>
            place.name.toLowerCase().includes(searchText.toLowerCase())
          );
    setFilteredPlaces(filtered);
  }, [places, searchText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPlaces(await getPlaces());
      } catch (error) {
        console.error("네트워킹 오류:", error);
        throw error;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPlaces(places);
  }, [places]);

  return (
    <Container>
      <FlatList
        data={filteredPlaces}
        renderItem={(items) => (
          <Pressable onPress={() => handleSendMessage(items.item.address)}>
            <ItemContainer>
              <FastImage
                source={{ uri: SERVER_URL + items.item.image }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <View style={{ flex: 1, gap: 3 }}>
                <BoldStyledText>{items.item.name}</BoldStyledText>
                <View style={{ flexDirection: "row", gap: 3 }}>
                  {items.item.tags.map((tag, index) => (
                    <StyledText
                      style={{ fontSize: 13, color: "#6B6B6B" }}
                      key={index}
                    >
                      {`#${tag.tagName}`}
                    </StyledText>
                  ))}
                </View>
              </View>
              <View
                style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
              >
                <FastImage
                  source={require("@assets/icon/heart(line).png")}
                  style={{ width: 10, height: 10 }}
                />
                <StyledText style={{ fontSize: 12, color: "#7FCFE9" }}>
                  {items.item.numberHearts}
                </StyledText>
              </View>
            </ItemContainer>
          </Pressable>
        )}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled.View`
  margin: 10px 20px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: #7fcfe9;
  border-radius: 10px;
  background-color: white;
`;

export default SearchResults;
