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
import useObserver from "../../hooks/useObserver";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../app-service/firebase-config";

function SignIn() {
  const { ref } = useObserver("SignIn");
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (!email || !password) {
      setError("Please fill all the fields.");
      setIsSubmitting(false);

      return;
    }

    auth
      ?.signInUser(email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          setError("The email is not yet verified. Verify it first.");
          setIsSubmitting(false);
          return;
        }
        toast({
          title: "Signed in!",
          description: "You can now explore the community",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });

        setIsSubmitting(false);
        setPassword("");
        setEmail("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message.includes("invalid-email")) {
          setError("Invalid Email.");
        } else if (err.message.includes("weak-password")) {
          setError("Password should be at least 6 characters.");
        } else if (err.message.includes("user-not-found")) {
          setError("User not found.");
        } else if (err.message.includes("wrong-password")) {
          setError("Wrong Password.");
        } else if (err.message.includes("too-many-requests")) {
          setError(
            "Access to this account has been temporarily disabled due to many failed login attempts."
          );
        }
        setIsSubmitting(false);
      });
  };

  const handleGoogleSignIn = async () => {
    await auth
      ?.googleSignIn()
      .then((res) => {
        navigate("/");
        console.log(res.user.uid);
        const addUser = async () => {
          const docRef = doc(db, "users", res.user.uid);
          await setDoc(docRef, {
            email: res.user.email,
            username: res.user.displayName,
            profile: {
              age: "",
              first_name: "",
              last_name: "",
              middle_name: "",
              gender: "",
            },
            avatar: res.user.photoURL,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        addUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFacebookSignIn = async () => {
    await auth
      ?.facebookSignIn()
      .then((res) => {
        navigate("/");
        console.log(res.user.uid);
        const addUser = async () => {
          const docRef = doc(db, "users", res.user.uid);
          await setDoc(docRef, {
            email: res.user.email,
            username: res.user.displayName,
            profile: {
              age: "",
              first_name: "",
              last_name: "",
              middle_name: "",
              gender: "",
            },
            avatar: res.user.photoURL,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        addUser();
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message.includes("account-exists-with-different-credential")) {
          toast({
            title: "Email Conflict error!",
            description:
              "The email used to this facebook account is already registered. Try signing in with google instead.",
            status: "error",
            duration: 10000,
            isClosable: true,
            position: "bottom-right",
          });
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
          Sign in
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
        <VStack
          w="100%"
          spacing="1rem"
          transition="all .3s ease"
          paddingTop={error ? ".3rem" : "2rem"}
        >
          <HStack w="100%" justify="space-between" paddingBlockEnd="1rem">
            <Button
              color="white"
              bg="#4970FD"
              borderRadius=".25rem"
              fontSize=".8rem"
              fontFamily="inter"
              _hover={{
                bg: "#456CF4",
              }}
              p="1.5rem"
              leftIcon={<AiOutlineGoogle style={{ fontSize: "1.5rem" }} />}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
            <Button
              p="1.5rem"
              color="white"
              bg="#374E9E"
              borderRadius=".25rem"
              fontSize=".8rem"
              _hover={{
                bg: "#334893",
              }}
              fontFamily="inter"
              leftIcon={<FaFacebookF style={{ fontSize: "1.5rem" }} />}
              onClick={handleFacebookSignIn}
            >
              Sign in with Facebook
            </Button>
          </HStack>
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
          <InputGroup>
            <Input
              placeholder="Password"
              p="1.5rem"
              w="100%"
              focusBorderColor="#8F80E5"
              borderColor="#D9D7FF"
              _placeholder={{
                color: "#5C596E",
                opacity: ".6",
              }}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightAddon
              p="1.5rem 1rem"
              onClick={() => setShowPassword(!showPassword)}
              fontSize="1.2rem"
              bg="#E6E3FA"
              borderColor="#D9D7FF"
              color="#6553CA"
              borderLeft="none"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </InputRightAddon>
          </InputGroup>
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
            loadingText="Signing you in..."
          >
            Sign in
          </Button>
        </VStack>
        <Divider paddingTop=".6rem" />
        <HStack spacing="2.5rem">
          <Text
            fontFamily="inter"
            color="palette.secondary"
            fontWeight="medium"
            fontSize=".9rem"
            cursor="pointer"
            onClick={() => navigate("/signUp")}
          >
            Sign up instead?
          </Text>
          <Text
            fontFamily="inter"
            color="palette.secondary"
            fontWeight="medium"
            fontSize=".9rem"
            cursor="pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
}

export default SignIn;
