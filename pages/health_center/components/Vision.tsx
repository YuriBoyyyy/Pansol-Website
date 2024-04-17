import { HStack, Text, VStack } from "@chakra-ui/react";

function Vision() {
  return (
    <VStack
      align="start"
      spacing="1.5rem"
      p="1.5rem"
      borderRadius=".5rem"
      bg="#F6F5FF"
      w="100%"
      margin="auto"
      border="1px solid"
      borderColor="palette.secondary"
    >
      <HStack gap="1rem">
        <Text
          fontSize="1.2rem"
          color="palette.secondary"
          fontFamily="inter"
          fontWeight="bold"
        >
          Vision
        </Text>
      </HStack>
      <Text color="palette.secondary" fontWeight="light">
        Health far all by the year 2000 and health in the hand of people by the
        year 2020
      </Text>
    </VStack>
  );
}

export default Vision;
