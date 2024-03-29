import { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "styles/globalStyles";

import { SERVER_URL } from "@env";

import { postMessage } from "redux/slice/messageSlice";
import { animateDrawer } from "redux/slice/drawerSlice";

import GradientText from "components/GradientText";
import Spinner from "components/Spinner";

const Place = ({ placeData }: { placeData: Place }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleSendMessage = () => {
    const jsonData = {
      type: "placeSelect",
      data: { zoomLevel: 5, address: placeData.address },
    };
    dispatch(postMessage(JSON.stringify(jsonData)));
    dispatch(animateDrawer({ direction: "DOWN" }));
  };

  const url = SERVER_URL + placeData.image;

  useEffect(() => {
    // 이미지 로딩 시작
    const image = Image.prefetch(url);
    image
      .then(() => {
        // 이미지 로딩이 완료되면 loading을 false로 설정
        setLoading(false);
      })
      .catch(() => {
        // 이미지 로딩에 실패했을 때도 loading을 false로 설정
        setLoading(false);
      });
  }, [url]);

  return (
    <Container onPress={handleSendMessage}>
      <InformContainer>
        {loading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <PlaceImage
            source={{ uri: url, cache: FastImage.cacheControl.immutable }}
          />
        )}
        <TextContainer>
          <PlaceName>{placeData.name}</PlaceName>
          <TagContainer>
            {placeData.tags.map((tag, index) => (
              <Tag key={index}>#{tag.tagName} </Tag>
            ))}
          </TagContainer>
        </TextContainer>
      </InformContainer>
      <HeartContainer>
        <Heart source={require("assets/icon/heart(line).png")} />
        <WishPlaceCount
          colors={["#8EFF5A", "#605CFF"]} // 그라데이션 색상 배열
          start={{ x: 0, y: 0 }} // 그라데이션 시작점 (왼쪽 상단) (범위: 0~1)
          end={{ x: 1, y: 1 }} // 그라데이션 끝점 (오른쪽 상단) (범위: 0~1)
        >
          {placeData.wishPlaceCount}
        </WishPlaceCount>
      </HeartContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  padding: 8px;

  border: 1px solid #7fcfe9;
  border-radius: 10px;

  background-color: white;
`;

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const PlaceImage = styled(FastImage)`
  width: 60px;
  height: 60px;

  border-radius: 6px;
`;

const InformContainer = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const TextContainer = styled.View`
  gap: 3px;

  margin-top: 5px;
`;

const PlaceName = styled(BoldStyledText)`
  font-size: 17px;
  color: black;
`;

const TagContainer = styled.View`
  flex-direction: row;
`;

const Tag = styled(StyledText)`
  font-size: 13px;
  color: #6b6b6b;
`;

const HeartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;

  margin: 5px;
`;

const Heart = styled.Image`
  width: 10px;
  height: 10px;
`;

const WishPlaceCount = styled(GradientText)`
  font-size: 13px;
`;

export default memo(Place);
