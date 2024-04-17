import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "email-validator";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import FooterWave from "../../assets/waves/FooterWave";
import breakPoints from "../../utils/interfaces/Breakpoints";
import Logo from "../../assets/Logo.svg";
import FooterLinks from "./components/FooterLinks";
import CopyrightAndTerms from "./components/CopyrightAndTerms";
import Socials from "./components/Socials";
import Lopez from "../../assets/lopez.png";
import Pansol from "../../assets/Pansol.png";
import { db } from "../../app-service/firebase-config";

function Footer() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!email) {
      setIsSubmitting(false);
      return;
    }

    if (!validate(email)) {
      toast({
        title: "Not a valid email address.",
        description:
          "Please provide a valid email address so we can serve you better.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsSubmitting(false);
      return;
    }

    const mailData = {
      to: email,
      message: {
        subject: "Pansol Website Newsletter",
        html: `Hey there 👋
        <br/>
        Thank you for subscribing to our newsletter. We will inform you on the latest news and events in Pansol Lopez, Quezon.
        `,
      },
    };

    const subscriptionData = {
      date: Timestamp.fromDate(new Date()),
      email,
    };

    const collectionRef2 = collection(db, "subscribed-mails");
    const q = query(collectionRef2, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      const collectionRef = collection(db, "mail");
      await addDoc(collectionRef, mailData)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
      await addDoc(collectionRef2, subscriptionData)
        .then((res) => {
          setEmail("");
          setIsSubmitting(false);
          console.log(res);
        })
        .catch((err) => {
          setEmail("");
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      setIsSubmitting(false);
      toast({
        title: "Already Subscribed.",
        description:
          "Upon checking, this email is already subscribed to our newsletter",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Box marginTop="12rem">
      <FooterWave />
      <Box bg="palette.secondary">
        <VStack
          w={breakPoints}
          margin="auto"
          paddingBlockEnd="2.5rem"
          // RESPONSIVE ELEMENTS
          gap={{ base: "1.5rem", md: "2.5rem" }}
        >
          <Flex
            w="100%"
            justifyContent="space-between"
            // RESPONSIVE ELEMENTS
            flexDir={{ base: "column", lg: "row" }}
            gap={{ base: "2.5rem", md: "" }}
          >
            <VStack cursor="pointer" onClick={() => navigate("/")}>
              <HStack>
                <Image src={Pansol} w="4rem" />
                <Image src={Lopez} w="4rem" />
              </HStack>
              <Image src={Logo} w="8rem" />
            </VStack>
            <Stack
              spacing={{
                base: "1rem",
                md: "2rem",
              }}
              align="center"
              direction={{ base: "column", lg: "row" }}
            >
              <Input
                w={{ base: "100%", lg: "25rem" }}
                placeholder="Email Address..."
                p="1.5rem"
                bg="#3C2E8E"
                borderColor="#5F4FC7"
                _placeholder={{ color: "#D6D6D6" }}
                color="palette.primary"
                _focusVisible={{ borderColor: "#9A92CE" }}
                _hover={{ borderColor: "#9A92CE" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                p="1.5rem"
                w={{ base: "100%", lg: "fit-content" }}
                color="palette.secondary"
                // RESPONSIVE ELEMENTS
                fontSize={{ base: ".8rem", md: "1rem" }}
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Submitting..."
              >
                Get Informed
              </Button>
            </Stack>
          </Flex>
          <Flex
            w="100%"
            justifyContent="space-between"
            // RESPONSIVE ELEMENTS
            flexDir={{ base: "column", lg: "row" }}
            gap={{ base: "2.5rem", md: "" }}
          >
            <FooterLinks />
            <Stack align="center" direction={{ base: "column", lg: "row" }}>
              <Flex
                h="15rem"
                maxW="40rem"
                w={{ base: "100%", md: "30rem" }}
                minW="20rem"
                bg="#3C2E8E"
                borderRadius="1rem"
                justifyContent="center"
                alignItems="center"
                color="#8C85FF"
              >
                <VStack>
                  <Text
                    fontFamily="inter"
                    fontSize={{ base: ".9rem", md: "1rem" }}
                    fontWeight="semibold"
                  >
                    Lopez Quezon Emergency Hotlines:
                  </Text>
                  <Text
                    textAlign="center"
                    fontFamily="inter"
                    fontSize={{ base: ".8rem", md: ".8rem" }}
                    fontWeight="semibold"
                  >
                    MDRRMC Tel: 0909-341-0636 or (042) 717 4364
                  </Text>
                  <Text
                    textAlign="center"
                    fontFamily="inter"
                    fontSize={{ base: ".8rem", md: ".8rem" }}
                    fontWeight="semibold"
                  >
                    BFP:0930-327-1448 or (042) 717 4459
                  </Text>
                  <Text
                    textAlign="center"
                    fontFamily="inter"
                    fontSize={{ base: ".8rem", md: ".8rem" }}
                    fontWeight="semibold"
                  >
                    PNP: 0908-489-8918/ 0998-598-5758 or (042) 717 4459
                  </Text>
                  <Text
                    textAlign="center"
                    fontFamily="inter"
                    fontSize={{ base: ".8rem", md: ".8rem" }}
                    fontWeight="semibold"
                  >
                    OUEZELCO-I: 0908-215-8962
                  </Text>
                </VStack>
              </Flex>
              <Socials />
            </Stack>
          </Flex>
          <CopyrightAndTerms />
        </VStack>
      </Box>
    </Box>
  );
}

export default Footer;
