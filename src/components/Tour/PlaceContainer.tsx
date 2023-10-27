import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";

import FastImage from "react-native-fast-image";
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";

import Icon from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";
import { StyledText } from "@styles/globalStyles";

import { SERVER_URL, API } from "@env";

import { RootState } from "@redux/reducers";
import { updateCourse } from "@redux/slice/courseSlice";

import Spinner from "@components/Spinner";
import ImageCheckModal from "./ImageCheckModal";
import PlaceDropCheckModal from "./PlaceDropCheckModal";

interface PlaceContainerProps {
  courseId: string;
  place: Place;
  isLast?: boolean;
}

const PlaceContainer = ({
  courseId,
  place,
  isLast = false,
}: PlaceContainerProps) => {
  const dispatch = useDispatch();

  const { id: userId } = useSelector((state: RootState) => state.user);
  const { courses } = useSelector((state: RootState) => state.courses);

  const [courseIndex, setCourseIndex] = useState<number>(0);
  const [recordImageWidth, setRecordImageWidth] = useState<number[]>([]);
  const [tempImageWidth, setTempImageWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImageDrop = async (index: number) => {
    const imageUrl = courses[courseIndex].recordImages[index];
    if (!imageUrl) {
      console.error("유효하지 않은 index입니다.");
      return;
    }
    const imageName = imageUrl!.split("/")[6];

    try {
      await axios.delete(
        SERVER_URL +
          API +
          `/course/userimage/${userId}/${courseId}/${place._id}/${imageName}`
      );
      // 이미지 정보를 수정하기 위해 기존 코스 객체를 복사
      const courseToUpdate = courses[courseIndex];

      // 업데이트 된 코스 정보
      const updatedCourse = {
        ...courseToUpdate,
        recordImages: courseToUpdate.recordImages.filter(
          (imagePath) =>
            imagePath !==
            `/static/userimage/${userId}/${courseId}/${place._id}/${imageName}`
        ),
      };

      // 코스 정보 업데이트
      dispatch(updateCourse({ courseIndex, updatedCourse }));

      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "이미지 삭제 성공", // 메시지 제목
        text2: `${place.name} 장소에서 이미지를 삭제했습니다!`, // 메시지 내용
        visibilityTime: 3000, // 토스트 메시지 표시 시간 (밀리초)
      });
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  };

  const pickImageChange = async (index: number) => {
    const imageUrl = courses[courseIndex].recordImages[index];
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
      Toast.show({
        type: "info",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "이미지 변경 중", // 메시지 제목
        text2: `${place.name} 장소의 이미지를 변경 중입니다. 잠시만 기다려주세요!`, // 메시지 내용
        visibilityTime: 10000, // 토스트 메시지 표시 시간 (밀리초)
      });
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
          // 여기에서 다른 상태 업데이트와 작업을 수행
          const updatedImagePath = response.data.recordImagePath as string;

          // 기존 코스 객체를 복사해 새로운 이미지 정보 추가
          const courseToUpdate = courses[courseIndex];

          // 업데이트 된 코스 정보
          const updatedCourse = {
            ...courseToUpdate,
            recordImages: courseToUpdate.recordImages.map((imageUri, i) =>
              i === index ? updatedImagePath : imageUri
            ),
          };

          dispatch(updateCourse({ courseIndex, updatedCourse }));

          Toast.show({
            type: "success",
            position: "bottom", // 토스트 메시지 위치 (top, bottom)
            text1: "이미지 변경 성공", // 메시지 제목
            text2: `${place.name} 장소에 이미지를 변경했습니다!`, // 메시지 내용
            visibilityTime: 5000, // 토스트 메시지 표시 시간 (밀리초)
          });
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
      Toast.show({
        type: "info",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "이미지 등록 중", // 메시지 제목
        text2: `${place.name} 장소에 이미지를 등록 중입니다. 잠시만 기다려주세요!`, // 메시지 내용
        visibilityTime: 10000, // 토스트 메시지 표시 시간 (밀리초)
      });

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
          // 여기에서 다른 상태 업데이트와 작업을 수행
          const updatedImage = response.data.recordImage as string;

          // 기존 코스 객체를 복사해 새로운 이미지 정보 추가
          const courseToUpdate = courses[courseIndex];

          // 업데이트 된 코스 정보
          const updatedCourse = {
            ...courseToUpdate,
            recordImages: [...courseToUpdate.recordImages, updatedImage],
          };

          dispatch(updateCourse({ courseIndex, updatedCourse }));

          Toast.show({
            type: "success",
            position: "bottom",
            text1: "이미지 등록 성공",
            text2: `${place.name} 장소에 이미지를 등록했습니다!`,
            visibilityTime: 5000,
          });
        }, 500);
      } catch (error) {
        console.error("네트워크 오류:", error);
        throw error;
      }
    }
  };

  useEffect(() => {
    // 이미지 높이는 90px로 고정, 너비는 원본 비율에 따라 조절
    Image.getSize(SERVER_URL + place.image, (width, height) =>
      setTempImageWidth(90 * (width / height))
    );
  }, [place.image]);

  useEffect(
    () =>
      setCourseIndex(courses.findIndex((course) => course._id === courseId)),
    [courseId, courses]
  );

  useEffect(() => {
    setRecordImageWidth([]);
    if (courses[courseIndex].recordImages.length) {
      const getSizePromises = courses[courseIndex].recordImages.map(
        (imagePath) => {
          if (imagePath) {
            return new Promise((resolve) => {
              Image.getSize(
                SERVER_URL + imagePath,
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
        }
      );

      Promise.all(getSizePromises).then((widths: any[]) => {
        setRecordImageWidth(widths);
      });
    }
  }, [courses, courseIndex]);

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
            {courses[courseIndex].recordImages
              .filter((recordImage) => recordImage.split("/")[5] === place._id)
              .map((recordImage, index) => (
                <ImageCheckModal
                  key={index}
                  pickImageChange={pickImageChange}
                  pickImageDrop={pickImageDrop}
                  imageIndex={index}
                  imageUri={SERVER_URL + recordImage}
                >
                  {loading && (
                    <SpinnerContainer>
                      <Spinner />
                    </SpinnerContainer>
                  )}
                  <FastImage
                    source={{
                      uri: SERVER_URL + recordImage,
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
