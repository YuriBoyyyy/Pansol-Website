import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface SectionTitleProps {
  title: string;
  description: string;
}

function SectionTitle(props: SectionTitleProps) {
  const { title, description } = props;

  return (
    <HStack align="start" spacing="1rem" w="100%">
      <Box
        w="1.5rem"
        h="2.5rem"
        bg="palette.secondary"
        borderRadius=".5rem"
        opacity={0.5}
      />
      <VStack align="start" justify="start" spacing=".1rem">
        <Text
          fontSize={{ base: "1.5rem", md: "2rem" }}
          fontFamily="inter"
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text opacity=".8" fontSize={{ base: ".9rem", md: "1.1rem" }}>
          {description}
        </Text>
      </VStack>
    </HStack>
  );
}

export default SectionTitle;
