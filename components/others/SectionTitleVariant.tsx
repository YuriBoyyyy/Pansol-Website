import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface SectionTitleProps {
  title: string;
  description: string;
}

function SectionTitleVariant(props: SectionTitleProps) {
  const { title, description } = props;

  return (
    <HStack align="start" spacing="1rem" w="100%">
      <Box w="1.5rem" h="2.5rem" bg="palette.accent" borderRadius=".5rem" />
      <VStack align="start" justify="start" spacing=".1rem">
        <Text
          fontSize="2.2rem"
          fontFamily="inter"
          fontWeight="bold"
          color="palette.primary"
        >
          {title}
        </Text>
        <Text fontSize="1.1rem" color="palette.accent">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
}

export default SectionTitleVariant;
