import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useObserver from "../../hooks/useObserver";
import { useAuth } from "../../context/AuthContext";
import StepOne from "./components/StepOne";

function SignUp() {
  const { ref } = useObserver("SignUp");

  const navigate = useNavigate();

  const [currentStep, setCurrenStep] = useState<number>(0);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <Center paddingBlockStart="15rem" ref={ref}>
      <VStack
        w={{ base: "25rem", md: "28rem" }}
        p="1.5rem"
        bg="#F4F3FF"
        borderRadius=".5rem"
        boxShadow="5px 5px 16px rgba(0, 0, 0, .1)"
      >
        <Text fontFamily="inter" fontWeight="semibold" fontSize="1.5rem">
          Sign up
        </Text>
        <Divider />
        <AnimatePresence>
          {error ? (
            <Center
              bg="red.300"
              w="100%"
              p=".8rem"
              borderRadius=".3rem"
              as={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, y: 0, transition: { duration: 0.2 } }}
              color="palette.primary"
              fontWeight="inter"
              fontSize=".9rem"
              fontFamily="inter"
              textAlign="center"
            >
              {error}
            </Center>
          ) : null}
        </AnimatePresence>
        <Divider />
        <StepOne
          key="step-one"
          error={error}
          setError={setError}
          setCurrentStep={setCurrenStep}
        />
        ,
        <Divider paddingTop=".6rem" />
        <Text
          fontFamily="inter"
          color="palette.secondary"
          fontWeight="medium"
          fontSize=".9rem"
          cursor="pointer"
          onClick={() => navigate("/signIn")}
        >
          Sign in instead?
        </Text>
      </VStack>
    </Center>
  );
}

export default SignUp;
