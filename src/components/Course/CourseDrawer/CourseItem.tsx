import { Pressable } from "react-native";
import FastImage from "react-native-fast-image";

import { useDispatch } from "react-redux";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { SERVER_URL } from "@env";

import { animateDrawer } from "@redux/slice/courseDrawerSlice";

import { Course } from "@redux/slice/courseSlice";

interface CourseItemProps {
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  thumbnail: string;
  courseName: string;
  places: Place[];
  travelTime: number[];
  totalFee: number;
}

const CourseItem = ({
  setCourse,
  thumbnail,
  courseName,
  places,
  travelTime,
  totalFee,
}: CourseItemProps) => {
  const dispatch = useDispatch();

  const handleDrawer = () => {
    setCourse({ courseName, travelTime, places, totalFee, isProgress: false });
    dispatch(animateDrawer({ direction: "DOWN" }));
  };

  return (
    <Pressable onPress={handleDrawer}>
      <Container>
        <FastImage
          source={{
            uri: SERVER_URL + thumbnail,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{ width: 60, height: 60, borderRadius: 6 }}
        />
        <ContentsContainer>
          <BoldStyledText>{courseName}</BoldStyledText>
          <StyledText style={{ fontSize: 14, color: "#777777" }}>
            {places.map((place, index) => {
              return index === places.length - 1
                ? place.name
                : place.name + " -> ";
            })}
          </StyledText>
          <StyledText
            style={{ fontSize: 14, color: "#777777" }}
          >{`총 비용: ${totalFee.toLocaleString("ko-KR")}`}</StyledText>
        </ContentsContainer>
      </Container>
    </Pressable>
  );
};

const Container = styled.View`
  flex-direction: row;
  gap: 15px;

  width: 100%;
  height: 84px;

  border: 1px solid #7fcfe9;
  border-radius: 10px;

  padding: 10px 10px;

  background-color: white;
`;

const ContentsContainer = styled.View``;

export default CourseItem;
