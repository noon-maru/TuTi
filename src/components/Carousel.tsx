import { useState, useEffect, useRef } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { SERVER_URL, API } from "@env";

import styled from "styled-components/native";

import axios from "axios";

import { setTheme } from "redux/slice/themeSlice";
import { StyledText } from "styles/globalStyles";

interface ImageData {
  imageName: string;
  grayscaleValue: number;
  imageUrl: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const getCarouselData = async () => {
  try {
    const url = SERVER_URL + API + "/carousel";
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("네트워킹 오류:", error);
    throw error;
  }
};

const Carousel = () => {
  const [imageDataArray, setImageDataArray] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const scrollRef = useRef<ScrollView | null>(null);
  const intervalId = useRef<number | null>(null);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const data = await getCarouselData();
        setImageDataArray(data);
      } catch (error) {
        console.error("이미지 데이터 가져오기 오류:", error);
      }
    };

    fetchImageData();
  }, []);

  useEffect(() => {
    const startAutoScroll = () => {
      intervalId.current = setInterval(() => {
        setCurrentPage((prevPage) => {
          const nextPage =
            prevPage + 1 >= imageDataArray.length ? 0 : prevPage + 1;

          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              x: nextPage * SCREEN_WIDTH,
              animated: true,
            });
          }

          return nextPage;
        });
      }, 20000);
    };

    const stopAutoScroll = () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };

    if (isFocused) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [imageDataArray.length, isFocused]);

  useEffect(() => {
    if (
      imageDataArray[currentPage] &&
      imageDataArray[currentPage].grayscaleValue
    ) {
      const dark = imageDataArray[currentPage].grayscaleValue >= 128;

      dispatch(setTheme({ dark }));
    }
  }, [currentPage, imageDataArray]);

  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(contentOffsetX / SCREEN_WIDTH);

    setCurrentPage(newPage);
  };

  return (
    <Container>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {imageDataArray.map((imageData) => (
          <View key={imageData.imageName}>
            <Image
              source={{ uri: SERVER_URL + imageData.imageUrl }}
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT / 2,
              }}
            />
            <PlaceName>{imageData.imageName}</PlaceName>
          </View>
        ))}
      </ScrollView>
      <IndicatorWrapper>
        {Array.from({ length: imageDataArray.length }, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === currentPage} />
        ))}
      </IndicatorWrapper>
    </Container>
  );
};

const Container = styled.View`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT / 2}px;
  align-items: center;
`;

const PlaceName = styled(StyledText)`
  top: -155px;
  left: 30px;
  font-size: 32px;
  color: white;
`;

const Indicator = styled.View<{ focused: boolean }>`
  margin: 0px 4px;
  background-color: ${(props) => (props.focused ? "#262626" : "white")};
  width: 7px;
  height: 7px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  top: -80px;
`;

export default Carousel;
