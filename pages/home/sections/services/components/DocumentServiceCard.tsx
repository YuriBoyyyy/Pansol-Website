import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DocumentServiceCardWave from "../../../../../assets/waves/DocumentServiceCardWave";

function DocumentServiceCard() {
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
          <Box color="#4F3BC1" fontSize="3.2rem">
            <BsFillFileEarmarkMedicalFill />
          </Box>
          <Text
            color="#4F3BC1"
            fontFamily="inter"
            fontWeight="semibold"
            fontSize="1.3rem"
          >
            Get Documents
          </Text>
        </VStack>
        <DocumentServiceCardWave />
        <VStack
          flex={1.5}
          h="100%"
          w="100%"
          paddingInline="1.5em"
          paddingBlockEnd="1.5em"
          borderBottomRadius="1rem"
          bg="linear-gradient(to bottom, #5741D4, #8E58FF)"
          spacing="1.5rem"
        >
          <Box>
            <Box
              w="2rem"
              h=".6rem"
              bg="#7357FF"
              borderRadius=".6rem"
              marginBottom=".2rem"
            />
            <Text
              textAlign="start"
              color="palette.primary"
              fontWeight="light"
              fontSize=".9rem"
            >
              Save time getting documents by just filling-up form online. Get
              the specific documents that you needed in just one tap!
            </Text>
          </Box>
          <HStack w="100%" spacing="1rem" justify="end" marginTop="2.2rem">
            <Button
              transition="all .3s ease"
              bg="rgba(253, 209, 110, .15)"
              _hover={{ bg: "rgba(253, 209, 110, .25)" }}
              color="palette.accent"
              onClick={() => navigate("services/get_documents")}
            >
              Use
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </WrapItem>
  );
}

export default DocumentServiceCard;
