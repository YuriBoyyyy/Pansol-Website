import { Button, Grid, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useObserver from "../../hooks/useObserver";

function SigninFirst() {
  const navigate = useNavigate();
  const { ref } = useObserver("Sigin first");
  return (
    <Grid ref={ref} h="100vh" placeContent="center">
      <VStack spacing="1.5rem">
        <Text
          textAlign="center"
          fontSize={{ base: "1.1rem", md: "1.5rem" }}
          fontFamily="inter"
          fontWeight="medium"
        >
          Oppps! You need to sign in first to do this operation.
        </Text>
        <Button
          bg="palette.secondary"
          color="palette.primary"
          _hover={{ bg: "palette.secondary_hover" }}
          fontFamily="inter"
          onClick={() => navigate("/signIn")}
        >
          Go to sign in.
        </Button>
      </VStack>
    </Grid>
  );
}

export default SigninFirst;
