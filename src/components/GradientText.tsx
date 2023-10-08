import { TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

import { StyledText } from "styles/globalStyles";

interface Coordinate {
  x: number;
  y: number;
}

interface GradientTextProps extends TextProps {
  colors: string[];
  start?: Coordinate;
  end?: Coordinate;
}

const GradientText = ({
  colors,
  style,
  start,
  end,
  children,
}: GradientTextProps) => {
  const key = children?.toString();

  return (
    <MaskedView
      key={key}
      maskElement={<StyledText style={style}>{children}</StyledText>}
    >
      <LinearGradient
        colors={colors}
        start={start || { x: 0, y: 0 }}
        end={end || { x: 1, y: 1 }}
      >
        <StyledText style={[style, { opacity: 0 }]}>{children}</StyledText>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
