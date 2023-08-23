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
      {/* Shadow 컴포넌트 자체 버그로 인해,
      Shadow 컴포넌트 바로 아래에는 styled-components를 쓸 수 없음!
      따라서 부득이하게, 생짜 스타일을 그대로 때려박았다... */}
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

export default LoopListItem;
