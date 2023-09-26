import { Dimensions, View, Share, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Shadow } from "react-native-shadow-2";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "styles/globalStyles";

import { RootState } from "redux/reducers";
import { toggleWishClick } from "redux/slice/markerSlice";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const InformBox = () => {
  const dispatch = useDispatch();
  const marker = useSelector((state: RootState) => state.marker);
  const { id } = useSelector((state: RootState) => state.user);

  const urlStringify = (address: string) => {
    const deeplink =
      "com.noonmaru.tuti://explore/" + address.replace(/\s+/g, "_");
    return deeplink;
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: urlStringify(marker.address),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("activityType!");
        } else {
          console.log("Share!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onWish = async () => {
    dispatch(toggleWishClick(id));
    return marker.isWishClicked;
  };

  return (
    <Container>
      <Shadow distance={4} offset={[0, 4]}>
        <View
          style={{
            alignItems: "center",

            width: SCREEN_WIDTH - 40,
            height: 225,

            borderRadius: 25,

            backgroundColor: "white",
          }}
        >
          <HeaderContainer>
            <BoldStyledText style={{ fontSize: 20 }}>
              {marker.markerName}
            </BoldStyledText>
            <ImageContainer>
              <Pressable onPress={() => onWish()}>
                {marker.isWishClicked ? (
                  <Icon source={require("@assets/icon/heart(red).png")} />
                ) : (
                  <Icon source={require("@assets/icon/heart(line-B).png")} />
                )}
              </Pressable>
              <Pressable onPress={() => onShare()}>
                <Icon source={require("@assets/icon/share.png")} />
              </Pressable>
            </ImageContainer>
          </HeaderContainer>
          <DividingLine
            colors={["#518FFF", "#33E1C0"]} // 그라데이션 색상 배열
            start={{ x: 0, y: 0 }} // 그라데이션 시작점 (왼쪽 상단) (범위: 0~1)
            end={{ x: 1, y: 0 }} // 그라데이션 끝점 (오른쪽 상단) (범위: 0~1)
          />
          <ContentsContainer>
            <DetailInformContainer>
              <Icon source={require("@assets/icon/park(line-black).png")} />
              <Icon source={require("@assets/icon/info(line).png")} />
              <Icon source={require("@assets/icon/photo(black).png")} />
            </DetailInformContainer>
            <InformContents>입장료 {marker.admissionFee}</InformContents>
            <InformContents>휴무일 {marker.closedDays}</InformContents>
            <InformContents>지하철 {marker.subwayInfo}</InformContents>
            <InformContents>
              버스 경로 {marker?.busInfo?.busRoutes}
            </InformContents>
            <InformContents>
              버스 정류장 {marker?.busInfo?.busStops}
            </InformContents>
          </ContentsContainer>
        </View>
      </Shadow>
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  bottom: 0px;

  margin-bottom: 80px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;

  margin-top: 18px;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  gap: 8px;

  margin-right: 5px;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

const DividingLine = styled(LinearGradient)`
  margin-top: 5px;
  margin-bottom: 10px;

  width: 90%;
  height: 3.1px;
`;

const ContentsContainer = styled.View`
  width: 90%;
`;

const DetailInformContainer = styled.View`
  align-self: flex-end;
  flex-direction: row;
  gap: 4px;

  margin-right: 5px;
  margin-bottom: 8px;
`;

const InformContents = styled(StyledText)`
  font-size: 17px;
  line-height: 25px;
  color: black;
`;

export default InformBox;
