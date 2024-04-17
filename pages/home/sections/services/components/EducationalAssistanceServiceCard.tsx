import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AppointmentServiceCardWave from "../../../../../assets/waves/AppointmentServiceCardWave";

function EducationalAssistanceServiceCard() {
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
          <Box color="#D47F41" fontSize="3.2rem">
            <AiFillSchedule />
          </Box>
          <Text
            color="#D47F41"
            fontFamily="inter"
            fontWeight="semibold"
            fontSize="1.3rem"
          >
            Educational Assistance
          </Text>
        </VStack>
        <AppointmentServiceCardWave />
        <VStack
          flex={1.5}
          h="100%"
          w="100%"
          paddingInline="1.5em"
          paddingBlockEnd="1.5em"
          borderBottomRadius="1rem"
          bg="linear-gradient(to bottom, #D47F41, #F6B100)"
          spacing="1.5rem"
        >
          <Box>
            <Box
              w="2rem"
              h=".6rem"
              bg="#EED372"
              borderRadius=".6rem"
              marginBottom=".2rem"
            />
            <Text
              textAlign="start"
              color="palette.primary"
              fontWeight="light"
              fontSize=".9rem"
            >
              Your education is a journey, and we are here to be your guide. We
              are ready to assist and support your education. Apply now and let
              us help you take the first step towards a brighter future!
            </Text>
          </Box>
          <HStack w="100%" justify="end" marginTop="2.2rem" spacing="1rem">
            <Button
              transition="all .3s ease"
              bg="rgba(90, 55, 170, .30)"
              _hover={{ bg: "rgba(100, 55, 158, .40)" }}
              color="palette.primary"
              onClick={() => navigate("services/educational_assistance")}
            >
              Use
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </WrapItem>
  );
}

export default EducationalAssistanceServiceCard;
