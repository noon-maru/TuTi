import { useEffect, useState } from "react";
import {
  Image,
  ImageURISource,
  Pressable,
  ScrollView,
  View,
} from "react-native";

import FastImage from "react-native-fast-image";
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";

import Icon from "react-native-vector-icons/AntDesign";

import axios from "axios";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { SERVER_URL, API } from "@env";

import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import Spinner from "@components/Spinner";
import ImageCheckModal from "./ImageCheckModal";
import PlaceDropCheckModal from "./PlaceDropCheckModal";

interface PlaceContainerProps {
  courseId: string;
  place: Place;
  recordedImages: string[];
  isLast?: boolean;
}

const PlaceContainer = ({
  courseId,
  place,
  recordedImages,
  isLast = false,
}: PlaceContainerProps) => {
  const { id: userId } = useSelector((state: RootState) => state.user);

  const [recordImages, setRecordImages] = useState<ImageURISource[]>([]);
  const [recordImageWidth, setRecordImageWidth] = useState<number[]>([]);
  const [tempImageWidth, setTempImageWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImageDrop = async (index: number) => {
    const imageUrl = recordImages[index].uri;
    if (!imageUrl) {
      console.error("유효하지 않은 index입니다.");
      return;
    }
    const imageName = imageUrl!.split("/")[6];

    try {
      const response = await axios.delete(
        SERVER_URL +
          API +
          `/course/userimage/${userId}/${courseId}/${place._id}/${imageName}`
      );
      if (response.status === 200) {
        setRecordImages((prev) =>
          prev.filter(
            (imagePath) =>
              imagePath.uri !==
              `/static/userimage/${userId}/${courseId}/${place._id}/${imageName}`
          )
        );
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  };

  const pickImageChange = async (index: number) => {
    const imageUrl = recordImages[index].uri;
    if (!imageUrl) {
      console.error("유효하지 않은 index입니다.");
      return;
    }
    const imageName = imageUrl!.split("/")[6];

    const option: ImageLibraryOptions = {
      mediaType: "photo",
    };
    const result = await launchImageLibrary(option);

    if (result.didCancel) {
      console.log("사용자가 이미지 선택을 취소했습니다.");
    } else if (result.errorCode) {
      console.error("ImagePicker Error: ", result.errorMessage);
    } else {
      const source: Asset = result.assets![0];

      try {
        const formData = new FormData();
        formData.append("image", {
          uri: source.uri,
          type: "image/jpeg",
          name: "filename.jpg",
        });
        const response = await axios.put(
          SERVER_URL +
            API +
            `/course/userimage/${userId}/${courseId}/${place._id}/${imageName}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(true);
        setTimeout(() => {
          setRecordImages((prev) =>
            prev.map((imageUri, i) =>
              i === index ? { uri: response.data.recordImagePath } : imageUri
            )
          );
        }, 500);
      } catch (error) {
        console.error("네트워크 오류:", error);
        throw error;
      }
    }
  };

  const pickImagePush = async () => {
    const option: ImageLibraryOptions = {
      mediaType: "photo",
    };
    const result = await launchImageLibrary(option);

    if (result.didCancel) {
      console.log("사용자가 이미지 선택을 취소했습니다.");
    } else if (result.errorCode) {
      console.error("ImagePicker Error: ", result.errorMessage);
    } else {
      const source: Asset = result.assets![0];

      try {
        const formData = new FormData();
        formData.append("image", {
          uri: source.uri,
          type: "image/jpeg",
          name: "filename.jpg",
        });
        const response = await axios.post(
          SERVER_URL +
            API +
            `/course/userimage/${userId}/${courseId}/${place._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(true);
        setTimeout(() => {
          setRecordImages((prev) => [
            ...prev,
            { uri: response.data.recordImage },
          ]);
        }, 500);
      } catch (error) {
        console.error("네트워크 오류:", error);
        throw error;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredRecordedImage = recordedImages.filter(
          (recordedImageUrl) =>
            // 문자열을 /를 기준으로 분리하고, 현재 장소의 ID와 같은 placeId들만 필터링
            place._id === recordedImageUrl.split("/")[5]
        );
        if (!filteredRecordedImage.length) return;

        setRecordImages(filteredRecordedImage.map((uri) => ({ uri })));
      } catch (error) {
        console.error("네트워킹 오류:", error);
        throw error;
      }
    };

    fetchData();
  }, [place._id, recordedImages]);

  useEffect(() => {
    // 이미지 높이는 90px로 고정, 너비는 원본 비율에 따라 조절
    Image.getSize(SERVER_URL + place.image, (width, height) =>
      setTempImageWidth(90 * (width / height))
    );
  }, [place.image]);

  useEffect(() => {
    setRecordImageWidth([]);
    if (recordImages.length) {
      const getSizePromises = recordImages.map((image) => {
        if (image.uri) {
          return new Promise((resolve) => {
            Image.getSize(
              SERVER_URL + image.uri,
              (width, height) => {
                const widthValue = 90 * (width / height);
                resolve(widthValue);
              },
              () => {
                // 이미지 로딩에 실패할 경우, 0으로 처리
                resolve(0);
              }
            );
          });
        }
        return Promise.resolve(0);
      });

      Promise.all(getSizePromises).then((widths: any[]) => {
        setRecordImageWidth(widths);
      });
    }
  }, [recordImages]);

  return (
    <Container>
      <LineWithDiamonds>
        <TopDiamond />
        {isLast ? <BottonDiamond /> : null}
      </LineWithDiamonds>
      <PlaceContentsContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextUnderLine>
            <PlaceText>{place.name}</PlaceText>
          </TextUnderLine>
          <PlaceDropCheckModal courseId={courseId} placeName={place.name}>
            <Image
              source={require("@assets/icon/trash(black).png")}
              style={{ width: 15, height: 15 }}
            />
          </PlaceDropCheckModal>
        </View>
        <ScrollViewContainer>
          <ScrollView
            contentContainerStyle={{ gap: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {recordImages.map((recordImage, index) => (
              <ImageCheckModal
                key={index}
                pickImageChange={pickImageChange}
                pickImageDrop={pickImageDrop}
                imageIndex={index}
                imageUri={SERVER_URL + recordImage.uri}
              >
                {loading && (
                  <SpinnerContainer>
                    <Spinner />
                  </SpinnerContainer>
                )}
                <FastImage
                  source={{
                    uri: SERVER_URL + recordImage.uri,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  onLoadEnd={() => setLoading(false)}
                  style={[
                    {
                      width: recordImageWidth[index],
                      height: 90,
                      borderRadius: 10,
                    },
                    loading ? { width: 0 } : {},
                  ]}
                  resizeMode="contain"
                />
              </ImageCheckModal>
            ))}
            <Pressable onPress={() => pickImagePush()}>
              <FastImage
                source={{
                  uri: SERVER_URL + place.image,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={{
                  width: tempImageWidth,
                  height: "100%",
                  borderRadius: 10,
                }}
              />
              <ImageOverlay>
                <TopLeftCorner />
                <TopRightCorder />
                <BottomLeftCorner />
                <BottomRightCorner />
                <Icon name="plussquareo" size={24} color="white" />
              </ImageOverlay>
            </Pressable>
          </ScrollView>
        </ScrollViewContainer>
        {isLast ? <StyledText>코스 끝</StyledText> : null}
      </PlaceContentsContainer>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
`;

const LineWithDiamonds = styled.View`
  position: relative;

  align-items: center;

  width: 1px;
  height: 135px;

  background-color: black;
`;
const Diamond = styled.View`
  position: absolute;

  width: 5px;
  height: 5px;
  background-color: black;
  transform: rotate(45deg);
`;
const TopDiamond = styled(Diamond)`
  top: 0px;
`;
const BottonDiamond = styled(Diamond)`
  bottom: 0px;
`;

const PlaceContentsContainer = styled.View`
  width: 100%;
  margin-top: -4px;
  margin-left: 10px;
  gap: 5px;
`;

const TextUnderLine = styled.View`
  border-color: black;
  border-bottom-width: 0.5px;
  padding-bottom: 3px;
`;

const PlaceText = styled(StyledText)`
  font-size: 13px;
  line-height: 15px;
`;

const ScrollViewContainer = styled.View`
  height: 100px;
  border-radius: 10px;

  padding: 5px;

  background-color: #d9d9d9;
`;

const ImageOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Corner = styled.View`
  position: absolute;

  width: 15px;
  height: 15px;

  border-color: white;
`;
const TopLeftCorner = styled(Corner)`
  top: 10px;
  left: 10px;

  border-top-width: 1px;
  border-left-width: 1px;
`;
const TopRightCorder = styled(Corner)`
  top: 10px;
  right: 10px;

  border-top-width: 1px;
  border-right-width: 1px;
`;
const BottomLeftCorner = styled(Corner)`
  bottom: 10px;
  left: 10px;

  border-bottom-width: 1px;
  border-left-width: 1px;
`;
const BottomRightCorner = styled(Corner)`
  bottom: 10px;
  right: 10px;

  border-bottom-width: 1px;
  border-right-width: 1px;
`;

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 90px;
  border-radius: 6px;
`;

export default PlaceContainer;
