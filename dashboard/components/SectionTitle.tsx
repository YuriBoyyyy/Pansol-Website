import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface SectionTitleProps {
  title: string;
  justify: string;
}

function SectionTitle(props: SectionTitleProps) {
  const { title, justify } = props;
  return (
    <HStack
      align="center"
      justify={justify}
      spacing="1rem"
      w="100%"
      paddingBlock="1rem"
    >
      <Box w="1rem" h="2rem" bg="#FFCEC8" borderRadius=".5rem" />
      <Text
        fontSize="1.2rem"
        fontFamily="inter"
        textAlign="center"
        fontWeight="bold"
      >
        {title}
      </Text>
    </HStack>
  );
}

export default SectionTitle;
