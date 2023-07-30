import { styled } from "styled-components/native";
import PickeItem from "./PickedItem";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import { useState } from "react";

const MainPage = () => {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrolledTo85, setIsScrolledTo85] = useState(false);

  const [pickedItems, setPickedItems] = useState([
    { key: 1, title: "석촌 호수", time: 15, img: "이미지1" },
    { key: 2, title: "성수구름다리", time: 17, img: "이미지2" },
    { key: 3, title: "안성팜랜드", time: 38, img: "이미지3" },
    { key: 4, title: "뚝섬한강공원", time: 60, img: "이미지4" },
    { key: 5, title: "노들섬", time: 80, img: "이미지5" },
    { key: 6, title: "별마당 도서관", time: 35, img: "이미지6" },
    { key: 7, title: "더현대서울", time: 50, img: "이미지7" },
    { key: 8, title: "송도센트럴파크", time: 20, img: "이미지8" },
    { key: 9, title: "석촌 호수", time: 15, img: "이미지1" },
    { key: 10, title: "성수구름다리", time: 17, img: "이미지2" },
    { key: 11, title: "안성팜랜드", time: 38, img: "이미지3" },
    { key: 12, title: "뚝섬한강공원", time: 60, img: "이미지4" },
  ]); //길이가 긴 Array라고 가정
  const onScroll = (event) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const scrollPercentage =
      (contentOffset.y + layoutMeasurement.height) / contentSize.height;

    if (scrollPercentage >= 0.85 && !isScrolledToEnd) {
      setIsScrolledToEnd(true);
    }
    if (scrollPercentage >= 0.85 && !isScrolledTo85) {
      setIsScrolledTo85(true);
    }
  };

  const renderPickedItem = ({ item }) => {
    return (
      <PickedItemContainer isScrolledTo85={isScrolledTo85}>
        <PickeItem title={item.title} time={item.time} />
      </PickedItemContainer>
    );
  };
  const renderInitialPickedItems = () => {
    return (
      <PickedBox>
        {pickedItems.slice(0, 4).map((item) => (
          <PickedItemContainer key={item.key}>
            <PickeItem title={item.title} time={item.time} />
          </PickedItemContainer>
        ))}
      </PickedBox>
    );
  };

  return (
    <Container>
      <ImageContainer>
        <Text>추천 사진</Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>뚝섬 한강 공원</Text>
      </ImageContainer>
      <PickedBoxContainer isScrolledToEnd={isScrolledToEnd}>
        <PickedBar>
          <BarText>찜 한 장소 보기</BarText>
          <BarText>더 보기</BarText>
        </PickedBar>

        <PickedBox isScrolledTo85={isScrolledTo85}>
          <FlatList
            data={pickedItems}
            renderItem={renderPickedItem}
            keyExtractor={(item) => item.key.toString()}
            onScroll={onScroll}
          />
        </PickedBox>
      </PickedBoxContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const PickedBar = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border: 1px solid black;
`;

const BarText = styled.Text`
  flex: 1;
  margin-right: 30px;
  margin-left: 20px;
  //font-size: 20;
`;
const PickedBoxContainer = styled.View`
  //flex: 1.2;
  //height: 80px;
  //height: ${({ isScrolledTo85 }) => (isScrolledTo85 ? "100%" : "auto")};
  ${({ isScrolledToEnd }) =>
    isScrolledToEnd
      ? `
      flex: 3;
      height: 100%;
    `
      : `
      flex: 1.1;
      height: auto;
    `}
`;
const PickedItemContainer = styled.View`
  /* 늘어난 상자 크기를 100px로 설정 */
  //flex: 1.2;
  height: 100px;
  /* 추가적인 스타일링 속성들 */
`;
const PickedBox = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  /* 추가적인 스타일링 속성들 */
`;
const ImageContainer = styled.View`
  flex: 1;
  background-color: skyblue;
  justify-content: space-between;
`;

export default MainPage;

//그냥, 사용자가 전체 박스를 스크롤 해야지, height가 늘어나도록 수정해야겠다.
