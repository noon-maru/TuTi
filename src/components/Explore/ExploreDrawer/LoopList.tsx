import { useRef } from "react";
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import LoopListItem from "./LoopListItem";

import styled from "styled-components/native";

interface LoopListProps {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const regions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "강원",
  "제주",
];

const ITEM_WIDTH = 45;
const ITEM_GAP = 7;

const LoopList = ({ region, setRegion }: LoopListProps) => {
  const flatListRef = useRef<FlatList<string>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    if (offsetX <= 0) {
      flatListRef.current?.scrollToOffset({
        offset: contentWidth / 3,
        animated: false,
      });
    } else if (offsetX + layoutWidth >= contentWidth) {
      flatListRef.current?.scrollToOffset({
        offset: contentWidth / 3 - layoutWidth,
        animated: false,
      });
    }
  };

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={[...regions, ...regions, ...regions]}
        renderItem={({ item }) => (
          <LoopListItem
            item={item}
            onPress={setRegion}
            isSelected={item === region}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        // 7px의 너비를 가진 구분자 컴포넌트
        ItemSeparatorComponent={() => <View style={{ width: ITEM_GAP }} />}
        onScroll={handleScroll}
        initialScrollIndex={regions.length} // 버퍼의 크기만큼 초기 스크롤
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + ITEM_GAP, // 아이템의 너비 + 아이템간의 거리
          offset: (ITEM_WIDTH + ITEM_GAP) * index - ITEM_WIDTH, // 제주 탭이 살짝 보이게끔 한 ITEM_WIDTH만큼 빼줌
          index,
        })}
        keyExtractor={(item, index) => index.toString()}
        scrollEventThrottle={16}
      />
    </Container>
  );
};

const Container = styled.View`
  height: 35px; /* 그림자 공간을 생각해 5px의 여유 공간을 줌 */
`;

export default LoopList;
