import { Dimensions, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "redux/reducers";

import styled from "styled-components/native";

import { toggleWishClick } from "redux/slice/markerSlice";
import { StyledText } from "styles/globalStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ImageScreenCustomHeader = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);
  const marker = useSelector((state: RootState) => state.marker);

  const insets = useSafeAreaInsets();

  const onWish = async () => {
    dispatch(toggleWishClick(id));
    return marker.isWishClicked;
  };

  return (
    <HeaderContainer marginTop={insets.top}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Explore");
        }}
      >
        <Image
          source={require("assets/icon/arrow(left).png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <Title>{marker.markerName}</Title>
      <TouchableOpacity onPress={() => onWish()}>
        {marker.isWishClicked ? (
          <Image
            source={require("@assets/icon/heart(red).png")}
            style={{ width: 23, height: 23 }}
          />
        ) : (
          <Image
            source={require("@assets/icon/heart(line-B).png")}
            style={{ width: 23, height: 23 }}
          />
        )}
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View<{ marginTop: number }>`
  width: ${SCREEN_WIDTH}px;
  height: 53px;

  margin-top: ${(props) => props.marginTop}px;
  padding-left: 25px;
  padding-right: 25px;
  background-color: white;

  flex-direction: row;

  align-self: center;

  justify-content: space-between;
  align-items: center;
`;

// 헤더 타이틀
const Title = styled(StyledText)`
  font-size: 20px;
`;

export default ImageScreenCustomHeader;
