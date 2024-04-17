import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { AiFillSchedule } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AppointmentServiceCardWave from "../../../../../assets/waves/AppointmentServiceCardWave";

function AppointmentServiceCard() {
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
            Schedule Appointments
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
          bg="linear-gradient(to bottom, #D47F41, #F6B554)"
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
              Too busy to go to the barangay to get a document or file a
              complain? We got your back, set your own schedule in your own
              time. Make an appointment now!
            </Text>
          </Box>
          <HStack w="100%" justify="end" marginTop="2.2rem" spacing="1rem">
            <Button
              transition="all .3s ease"
              bg="rgba(70, 55, 170, .30)"
              _hover={{ bg: "rgba(70, 55, 158, .40)" }}
              color="palette.primary"
              onClick={() => navigate("services/schedule_appointments")}
            >
              Use
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </WrapItem>
  );
}

export default AppointmentServiceCard;
