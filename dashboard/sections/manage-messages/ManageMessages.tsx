import { Box, HStack, Text } from "@chakra-ui/react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import Sidebar from "./components/Sidebar";

function ManageMessages() {
  const navigate = useNavigate();

  return (
    <Box w="100%" p="2rem">
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Manage Messages
      </Text>
      <HStack
        paddingBlockEnd="2rem"
        w="fit-content"
        h="fit-content"
        fontFamily="inter"
      >
        <HStack cursor="pointer" onClick={() => navigate("../")}>
          <Text>Back</Text>
          <Box>
            <BsArrowReturnLeft />
          </Box>
        </HStack>
      </HStack>
      <Sidebar />
    </Box>
  );
}

export default ManageMessages;
