import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import useObserver from "../../hooks/useObserver";

import SuccessAnimation from "../../assets/successAnimation.json";

function Success() {
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

export default Success;
