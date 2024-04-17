import { Text, VStack } from "@chakra-ui/react";
import React from "react";

function FunFact() {
  return (
    <VStack
      maxW="60rem"
      margin="auto"
      bg="#E6E4FE"
      p="1.5rem"
      borderRadius=".6rem"
      align="start"
    >
      <Text fontWeight="bold" fontSize="1.2rem" fontFamily="inter">
        Fun Fact!
      </Text>
      <Text fontWeight="normal">
        The town of Pansol years ago were surrounded by rice fields and coconut
        trees. It is the primary source of foods of the residents in Pansol. As
        shown in the logo it also has high mountains were the tower of
        telecommunication is located.
      </Text>
    </VStack>
  );
}

export default FunFact;
