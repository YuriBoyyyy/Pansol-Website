import { Text, VStack, WrapItem } from "@chakra-ui/react";
import React from "react";

function TotalHousehold() {
  return (
    <WrapItem>
      <VStack w="15rem">
        <Text fontFamily="inter" fontWeight="semibold">
          Total Household
        </Text>
        <Text color="palette.secondary" fontSize="3rem" fontWeight="black">
          636
        </Text>
      </VStack>
    </WrapItem>
  );
}

export default TotalHousehold;
