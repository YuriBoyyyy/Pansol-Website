import { HStack, Text, VStack } from "@chakra-ui/react";

function Mission() {
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
          Mission
        </Text>
      </HStack>
      <Text color="palette.secondary" fontWeight="light">
        To ensure an effect and efficient devolved Health Care System with
        accessible, available, and affordable all times.
      </Text>
    </VStack>
  );
}

export default Mission;
