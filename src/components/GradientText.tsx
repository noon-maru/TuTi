import { TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

import { StyledText } from "styles/globalStyles";

interface Coordinate {
  x: number;
  y: number;
}

interface Props extends TextProps {
  colors: string[];
  start?: Coordinate;
  end?: Coordinate;
}

const GradientText = ({ colors, style, start, end, ...props }: Props) => {
  return (
    <MaskedView maskElement={<StyledText style={style} {...props} />}>
      <LinearGradient
        colors={colors}
        start={start || { x: 0, y: 0 }}
        end={end || { x: 1, y: 1 }}
      >
        <StyledText {...props} style={[style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
