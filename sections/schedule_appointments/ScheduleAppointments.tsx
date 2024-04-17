import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Highlight,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TbArrowBackUp, TbArrowsRandom } from "react-icons/tb";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FileUploader } from "react-drag-drop-files";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BiDownload } from "react-icons/bi";
import breakPoints from "../../utils/interfaces/Breakpoints";
import useObserver from "../../hooks/useObserver";
import { db, storage } from "../../app-service/firebase-config";
import { useAuth } from "../../context/AuthContext";
import CreateTutorial from "../../components/others/CreateTutorial";

function ScheduleAppointments() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const { ref: Cref } = useObserver("Home");
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const firebaseAuth = useAuth();
  const intentionList = [
    { category: "Documents", icon: <HiOutlineDocumentDuplicate /> },
    { category: "Other Matters", icon: <TbArrowsRandom /> },
  ];
  const fileTypes = ["JPG", "PNG", "PDF"];
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
    console.log(file);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!firstName || !lastName || !middleName || !date) {
      toast({
        title: "Incomplete Fields",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsSubmitting(false);
      return;
    }

    if (!selectedCategory) {
      toast({
        title: "No Category",
        description: "Please select a category of your appointment.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsSubmitting(false);
      return;
    }

    let appointmentData = {
      uid: firebaseAuth?.currentUser?.uid,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      date,
      document: "",
      document_type: "",
      subject: selectedCategory,
      additional_info: additionalInfo,
      status: "Unmanaged",
    };

    console.log(appointmentData);

    if (file) {
      const storageRef = ref(storage, `appointments/${file?.name}`);
      const snapshot = await uploadBytes(storageRef, file as Blob);
      const url = await getDownloadURL(snapshot.ref);
      appointmentData = {
        ...appointmentData,
        document: url,
        document_type: "pdf",
      };
    }

    const collectionRef = collection(db, "appointments");
    await addDoc(collectionRef, appointmentData)
      .then((res) => {
        console.log(res);
        console.log(appointmentData);
        toast({
          title: "Scheduled!",
          description: "You have successfully scheduled an appointment",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        setIsSubmitting(false);
        navigate("/success");
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        setIsSubmitting(false);
        console.log(err);
      });
    const adminCollectionRef = collection(db, "admin-notifications");
    await addDoc(adminCollectionRef, {
      seen: false,
      uid: firebaseAuth?.currentUser?.uid,
      date: Timestamp.fromDate(new Date()),
      message: "someone scheduled an appointment.",
    });
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const steps = [
    {
      selector: "",
      content: "Let me help you schedule an appoinment.",
    },
    {
      selector: ".appointment-category",
      content:
        "First is you choose what is your appointment about. This gives the official an overview of what you want.",
    },
    {
      selector: ".appointment-name-input",
      content: "Input the details asked here.",
    },
    {
      selector: ".appointment-date-input",
      content: "Also don't forget to set the schedule.",
    },
    {
      selector: ".appointment-btn",
      content:
        "Click this and you're done! You just need to wait for the officials' approval.",
    },
  ];

  return (
    <Box paddingBlockStart="8rem" ref={Cref}>
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
        <Stack
          w="100%"
          justify="space-between"
          // RESPONSIVE ELEMENTS
          spacing={{ base: "2rem", md: 0 }}
          direction={{ base: "column", md: "row" }}
        >
          <VStack spacing={0} align="start">
            <Text
              fontFamily="inter"
              textAlign={{ base: "center", md: "start" }}
              fontSize={{ base: "2.2rem", md: "2.5rem" }}
              fontWeight="bold"
            >
              <Highlight
                query="Appointment."
                styles={{ color: "palette.secondary" }}
              >
                Schedule Appointment.
              </Highlight>
            </Text>
            <Text
              w="100%"
              textAlign={{ base: "center", md: "start" }}
              fontWeight="light"
            >
              Set your own schedule in your own time.
            </Text>
          </VStack>
          <VStack
            fontFamily="inter"
            fontSize=".8rem"
            color="#8A8899"
            align="start"
          >
            <Text fontWeight="medium">Instructions:</Text>
            <Text>1. Choose or write your appointment intention.</Text>
            <Text>2. Pick available date.</Text>
            <Text>3. Click the send button</Text>
          </VStack>
        </Stack>
        <Text
          marginBlock="6rem 2rem"
          fontSize="1.2rem"
          fontWeight="semibold"
          fontFamily="inter"
          opacity=".5"
          fontStyle="italic"
          textAlign={{ base: "center", xl: "start" }}
        >
          What is your appointment about?
        </Text>
        <Flex
          gap={{ base: "2rem", xl: "0" }}
          flexDir={{ base: "column", xl: "row" }}
          justifyContent="space-between"
        >
          <VStack
            flex={1}
            w="100%"
            gap="1.5rem"
            sx={{
              ".collapse": {
                w: "100%",
                h: "100%",
              },
            }}
            pos="relative"
            justify="center"
          >
            <Wrap
              justify={{ base: "center", xl: "start" }}
              w="100%"
              className="appointment-category"
            >
              {intentionList.map((item) => {
                return (
                  <WrapItem key={item.category}>
                    <Center
                      transition="all .3s ease-in-out"
                      borderRadius=".5rem"
                      w={isOpen ? "8rem" : "16rem"}
                      h={isOpen ? "5rem" : "13rem"}
                      cursor="pointer"
                      bgSize="cover"
                      bgPos="center"
                      bgRepeat="no-repeat"
                      _hover={{
                        bg: "palette.secondary_hover",
                      }}
                      onClick={() => {
                        setSelectedCategory(item.category);
                        if (selectedCategory === null) {
                          onToggle();
                        }
                      }}
                    >
                      <Center
                        borderRadius=".5rem"
                        border="1px solid rgba(0, 0, 0, .1)"
                        bg={
                          selectedCategory === item.category
                            ? "#D88509"
                            : "palette.secondary"
                        }
                        w="100%"
                        h="100%"
                        opacity=".85"
                        flexDir="column"
                        gap={selectedCategory === null ? "1rem" : "0"}
                      >
                        <Text
                          color="palette.primary"
                          fontWeight="medium"
                          fontSize={
                            selectedCategory === null ? "1rem" : ".8rem"
                          }
                        >
                          {item.category}
                        </Text>
                        <Box
                          fontSize={
                            selectedCategory === null ? "2rem" : "1.6rem"
                          }
                          color="palette.primary"
                        >
                          {item.icon}
                        </Box>
                      </Center>
                    </Center>
                  </WrapItem>
                );
              })}
            </Wrap>
            <Collapse in={isOpen} animateOpacity className="collapse">
              <Stack
                direction={{ base: "column", md: "row" }}
                flex={1}
                spacing="1rem"
                h="15rem"
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
                        <Text
                          textAlign="center"
                          color="#8A8899"
                          fontFamily="inter"
                        >
                          Drag and drop the document here, or click to browse
                        </Text>
                        <Box fontSize="3rem" color="#8A8899">
                          <BiDownload />
                        </Box>
                      </>
                    )}
                  </VStack>
                </FileUploader>
                <Textarea
                  w="100%"
                  h="100%"
                  fontFamily="inter"
                  placeholder="Please provide more information about your appointment."
                  p="1.6rem"
                  resize="none"
                  focusBorderColor="#8F80E5"
                  borderColor="#D9D7FF"
                  _placeholder={{
                    color: "#5C596E",
                    opacity: ".6",
                  }}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </Stack>
            </Collapse>
          </VStack>
          <Flex
            alignItems={{ base: "center", xl: "end" }}
            justifyContent="center"
            flex={1}
            borderRadius=".3rem"
            flexDir="column"
            gap="1.5rem"
          >
            <VStack
              w={{ base: "100%", lg: " 75%" }}
              spacing="1rem"
              className="appointment-name-input"
            >
              <Input
                placeholder="First Name"
                p="1.6rem"
                w="100%"
                focusBorderColor="#8F80E5"
                borderColor="#D9D7FF"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".6",
                }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                p="1.6rem"
                w="100%"
                focusBorderColor="#8F80E5"
                borderColor="#D9D7FF"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".6",
                }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                placeholder="Middle Name"
                p="1.6rem"
                w="100%"
                focusBorderColor="#8F80E5"
                borderColor="#D9D7FF"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".6",
                }}
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </VStack>
            <Input
              className="appointment-date-input"
              type="datetime-local"
              placeholder="Middle Name"
              p="1.6rem"
              focusBorderColor="#8F80E5"
              borderColor="#D9D7FF"
              _placeholder={{
                color: "#5C596E",
                opacity: ".6",
              }}
              w={{ base: "100%", lg: " 75%" }}
              min={tomorrow.toISOString().slice(0, 16)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Flex>
        </Flex>
        <HStack
          justify={{ base: "center", xl: "end" }}
          margin="auto"
          paddingBlockStart="3rem"
        >
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
            className="appointment-btn"
            p="1.6em"
            _hover={{ bg: "palette.secondary_hover" }}
            bg="palette.secondary"
            color="palette.primary"
            fontFamily="inter"
            isLoading={isSubmitting}
            loadingText="Scheduling..."
            onClick={handleSubmit}
          >
            Schedule Appointment
          </Button>
        </HStack>
      </Box>
      <CreateTutorial steps={steps} storageVariable="appointment-tutorial" />
    </Box>
  );
}

export default ScheduleAppointments;
