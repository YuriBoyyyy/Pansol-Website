import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

function Mission() {
  return (
    <Box w="100%">
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
          <Text color="palette.secondary" fontFamily="inter" fontWeight="bold">
            Misyon
          </Text>
        </HStack>
        <Text color="palette.secondary" fontWeight="light">
          Maitaas ang dignidad ng bawat isang nilalang upang maging isang
          responsableng mamamayan kung saan ang kalayaan at ang hustisya ang
          umiiral
        </Text>
      </VStack>
    </Box>
  );
}

export default Mission;
