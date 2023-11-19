import FastImage from "react-native-fast-image";

import { useSelector } from "react-redux";

import styled from "styled-components/native";

import { SERVER_URL } from "@env";

import { RootState } from "@redux/reducers";
import { Pressable, ScrollView } from "react-native";
import { useState } from "react";

interface TitleImageProps {
  courseName: string;
}

const TitleImage = ({ courseName }: TitleImageProps) => {
  const { courses } = useSelector((state: RootState) => state.courses);

  const [isScrollOpen, setIsScrollOpen] = useState<boolean>(false);
  const [titleImageIndex, setTitleImageIndex] = useState<number>(0);

  const foundCourse = courses.find(
    (course) => course.courseName === courseName
  );

  const handleImageSelect = async (index: number) => {
    setTitleImageIndex(index);
    // TODO: 서버에 선택한 이미지 추가하는 로직 추가
    setIsScrollOpen((prev) => !prev);
  };

  return (
    <Container>
      {isScrollOpen ? (
        <ScrollViewContainer>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {foundCourse?.recordImages.map((imageUri, index) => (
              <Pressable
                key={index}
                onPress={async () => await handleImageSelect(index)}
              >
                <FastImage
                  source={{
                    uri: SERVER_URL + imageUri,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  style={{ width: 100, height: 100 }}
                  resizeMode={"contain"}
                />
              </Pressable>
            ))}
          </ScrollView>
        </ScrollViewContainer>
      ) : (
        <Pressable
          onPress={() =>
            setIsScrollOpen((prev) =>
              foundCourse?.recordImages.length === 0 ? prev : !prev
            )
          }
        >
          <FastImage
            source={{
              uri: SERVER_URL + foundCourse?.recordImages[titleImageIndex],
              cache: FastImage.cacheControl.immutable,
            }}
            style={{ width: 100, height: 100 }}
            resizeMode={"contain"}
          />
        </Pressable>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ScrollViewContainer = styled.View`
  width: 250px;
  border-radius: 10px;

  padding: 10px;

  background-color: lightgray;
`;

export default TitleImage;
