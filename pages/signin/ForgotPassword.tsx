import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiHide, BiShow } from "react-icons/bi";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import useObserver from "../../hooks/useObserver";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../app-service/firebase-config";

function ForgotPassword() {
  const { ref } = useObserver("ForgotPassword");
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!email) {
      setError("Please enter your email.");
      setIsSubmitting(false);

      return;
    }

    await sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        navigate("/password-reset-notice");
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        if (err.message.includes("user-not-found")) {
          setError("User not found.");
        }
        if (err.message.includes("invalid-email")) {
          setError("Invalid Email.");
        }
      });
  };

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
          Forgot Password
        </Text>
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
        <VStack
          w="100%"
          spacing="1rem"
          transition="all .3s ease"
          paddingTop={error ? ".3rem" : "2rem"}
        >
          <Divider />
          <Input
            placeholder="Email"
            p="1.5rem"
            w="100%"
            focusBorderColor="#8F80E5"
            borderColor="#D9D7FF"
            _placeholder={{
              color: "#5C596E",
              opacity: ".6",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            w="100%"
            fontFamily="inter"
            bg="palette.secondary"
            color="palette.primary"
            p="1.5rem"
            _hover={{
              bg: "palette.secondary_hover",
            }}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Processing..."
          >
            Send Password Reset
          </Button>
        </VStack>
        <Divider paddingTop=".6rem" />
        <HStack spacing="1.5rem">
          <Text
            fontFamily="inter"
            color="palette.secondary"
            fontWeight="medium"
            fontSize=".9rem"
            cursor="pointer"
            onClick={() => navigate("/signIn")}
          >
            Sign in
          </Text>
          <Text
            fontFamily="inter"
            color="palette.secondary"
            fontWeight="medium"
            fontSize=".9rem"
            cursor="pointer"
            onClick={() => navigate("/signUp")}
          >
            Sign up
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
}

export default ForgotPassword;
