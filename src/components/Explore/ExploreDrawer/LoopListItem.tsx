import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

import styled from "styled-components/native";
import { BoldStyledText } from "styles/globalStyles";

interface LoopListItemProps {
  item: string;
  onPress: React.Dispatch<React.SetStateAction<string>>;
  isSelected: boolean;
}

const LoopListItem = ({ item, onPress, isSelected }: LoopListItemProps) => {
  return (
    <Shadow distance={4} offset={[1, 1]}>
      <TouchableOpacity
        onPress={() => onPress(item)}
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
