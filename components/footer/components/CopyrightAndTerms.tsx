import { Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CopyrightAndTerms() {
  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      // RESPONSIVE ELEMENTS
      alignItems={{ base: "start", md: "center" }}
      flexDir={{ base: "column-reverse", md: "row" }}
      gap={{ base: "1rem", md: "" }}
    >
      <Text
        fontFamily="inter"
        fontWeight="semibold"
        color="#8C85FF"
        fontSize=".9rem"
        marginBottom="1rem"
        textAlign="center"
      >
        Copyright 2023 Barangay Pansol | All rights reserved.
      </Text>
      <HStack
        color="#C5C1FF"
        fontFamily="inter"
        fontWeight="semibold"
        fontSize=".9rem"
        w="100%"
        justify={{ base: "center", md: "end" }}
      >
        <Link to="privacy-policy">
          <Text>Privacy Policy</Text>
        </Link>
        <Link to="terms-of-service">
          <Text>Terms of use</Text>
        </Link>
      </HStack>
    </Flex>
  );
}

export default CopyrightAndTerms;
