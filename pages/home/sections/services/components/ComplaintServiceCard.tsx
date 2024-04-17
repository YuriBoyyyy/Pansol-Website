import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { IoMdArrowDropright } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ComplaintServiceCardWave from "../../../../../assets/waves/ComplaintServiceCardWave";

function ComplaintServiceCard() {
  const navigate = useNavigate();
  return (
    <WrapItem>
      <Flex
        justifyContent="center"
        alignItems="center"
        maxW="25rem"
        h="30rem"
        bg="#F6F5FF"
        borderRadius="1rem"
        flexDir="column"
        boxShadow="5px 5px 18px rgba(43, 39, 62, .25)"
      >
        <VStack
          flex={1}
          h="100%"
          w="100%"
          justify="center"
          spacing="1rem"
          p="1.5em"
        >
          <Box color="#6C5AD9" fontSize="3.2rem">
            <FaBullhorn />
          </Box>
          <Text
            color="#6C5AD9"
            fontFamily="inter"
            fontWeight="semibold"
            fontSize="1.3rem"
          >
            File Complaints
          </Text>
        </VStack>
        <ComplaintServiceCardWave />
        <VStack
          flex={1.5}
          h="100%"
          w="100%"
          paddingInline="1.5em"
          paddingBlockEnd="1.5em"
          borderBottomRadius="1rem"
          bg="linear-gradient(to bottom, #6C5AD9, #956CED)"
          spacing="1.5rem"
        >
          <Box>
            <Box
              w="2rem"
              h=".6rem"
              bg="#D8C7FF"
              borderRadius=".6rem"
              marginBottom=".2rem"
            />
            <Text
              textAlign="start"
              color="palette.primary"
              fontWeight="light"
              fontSize=".9rem"
            >
              A public forum for you to freely state your thoughts, concerns,
              and complaints. Let your voice be heard.
            </Text>
          </Box>
          <HStack spacing="1rem" w="100%" justify="end" marginTop="2.2rem">
            <Button
              transition="all .3s ease"
              bg="rgba(70, 55, 170, .30)"
              _hover={{ bg: "rgba(70, 55, 158, .40)" }}
              color="palette.accent"
              onClick={() => navigate("services/file_complaints")}
            >
              Use
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </WrapItem>
  );
}

export default ComplaintServiceCard;
