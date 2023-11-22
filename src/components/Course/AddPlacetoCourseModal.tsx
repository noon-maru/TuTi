import { useCallback, useEffect, useState } from "react";
import { Modal, FlatList, Pressable, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/FontAwesome";
import FastImage from "react-native-fast-image";

import axios from "axios";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL, DEVELOP_SERVER_URL, DEVELOP_MODE, API } from "@env";

import STT from "@components/STT";

interface ModalProps {
  index: number;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

const isDevelopMode = DEVELOP_MODE === "true";

const getPlaces = async () => {
  try {
    let url = "";
    if (isDevelopMode) url = DEVELOP_SERVER_URL + API + "/place";
    else url = SERVER_URL + API + "/place";

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const AddPlacetoCourseModal = ({
  index,
  setCourse,
  searchText,
  setSearchText,
  children,
}: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  const renderSeparator = useCallback(
    () => <View style={{ height: 10 }} />,
    []
  );

  useEffect(() => {
    const filtered = places.filter((place) =>
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
    <>
      <Pressable onPress={() => setVisible(true)} style={{ width: "100%" }}>
        {children}
      </Pressable>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
      >
        <Container onPress={() => setVisible(false)}>
          <ModalWindowContainer>
            <SearchBoxContainer>
              <Shadow distance={4} offset={[0, 4]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",

                    width: 280,
                    height: 36,

                    paddingLeft: 10,
                    paddingRight: 10,

                    borderRadius: 10,

                    backgroundColor: "#efefef",
                  }}
                >
                  <SearchIcon name="search" size={17} color="gray" />
                  <SearchInput
                    placeholder="Search"
                    placeholderTextColor={"#3C3C43"}
                    onChangeText={setSearchText}
                    value={searchText}
                  />
                  <STT setSearchText={setSearchText} />
                </View>
              </Shadow>
            </SearchBoxContainer>
            <View style={{ width: "100%", height: 300 }}>
              <FlatList
                data={filteredPlaces}
                renderItem={(items) => (
                  <Pressable
                    onPress={() => {
                      setCourse((prev) => ({
                        ...prev,
                        places: prev.places.map((place, i) =>
                          i === index ? items.item : place
                        ),
                      }));
                      setVisible(false);
                    }}
                  >
                    <ItemContainer>
                      <FastImage
                        source={{ uri: SERVER_URL + items.item.image }}
                        style={{ width: 60, height: 60, borderRadius: 10 }}
                      />
                      <View style={{ flex: 1, gap: 3 }}>
                        <BoldStyledText>{items.item.name}</BoldStyledText>
                        <View style={{ flexDirection: "row", gap: 3 }}>
                          {items.item.tags.map((tag, i) => (
                            <StyledText
                              style={{ fontSize: 13, color: "#6B6B6B" }}
                              key={i}
                            >
                              {`#${tag.tagName}`}
                            </StyledText>
                          ))}
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 3,
                          alignItems: "center",
                        }}
                      >
                        <FastImage
                          source={require("@assets/icon/heart(line).png")}
                          style={{ width: 10, height: 10 }}
                        />
                        <StyledText style={{ fontSize: 12, color: "#7FCFE9" }}>
                          {items.item.wishPlaceCount}
                        </StyledText>
                      </View>
                    </ItemContainer>
                  </Pressable>
                )}
                ItemSeparatorComponent={renderSeparator}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ModalWindowContainer>
        </Container>
      </Modal>
    </>
  );
};

const Container = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWindowContainer = styled.Pressable`
  justify-content: center;
  align-items: center;

  width: 85%;

  border-radius: 30px;
  border-width: 0.5px;
  border-color: #efeff0;

  padding: 30px;

  gap: 20px;

  background-color: white;
`;

const SearchBoxContainer = styled.View``;

const SearchIcon = styled(Icon)`
  padding-right: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 0;
  margin: 0;
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 17px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  border-width: 1px;
  border-color: #7fcfe9;
  border-radius: 10px;

  background-color: white;

  padding: 10px;
`;

export default AddPlacetoCourseModal;
