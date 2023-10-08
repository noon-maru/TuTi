import { StatusBar, TouchableOpacity } from "react-native";
import Popover, { PopoverPlacement } from "react-native-popover-view";

import styled from "styled-components/native";
import { BoldStyledText } from "styles/globalStyles";

import { SortOrder } from "./PlaceList";
import { useState } from "react";

interface TouchablePopoverProps {
  sortData: (order: SortOrder) => void;
  sortOrder: string;
}

const TouchablePopover = ({ sortData, sortOrder }: TouchablePopoverProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      from={
        <TouchableOpacity onPress={() => setVisible(true)}>
          <ListHeaderText>{sortOrder}</ListHeaderText>
        </TouchableOpacity>
      }
      popoverStyle={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#7FCFE9",
      }}
      backgroundStyle={{ opacity: 0 }}
      placement={PopoverPlacement.BOTTOM}
      offset={-15}
      arrowSize={{ width: 0, height: 0 }}
      verticalOffset={-(StatusBar.currentHeight ?? 0)}
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      // statusBarTranslucent
    >
      <PopoverList>
        <TouchableOpacity
          onPress={() => {
            sortData("recommend");
            setVisible(false);
          }}
        >
          <PopoverListText>추천순</PopoverListText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            sortData("recent");
            setVisible(false);
          }}
        >
          <PopoverListText>최근 등록 순</PopoverListText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            sortData("highHeart");
            setVisible(false);
          }}
        >
          <PopoverListText>하트 높은 순</PopoverListText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            sortData("lowHeart");
            setVisible(false);
          }}
        >
          <PopoverListText>하트 낮은 순</PopoverListText>
        </TouchableOpacity>
      </PopoverList>
    </Popover>
  );
};

const PopoverList = styled.View`
  margin: 15px;

  gap: 8px;
`;

const ListHeaderText = styled(BoldStyledText)`
  align-items: flex-end;

  text-decoration-line: underline;
  font-size: 14px;
  color: black;
`;

const PopoverListText = styled(BoldStyledText)`
  align-items: flex-end;

  text-decoration-line: underline;
  font-size: 14px;
  color: black;
`;

export default TouchablePopover;
