import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

import styled from "styled-components/native";

import { RootState } from "redux/reducers";

import LoopListItem from "./LoopListItem";

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
const ITEM_GAP = 5;

const LoopList = () => {
  const { region } = useSelector((state: RootState) => state.drawer);

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

  const renderLoopListItem = useCallback(
    ({ item }: { item: string }) => (
      <LoopListItem item={item} isSelected={item === region} />
    ),
    [region]
  );

  const renderSeparator = useCallback(
    () => <View style={{ width: ITEM_GAP }} />,
    []
  );

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={[...regions, ...regions, ...regions]}
        renderItem={renderLoopListItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        // 7px의 너비를 가진 구분자 컴포넌트
        ItemSeparatorComponent={renderSeparator}
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
      <View
        style={{
          position: "absolute",
        }}
      >
        <Shadow distance={40} offset={[0, 0]} startColor="#fff">
          <View
            style={{
              borderTopRightRadius: 13,
              borderBottomRightRadius: 13,
              width: 5,
              height: 30,
            }}
          />
        </Shadow>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        <Shadow distance={40} offset={[0, 0]} startColor="#fff">
          <View
            style={{
              borderTopLeftRadius: 13,
              borderBottomLeftRadius: 13,
              width: 5,
              height: 30,
            }}
          />
        </Shadow>
      </View>
    </Container>
  );
};

const Container = styled.View`
  height: 40px;
`;

export default LoopList;
