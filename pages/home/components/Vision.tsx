import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function Vision() {
  return (
    <Box w="100%">
      <VStack
        align="start"
        spacing="1.5rem"
        p="1.5rem"
        borderRadius=".5rem"
        bg="palette.tertiary"
        w="100%"
        margin="auto"
      >
        <HStack gap="1rem">
          <Text color="palette.accent" fontFamily="inter">
            Pananaw
          </Text>
        </HStack>
        <Text color="palette.primary" fontWeight="light">
          Mapaunlad at magkaroon ng maayos at malusog na pamayanang may takot sa
          Diyos, may pagkakaisa at pagsunod sa alituntunin ng batas
        </Text>
      </VStack>
    </Box>
  );
}

export default Vision;
