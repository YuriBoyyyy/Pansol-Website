import { sendEmailVerification, updateProfile } from "firebase/auth";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch, useState } from "react";
import { BiShowAlt, BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import AddDocument from "../../../utils/firebase-functions/AddDocument";
import { db } from "../../../app-service/firebase-config";

interface StepOneProps {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function StepOne(props: StepOneProps) {
  const { error, setCurrentStep, setError } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (!email || !password || !confirmPassword) {
      setError("Please fill all the fields.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password do not match.");
      setIsSubmitting(false);
      return;
    }

    auth
      ?.signUpUser(email, password)
      .then(async (cred) => {
        await sendEmailVerification(cred.user);

        updateProfile(cred.user, {
          displayName: cred.user.email,
        });

        const userData = {
          email: cred.user.email,
          profile: {
            first_name: "",
            last_name: "",
            middle_name: "",
            gender: "",
            age: "",
          },
          username: cred.user.email,
          avatar: "",
        };

        await setDoc(doc(db, "users", cred.user.uid), userData).then(() => {
          setIsSubmitting(false);
          setConfirmPassword("");
          setPassword("");
          setEmail("");
          toast({
            title: "Account Created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          navigate("/email-verification-notice");
        });
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message.includes("invalid-email")) {
          setError("Invalid Email.");
        } else if (err.message.includes("weak-password")) {
          setError("Password should be at least 6 characters.");
        } else if (err.message.includes("email-already-in-use")) {
          setError("The email is already registered.");
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

  return (
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
          borderRight="none"
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
      <InputGroup>
        <Input
          placeholder="Confirm Password"
          p="1.5rem"
          w="100%"
          focusBorderColor="#8F80E5"
          borderColor="#D9D7FF"
          _placeholder={{
            color: "#5C596E",
            opacity: ".6",
          }}
          borderRight="none"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputRightAddon
          p="1.5rem 1rem"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          fontSize="1.2rem"
          bg="#E6E3FA"
          borderColor="#D9D7FF"
          color="#6553CA"
          borderLeft="none"
        >
          {showConfirmPassword ? <BiShow /> : <BiHide />}
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
        isLoading={isSubmitting}
        loadingText="Checking Details..."
        onClick={handleSubmit}
      >
        Next
      </Button>
    </VStack>
  );
}

export default StepOne;
