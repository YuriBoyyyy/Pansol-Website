import { Text } from "@chakra-ui/react";

interface WatermarkProps {
  text: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

function WaterMarkVariant(prop: WatermarkProps) {
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
      color="#EDECFF"
      zIndex={-1}
      fontFamily="Bebas Neue"
    >
      {text}
    </Text>
  );
}

export default WaterMarkVariant;
