import { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";

import { API, SERVER_URL } from "@env";

import { RootState } from "@redux/reducers";
import { updateCourse } from "@redux/slice/courseSlice";

interface TitleImageProps {
  courseName: string;
}

const TitleImage = ({ courseName }: TitleImageProps) => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state: RootState) => state.courses);
  const { id: userId } = useSelector((state: RootState) => state.user);

  const [isScrollOpen, setIsScrollOpen] = useState<boolean>(false);
  const [titleImageIndex, setTitleImageIndex] = useState<number>(0);

  const foundCourse = courses.find(
    (course) => course.courseName === courseName
  );

  const handleImageSelect = async (index: number) => {
    const updatedCourse = {
      ...foundCourse,
      mainRecordImageIndex: index,
    } as Course;

    await axios.put(
      SERVER_URL + API + `/course/${userId}/${foundCourse?._id}`,
      JSON.stringify(updatedCourse),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const courseIndex = courses.findIndex(
      (course) => course.courseName === courseName
    );
    dispatch(updateCourse({ courseIndex, updatedCourse }));

    setTitleImageIndex(index);
    setIsScrollOpen((prev) => !prev);
  };

  useEffect(() => {
    if (foundCourse) {
      setTitleImageIndex(foundCourse.mainRecordImageIndex);
    }
  }, [foundCourse]);

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
