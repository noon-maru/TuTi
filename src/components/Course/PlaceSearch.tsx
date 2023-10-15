import { useState } from "react";
import { Image, Pressable } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL } from "@env";

import { Course } from "@redux/slice/courseSlice";

import Modal from "./Modal";
import FastImage from "react-native-fast-image";

interface PlaceSearchProps {
  index: number;
  title: string;
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}

const PlaceSearch = ({ index, title, course, setCourse }: PlaceSearchProps) => {
  const [place, setPlace] = useState<string>("");

  const handlePlaceOust = () => {
    if (course.places[index].name) {
      setCourse((prev) => ({
        ...prev,
        places: prev.places.map((value, i) => {
          if (i === index) {
            // 해당 장소의 name을 빈 문자열("")로 변경
            return { ...value, name: "" };
          } else {
            // 다른 장소는 그대로 유지
            return value;
          }
        }),
      }));
    } else {
      setCourse((prev) => ({
        ...prev,
        places: prev.places.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <StyledText style={{ fontSize: 15 }}>{title}</StyledText>
        {course?.places[index].name ||
        (index > 0 && index < course?.places.length - 1) ? (
          <Pressable onPress={handlePlaceOust}>
            <Icon name="minuscircleo" size={15} color="black" />
          </Pressable>
        ) : null}
      </HeaderContainer>
      <GradientLine
        colors={["#518FFF", "#33E1C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Modal searchText={place} setSearchText={setPlace}>
        <SearchBox>
          {course?.places[index]?.name ? (
            <ContentsContainer>
              <InformContainer>
                <FastImage
                  source={{
                    uri: SERVER_URL + course.places[index].image,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  style={{ width: 70, height: 70, borderRadius: 6 }}
                />
                <BoldStyledText>{course.places[index].name}</BoldStyledText>
              </InformContainer>
            </ContentsContainer>
          ) : (
            <Image
              source={require("@assets/icon/search.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
        </SearchBox>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

const GradientLine = styled(LinearGradient)`
  width: 100%;
  height: 2px;

  margin-top: 3px;
  margin-bottom: 8px;
`;

const SearchBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 90px;

  border: 1px solid #7fcfe9;
  border-radius: 10px;

  background-color: white;
`;

const ContentsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  padding: 0 10px;
`;

const InformContainer = styled.View`
  flex-direction: row;
  gap: 13px;
`;

export default PlaceSearch;
