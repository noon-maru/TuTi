import { useEffect, useState } from "react";
import { Image, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

import styled from "styled-components/native";
import { StyledText, BoldStyledText } from "styles/globalStyles";

import { SERVER_URL } from "@env";

import Spinner from "components/Spinner";
import getTravelTime from "@utils/getTravelTime";

interface WishItemProps {
  imageUrl: string;
  name: string;
  coordinate: Coordinate;
}

const requestPermission = async () => {
  try {
    if (Platform.OS === "ios") {
      return await Geolocation.requestAuthorization("always");
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === "android") {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  } catch (e) {
    console.log(e);
  }
};

const WishItem = ({ imageUrl, name, coordinate }: WishItemProps) => {
  const [requiredTimeDestination, setRequiredTimeDestination] =
    useState<string>("");
  const [loading, setLoading] = useState(true);

  const url = SERVER_URL + imageUrl;

  // 실시간으로, 현위치와 목표 장소간의 이동시간을 계산
  useEffect(() => {
    const getLocation = async () => {
      try {
        const result = await requestPermission();

        if (result === "granted") {
          const pos: any = await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 3600,
              maximumAge: 3600,
            });
          });

          const travelTime = await getTravelTime([
            { x: pos.coords.longitude, y: pos.coords.latitude },
            coordinate,
          ]);

          const hour = Math.floor(travelTime / 60);
          const minute = travelTime % 60;
          if (hour > 0) {
            setRequiredTimeDestination(`${hour}시간 ${minute}분`);
          } else {
            setRequiredTimeDestination(`${minute}분`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, [coordinate]);

  useEffect(() => {
    // 이미지 로딩 시작
    const image = Image.prefetch(url);
    image
      .then(() => {
        // 이미지 로딩이 완료되면 loading을 false로 설정
        setLoading(false);
      })
      .catch(() => {
        // 이미지 로딩에 실패하면 loading을 false로 설정
        setLoading(false);
      });
  }, [url]);

  return (
    <Container>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <PreviewImage
          source={{
            uri: url,
          }}
        />
      )}
      <PlaceInfo>
        <PlaceName>{name}</PlaceName>
        <RequiredTimeDestination>
          {`예상 소요 시간: ${requiredTimeDestination}`}
        </RequiredTimeDestination>
      </PlaceInfo>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  gap: 15px;

  margin-bottom: 15px;
`;

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const PreviewImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const PlaceInfo = styled.View`
  margin-top: 5px;
  gap: 2px;
`;

const PlaceName = styled(BoldStyledText)`
  color: black;
  font-size: 15px;
`;

const RequiredTimeDestination = styled(StyledText)`
  color: #777777;
  font-size: 14px;
`;

export default WishItem;
