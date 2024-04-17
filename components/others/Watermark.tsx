import { Text } from "@chakra-ui/react";

interface WatermarkProps {
  text: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

function WaterMark(prop: WatermarkProps) {
  const { top, bottom, right, left, text } = prop;

  return (
    <Text
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      pos="absolute"
      fontSize="20rem"
      fontWeight="bold"
      color="palette.watermark"
      zIndex={0}
      fontFamily="Bebas Neue"
    >
      {text}
    </Text>
  );
}

export default WaterMark;
