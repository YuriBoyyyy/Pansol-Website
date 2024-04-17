import {
  Box,
  Button,
  Center,
  Flex,
  Highlight,
  HStack,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { BiDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TbArrowBackUp } from "react-icons/tb";
import { db, storage } from "../../app-service/firebase-config";
import useObserver from "../../hooks/useObserver";
import AddDocument from "../../utils/firebase-functions/AddDocument";
import breakPoints from "../../utils/interfaces/Breakpoints";
import { useAuth } from "../../context/AuthContext";
import CreateTutorial from "../../components/others/CreateTutorial";

function FileComplaints() {
  const { ref: eRef } = useObserver("Home");
  const navigate = useNavigate();
  const firebaseAuth = useAuth();

  const fileTypes = ["JPG", "PNG"];
  const [file, setFile] = useState<File | null>(null);
  const [complaint, setComplaint] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleChange = (file: File) => {
    setFile(file);
    console.log(file);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!complaint) {
      setIsSubmitting(false);
      setError("Please follow the instruction and complete the requirements.");
      return;
    }

    let data = {
      complaint,
      supporting_image: "",
      uid: firebaseAuth?.currentUser?.uid,
      date: Timestamp.fromDate(new Date()),
      status: "Unmanaged",
    };

    if (file) {
      const storageRef = ref(storage, `complaints/${file?.name}`);
      await uploadBytes(storageRef, file as Blob)
        .then((res) => {
          console.log(res);
          getDownloadURL(res.ref).then((url) => {
            data = {
              complaint,
              supporting_image: url,
              uid: firebaseAuth?.currentUser?.uid,
              date: Timestamp.fromDate(new Date()),
              status: "Unmanaged",
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const conversationData = {
      sender_info: {
        username: firebaseAuth?.currentUser?.username,
        avatar: firebaseAuth?.currentUser?.photoURL,
        email: firebaseAuth?.currentUser?.email,
      },
      latest_message: "New Conversation Added.",
      receiver: "admin",
      seen: false,
      date: Timestamp.fromDate(new Date()),
    };
    let docRef;
    if (firebaseAuth?.currentUser?.uid) {
      docRef = doc(db, "conversations", firebaseAuth?.currentUser?.uid);
      await setDoc(docRef, conversationData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await AddDocument("complaints", data)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        navigate("../../success");
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });

    const adminCollectionRef = collection(db, "admin-notifications");
    await addDoc(adminCollectionRef, {
      seen: false,
      uid: firebaseAuth?.currentUser?.uid,
      date: Timestamp.fromDate(new Date()),
      message: "someone scheduled an filed a complaint.",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  const steps = [
    {
      selector: "",
      content:
        "So what do we have here? Let me show you how this works real quick!",
    },
    {
      selector: ".complaint-input",
      content:
        "This is where you input your complaint. Remember, still be respectful, the officials will look into it.",
    },
    {
      selector: ".complaint-drag-drop",
      content:
        "If you have a supporting image to support your complaint, you can drag it here.",
    },
    {
      selector: ".complaint-send-btn",
      content:
        "Last step, just click this button and the officials will receive your complaint. Easy as that!",
    },
  ];

  return (
    <Box paddingBlockStart="8rem" ref={eRef}>
      <Box w={breakPoints} margin="auto">
        <HStack
          marginBottom="2rem"
          cursor="pointer"
          onClick={() => navigate("../../")}
          paddingTop="1.2rem"
          w="fit-content"
        >
          <Box>
            <TbArrowBackUp />
          </Box>
          <Text fontFamily="inter">Back</Text>
        </HStack>
      </Box>
      <Stack
        justify="space-between"
        w={breakPoints}
        margin="auto"
        paddingBlockEnd="2rem"
        // RESPONSIVE ELEMENTS
        spacing={{ base: "2rem", md: 0 }}
        direction={{ base: "column", md: "row" }}
      >
        <VStack align="start" spacing={0}>
          <Text fontFamily="inter" fontSize="2.5rem" fontWeight="bold">
            <Highlight
              query="Complaints."
              styles={{ color: "palette.secondary" }}
            >
              File Complaints.
            </Highlight>
          </Text>
          <Text fontWeight="light">Let your voice be heard.</Text>
        </VStack>
        <VStack
          fontFamily="inter"
          fontSize=".8rem"
          color="#8A8899"
          align="start"
        >
          <Text fontWeight="medium">Instructions:</Text>
          <Text>1. Write your complaints</Text>
          <Text>2. Attach supporting images</Text>
          <Text>3. Click the send button</Text>
        </VStack>
      </Stack>
      <Flex
        w={breakPoints}
        h="30rem"
        maxHeight="60rem"
        margin="auto"
        flexDir={{ base: "column", lg: "row" }}
        gap="1rem"
      >
        <Textarea
          className="complaint-input"
          flex={1}
          h="100%"
          fontFamily="inter"
          placeholder="How can we help you today?"
          p="1.6rem"
          w="100%"
          resize="none"
          focusBorderColor="#8F80E5"
          borderColor="#D9D7FF"
          _placeholder={{
            color: "#5C596E",
            opacity: ".6",
          }}
          onChange={(e) => setComplaint(e.target.value)}
        />
        <Center
          flex={1}
          sx={{
            label: {
              w: "100%",
              h: "100%",
            },
          }}
        >
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            hoverTitle={null}
            dropMessageStyle={{ display: "none" }}
          >
            <VStack
              className="complaint-drag-drop"
              borderRadius=".5rem"
              justify="center"
              bg="#E7E5F5"
              w="100%"
              h="100%"
              border="1px dashed #8A8899"
              transition="all .3s ease"
              _hover={{ bg: "#DDDBEA" }}
              cursor="pointer"
              p="2rem"
            >
              {file ? (
                <VStack opacity=".5">
                  <Image
                    w="10rem"
                    src={URL.createObjectURL(file)}
                    borderRadius=".5rem"
                  />
                  <Text textAlign="center" fontSize=".8rem">
                    {file.name}
                  </Text>
                </VStack>
              ) : (
                <>
                  <Text textAlign="center" color="#8A8899" fontFamily="inter">
                    Drag and drop files here, or click to browse
                  </Text>
                  <Box fontSize="3rem" color="#8A8899">
                    <BiDownload />
                  </Box>
                </>
              )}
            </VStack>
          </FileUploader>
        </Center>
      </Flex>
      <Box w={breakPoints} margin="auto" paddingBlockStart="1rem">
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
      </Box>
      <HStack justify="end" w={breakPoints} margin="auto" paddingBlock="2rem">
        <Button
          p="1.5em"
          transition="all .3s ease"
          _hover={{ bg: "#E2DEFD" }}
          bg="transparent"
          border="1px solid"
          borderColor="palette.secondary"
          color="palette.secondary"
          fontFamily="inter"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          className="complaint-send-btn"
          p="1.6em"
          _hover={{ bg: "palette.secondary_hover" }}
          bg="palette.secondary"
          color="palette.primary"
          fontFamily="inter"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Send Complaints
        </Button>
      </HStack>
      <CreateTutorial steps={steps} storageVariable="complaint-tutorial" />
    </Box>
  );
}

export default FileComplaints;
