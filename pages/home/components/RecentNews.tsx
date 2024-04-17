import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";

function RecentNews() {
  return (
    <HStack justify="start" w="100%" spacing="1.5rem" paddingTop="2.6rem">
      <VStack
        w="16rem"
        borderRadius=".5rem"
        p="1rem"
        paddingInlineStart="0"
        align="start"
      >
        <Text fontWeight="medium" fontSize=".9rem" color="palette.body">
          Children Vaccination
        </Text>
        <Text fontSize=".8rem" fontFamily="poppins" fontWeight="light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eadipiscing elit, sed do e
        </Text>
        <HStack w="100%" justify="space-between">
          <Text fontSize=".6rem" color="palette.accent">
            2 hours ago
          </Text>
          <Button
            fontSize=".7rem"
            color="palette.body"
            fontWeight="medium"
            bg="#F4F4F4"
            rightIcon={<AiOutlineArrowRight />}
            _hover={{
              bg: "#EDEDED",
            }}
          >
            Read more
          </Button>
        </HStack>
      </VStack>
      <VStack
        w="16rem"
        borderRadius=".5rem"
        p="1rem"
        paddingInlineStart="0"
        align="start"
      >
        <Text fontWeight="medium" fontSize=".9rem" color="palette.body">
          Children Vaccination
        </Text>
        <Text fontSize=".8rem" fontFamily="poppins" fontWeight="light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eadipiscing elit, sed do e
        </Text>
        <HStack w="100%" justify="space-between">
          <Text fontSize=".6rem" color="palette.accent">
            2 hours ago
          </Text>
          <Button
            fontSize=".7rem"
            color="palette.body"
            fontWeight="medium"
            bg="#F4F4F4"
            rightIcon={<AiOutlineArrowRight />}
            _hover={{
              bg: "#EDEDED",
            }}
          >
            Read more
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default RecentNews;
