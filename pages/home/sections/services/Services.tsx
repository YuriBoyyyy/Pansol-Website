import { Box, Button, Flex, HStack, Input, Stack } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../../../components/others/SectionTitle";
import AddDocument from "../../../../utils/firebase-functions/AddDocument";
import breakPoints from "../../../../utils/interfaces/Breakpoints";
import ServicesList from "./components/ServicesList";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../app-service/firebase-config";

function Services() {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState<boolean>(false);
  const firebaseAuth = useAuth();
  const handleSubmit = async () => {
    if (!firebaseAuth?.currentUser) {
      navigate("/signIn-first");
    }
    setIsSending(true);
    if (!message) {
      setIsSending(false);
      return;
    }

    const conversationData = {
      sender_info: {
        username: firebaseAuth?.currentUser?.username,
        avatar: firebaseAuth?.currentUser?.photoURL,
        email: firebaseAuth?.currentUser?.email,
      },
      latest_message: message,
      receiver: "admin",
      seen: false,
      date: Timestamp.fromDate(new Date()),
    };

    const messageData = {
      sender: firebaseAuth?.currentUser?.uid,
      conversation_id: firebaseAuth?.currentUser?.uid,
      message,
      date: Timestamp.fromDate(new Date()),
    };

    const collectionRef = collection(db, "messages");
    let docRef: DocumentReference<DocumentData>;
    if (firebaseAuth?.currentUser?.uid) {
      docRef = doc(db, "conversations", firebaseAuth?.currentUser?.uid);
      await setDoc(docRef, conversationData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      await addDoc(collectionRef, messageData)
        .then((res) => {
          console.log(res);
          setMessage("");
          setIsSending(false);
        })
        .catch((err) => {
          console.log(err);
          setMessage("");
          setIsSending(false);
        });
    }
  };

  return (
    <Box
      bg="palette.primary"
      paddingBlockStart={{ base: "10rem", lg: "14rem", "2xl": "18rem" }}
    >
      <Flex w={breakPoints} margin="auto" flexDir="column">
        <Flex
          justifyContent="space-between"
          w="100%"
          paddingBlockEnd="8rem"
          // RESPONSIVE ELEMENTS
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "2.5rem", lg: "" }}
        >
          <SectionTitle title="Services." description="Making things easy." />
          <Stack
            w="100%"
            justify="end"
            spacing={{ base: "1rem", md: "1.5rem" }}
            direction={{ base: "column", md: "row" }}
          >
            <Input
              placeholder="Quick message..."
              p="1.6rem"
              w="100%"
              focusBorderColor="#8F80E5"
              borderColor="#D9D7FF"
              _placeholder={{
                color: "#5C596E",
                opacity: ".6",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              bg="palette.button_accent_bg"
              color="palette.primary"
              p="1.6rem"
              _hover={{ bg: "palette.button_accent_hover" }}
              onClick={handleSubmit}
              isLoading={isSending}
              loadingText="Sending..."
            >
              Send
            </Button>
          </Stack>
        </Flex>
        <ServicesList />
      </Flex>
    </Box>
  );
}

export default Services;
