import { memo } from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

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
    <TouchableOpacity
      onPress={() => dispatch(setRegion(item))}
      style={{
        width: 60,
        height: 40,
      }}
    >
      <ItemGradient
        colors={
          isSelected ? ["#4981FF80", "#33E1C080"] : ["#4981FF40", "#33E1C040"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ContentText>{item}</ContentText>
      </ItemGradient>
    </TouchableOpacity>
  );
};

const ContentText = styled(BoldStyledText)`
  padding: 0;
  margin: 0;
  font-size: 15px;
  color: black;
`;

const ItemGradient = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  border-radius: 20px;
`;

export default memo(LoopListItem);
