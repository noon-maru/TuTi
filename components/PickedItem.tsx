import { styled } from "styled-components/native";

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

const PickeItem = ({ title, time }) => {
  const pickeitem = [
    { key: 1, title: "석촌 호수", time: 15, img: "이미지1" },
    { key: 2, title: "성수구름다리", time: 17, img: "이미지2" },
    { key: 3, title: "안성팜랜드", time: 38, img: "이미지3" },
    { key: 4, title: "뚝섬한강공원", time: 60, img: "이미지4" },
    { key: 5, title: "노들섬", time: 80, img: "이미지5" },
    { key: 6, title: "별마당 도서관", time: 35, img: "이미지6" },
    { key: 7, title: "더현대서울", time: 50, img: "이미지7" },
    { key: 8, title: "송도센트럴파크", time: 20, img: "이미지8" },
    { key: 9, title: "동탄 호수공원", time: 40, img: "이미지9" },
  ]; //길이가 긴 Array라고 가정

  return (
    <View style={{ borderBottomWidth: 1, padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 14 }}>{time}</Text>
    </View>
  );
};

export default PickeItem;
