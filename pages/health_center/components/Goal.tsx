import { HStack, Text, VStack } from "@chakra-ui/react";

function Goal() {
  return (
    <VStack
      align="start"
      spacing="1.5rem"
      p="1.5rem"
      borderRadius=".5rem"
      w="100%"
      margin="auto"
      bg="palette.tertiary"
    >
      <HStack gap="1rem">
        <Text
          color="palette.accent"
          fontSize="1.2rem"
          fontFamily="inter"
          fontWeight="bold"
        >
          Goal
        </Text>
      </HStack>
      <Text color="palette.primary" fontWeight="light">
        Partnership of Local Government Unit (LGU), Private Sector Government
        and non-government organization toward self-reliance in the provision of
        basic Health Services in the localities.
      </Text>
    </VStack>
  );
}

export default Goal;
