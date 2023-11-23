import { useState } from "react";
import styled from "styled-components/native";

import { StyledText } from "@styles/globalStyles";

const PlaceImageScreen = ({ route }: any) => {
  const { placeName } = route.params;

  console.log(placeName);

  // TODO: 이미지 리스트 서버에서 받아오는 것으로 수정할 것
  const [ImageList, _setImageList] = useState<[]>([]);

  return (
    <Container>
      {ImageList.length !== 0 ? null : (
        <>
          <Icon source={require("@assets/icon/photo(color).png")} />
          <StyledText
            style={{ textAlign: "center" }}
          >{`해당 장소에 대한 사진이 없습니다.
우측 상단의 하트를 눌러주시면,
보다 빠른 사진 업로드에 도움이 됩니다!`}</StyledText>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;

  margin-bottom: 10px;
`;

export default PlaceImageScreen;
