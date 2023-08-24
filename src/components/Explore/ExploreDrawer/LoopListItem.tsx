import { memo } from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

import styled from "styled-components/native";
import { BoldStyledText } from "styles/globalStyles";
import { setRegion } from "redux/slice/drawerSlice";

interface LoopListItemProps {
  item: string;
  isSelected: boolean;
}

const LoopListItem = ({ item, isSelected }: LoopListItemProps) => {
  const dispatch = useDispatch();

  return (
    <Shadow distance={4} offset={[1, 1]}>
      <TouchableOpacity
        onPress={() => dispatch(setRegion(item))}
        style={{
          justifyContent: "center",
          alignItems: "center",

          width: 45,
          height: 30,

          borderRadius: 13,

          backgroundColor: isSelected ? "#bfbfbf" : "#e5e5e5",
        }}
      >
        <ContentText>{item}</ContentText>
      </TouchableOpacity>
    </Shadow>
  );
};

const ContentText = styled(BoldStyledText)`
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: black;
`;

export default memo(LoopListItem);
