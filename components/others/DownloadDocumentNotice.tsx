import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";
import useObserver from "../../hooks/useObserver";

import SuccessAnimation from "../../assets/successAnimation.json";

function DownloadDocumentNotice() {
  const { ref } = useObserver("Home");
  const navigate = useNavigate();

  return (
    <Center flexDir="column" gap="2rem" h="100vh" ref={ref}>
      <VStack
        fontSize="2rem"
        fontFamily="inter"
        fontWeight="bold"
        color="palette.secondary"
      >
        <Lottie
          loop={0}
          animationData={SuccessAnimation}
          play
          style={{ width: 350, height: 350 }}
        />
      </VStack>
      <HStack bg="green.200" borderRadius=".3rem" p="1rem">
        <AiFillExclamationCircle />
        <Text textAlign="center" fontFamily="inter" fontSize=".9rem">
          Print the document and make sure to have the stamp in the office for
          certified true copy.
        </Text>
      </HStack>
      <Button
        bg="palette.secondary"
        color="palette.primary"
        _hover={{ bg: "palette.secondary_hover" }}
        onClick={() => navigate("/")}
      >
        Back to home
      </Button>
    </Center>
  );
}

export default DownloadDocumentNotice;
