import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { BsCheckAll } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import Form from "../../assets/documents/images/Assistance Form.png";
import ApplicationForm from "../../assets/documents/application-form.pdf";
import CreateTutorial from "../../components/others/CreateTutorial";

function EducationalAssistance() {
  const { ref } = useObserver("Assistance");
  const navigate = useNavigate();

  const steps = [
    {
      selector: "",
      content:
        "I see that you're seeking to have an Educational Assistance. Let me help you.",
    },
    {
      selector: ".educational-assistance-btn",
      content:
        "This is the button to download the Application Form. Print it, and then fill it all out with your information.",
    },
    {
      selector: ".educational-assistance-instruction",
      content: "You can follow these sequences here. In 4 easy steps!",
    },
    {
      selector: ".educational-assistance-college",
      content: "These are the requirements for College Students. Take note.",
    },
    {
      selector: ".educational-assistance-highschool",
      content: "And these are the requirements for Highschool Students.",
    },
  ];

  return (
    <Box paddingBlockStart="8rem" ref={ref}>
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
        <Center paddingBottom="2.5rem">
          <Button
            className="educational-assistance-btn"
            color="palette.tertiary"
            bg="#FFA216"
            fontFamily="inter"
            p="1.6rem"
            as="a"
            href={ApplicationForm}
            download
            rightIcon={<AiOutlineDownload />}
            _hover={{}}
          >
            Download Application Form
          </Button>
        </Center>
        <Text
          textAlign="center"
          fontFamily="inter"
          opacity=".8"
          fontWeight="medium"
        >
          Instructions in 4 easy steps.
        </Text>
        <Wrap
          justify="center"
          spacing="2rem"
          p="1rem"
          className="educational-assistance-instruction"
        >
          <WrapItem>
            <Card w="15rem" h="15rem" bg="#F6F5FF" p="1.5rem">
              <VStack h="100%" justify="center" align="center">
                <Text
                  fontFamily="inter"
                  fontWeight="black"
                  fontSize="5rem"
                  opacity=".2"
                >
                  1
                </Text>
                <Text
                  fontFamily="inter"
                  fontWeight="semibold"
                  opacity=".6"
                  textAlign="center"
                >
                  Download the application form
                </Text>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card w="15rem" h="15rem" bg="#F6F5FF" p="1.5rem">
              <VStack h="100%" justify="center" align="center">
                <Text
                  fontFamily="inter"
                  fontWeight="black"
                  fontSize="5rem"
                  opacity=".2"
                >
                  2
                </Text>
                <Text
                  fontFamily="inter"
                  fontWeight="semibold"
                  opacity=".6"
                  textAlign="center"
                >
                  Fill and prepare your documents
                </Text>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card w="15rem" h="15rem" bg="#F6F5FF" p="1.5rem">
              <VStack h="100%" justify="center" align="center">
                <Text
                  fontFamily="inter"
                  fontWeight="black"
                  fontSize="5rem"
                  opacity=".2"
                >
                  3
                </Text>
                <Text
                  fontFamily="inter"
                  fontWeight="semibold"
                  opacity=".6"
                  textAlign="center"
                >
                  Schedule an appointment
                </Text>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card w="15rem" h="15rem" bg="#F6F5FF" p="1.5rem">
              <VStack h="100%" justify="center" align="center">
                <Text
                  fontFamily="inter"
                  fontWeight="black"
                  fontSize="5rem"
                  opacity=".2"
                >
                  4
                </Text>
                <Text
                  fontFamily="inter"
                  fontWeight="semibold"
                  opacity=".6"
                  fontSize=".9rem"
                  textAlign="center"
                >
                  Wait for the assessment and claiming of your Educational
                  Assistance
                </Text>
              </VStack>
            </Card>
          </WrapItem>
        </Wrap>
        <Divider paddingTop="3rem" />
        <Text
          paddingTop="2rem"
          fontWeight="bold"
          fontFamily="inter"
          fontSize="1.3rem"
          textAlign="center"
        >
          Requirements
        </Text>
        <Stack
          paddingTop="3rem"
          justify="center"
          align="center"
          spacing="2rem"
          direction={{ base: "column", md: "row" }}
        >
          <VStack
            w="35rem"
            spacing="2rem"
            bg="palette.secondary"
            p="2rem"
            h="25rem"
            borderRadius=".5rem"
            className="educational-assistance-college"
          >
            <Text
              fontFamily="inter"
              fontSize="1.2rem"
              fontWeight="semibold"
              color="palette.accent"
            >
              College Student
            </Text>
            <VStack color="palette.primary" align="start">
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>Accomplished application form with 2x2 picture.</Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>
                  Letter of intent addressed to the SK Chairman (handwritten)
                </Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text> Certificate of registration or COR.</Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>Certified true copy of grades (last semester).</Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>Photocopy of ID back-to-back.</Text>
              </HStack>
            </VStack>
          </VStack>
          <VStack
            w="30rem"
            h="25rem"
            spacing="2rem"
            bg="palette.secondary"
            p="2rem"
            borderRadius=".5rem"
            className="educational-assistance-highschool"
          >
            <Text
              fontFamily="inter"
              fontSize="1.2rem"
              fontWeight="semibold"
              color="palette.accent"
            >
              Senior Highschool Student
            </Text>
            <VStack color="palette.primary" align="start">
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>Accomplished application form with 2x2 picture.</Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>
                  Letter of intent addressed to the SK Chairman (handwritten)
                </Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>
                  Certificate of enrollment with sign of School
                  Head/Dean/Registrar.
                </Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>Summary of latest grades (last semester).</Text>
              </HStack>
              <HStack fontFamily="inter">
                <Box color="palette.accent">
                  <BsCheckAll />
                </Box>
                <Text>Photocopy of ID back-to-back.</Text>
              </HStack>
            </VStack>
          </VStack>
        </Stack>
      </Box>
      {/* <Button>Download Application Form</Button> */}
      <CreateTutorial
        steps={steps}
        storageVariable="educational-assistance-tutorial"
      />
    </Box>
  );
}

export default EducationalAssistance;
