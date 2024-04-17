import React from "react";
import { Button, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function PasswordResetNotice() {
  const navigate = useNavigate();

  return (
    <Grid h="100vh" placeContent="center">
      <VStack w="65%" margin="auto" spacing="1rem">
        <HStack bg="green.200" borderRadius=".3rem" p="1rem">
          <AiFillExclamationCircle />
          <Text textAlign="center" fontFamily="inter" fontSize=".9rem">
            The instruction for email reset has been sent to your email address.
          </Text>
        </HStack>
        <Divider paddingBlock=".2rem" />
        <Button
          bg="palette.secondary"
          color="palette.primary"
          _hover={{ bg: "palette.secondary_hover" }}
          fontFamily="inter"
          onClick={() => navigate("/signIn")}
        >
          Back to sign in.
        </Button>
      </VStack>
    </Grid>
  );
}

export default PasswordResetNotice;
