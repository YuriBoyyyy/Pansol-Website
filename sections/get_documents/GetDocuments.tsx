import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import Indigency from "../../assets/documents.webp";
import Endorsement from "../../assets/files.webp";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import DocumentAnimation from "../../assets/documentAnimation.json";

import BarangayClearanceForBusinessDoc from "../../assets/documents/Baragay-Clearance-Business.pdf";
import Letter from "../../assets/documents/Letter.pdf";
import BarangayClearance from "../../assets/documents/Barangay-Clearance.pdf";
import BarangayPermit from "../../assets/documents/Barangay-Permit.pdf";
import LetterOfIndigency from "../../assets/documents/Letter-of-indigency.pdf";
import Residency from "../../assets/documents/Residency.pdf";
import LetterFormModal from "./modals/LetterFormModal";
import LetterTemplate from "./templates/LetterTemplate";
import ResidencyFormModal from "./modals/ResidencyFormModal";
import IndigencyFormModal from "./modals/IndigencyFormModal";
import ClearanceFormModal from "./modals/ClearanceFormModal";
import PermitTemplate from "./templates/PermitTemplate";
import PermitFormModal from "./modals/PermitModal";

import BarangayClearanceForBusiness from "../../assets/documents/images/BarangayClearanceForBusiness.png";
import IndigencyImage from "../../assets/documents/images/brgy-indigency.webp";
import ResidencyImage from "../../assets/documents/images/residency.webp";
import ClearanceImage from "../../assets/documents/images/brgy-clearance.webp";
import LetterImage from "../../assets/documents/images/letter (1).webp";
import PermitImage from "../../assets/documents/images/brgy-permit.webp";
import IndigencyTemplate from "./templates/IndigencyTemplate";
import CreateTutorial from "../../components/others/CreateTutorial";

function GetDocuments() {
  const { ref } = useObserver("Home");
  const navigate = useNavigate();

  const availableDocuments = [
    { document: "Letter", file: Letter, price: "Free", image: LetterImage },
    {
      document: "Certificate of Indigency",
      file: LetterOfIndigency,
      price: "Free",
      image: IndigencyImage,
    },
    {
      document: "Residency",
      file: Residency,
      price: "Free",
      image: ResidencyImage,
    },
    {
      document: "Barangay Permit",
      file: BarangayPermit,
      price: "₱100",
      image: PermitImage,
    },
    {
      document: "Barangay Clearance",
      file: BarangayClearance,
      price: "₱50",
      image: ClearanceImage,
    },
    {
      document: "Barangay Clearance for Business",
      file: BarangayClearanceForBusinessDoc,
      price: "₱50",
      image: BarangayClearanceForBusiness,
    },
  ];

  const {
    isOpen: isLetterFormOpen,
    onClose: onLetterFormClose,
    onOpen: onLetterFormOpen,
  } = useDisclosure();

  const {
    isOpen: isResidencyFormOpen,
    onClose: onResidencyFormClose,
    onOpen: onResidencyFormOpen,
  } = useDisclosure();

  const {
    isOpen: isIndigencyFormOpen,
    onClose: onIndigencyFormClose,
    onOpen: onIndigencyFormOpen,
  } = useDisclosure();

  const {
    isOpen: isClearanceFormOpen,
    onClose: onClearanceFormClose,
    onOpen: onClearanceFormOpen,
  } = useDisclosure();

  const {
    isOpen: isPermitFormOpen,
    onClose: onPermitFormClose,
    onOpen: onPermitFormOpen,
  } = useDisclosure();

  const handleClick = (selectedDocument: string) => {
    switch (selectedDocument) {
      case "Letter":
        onLetterFormOpen();
        break;
      case "Residency":
        onResidencyFormOpen();
        break;
      case "Certificate of Indigency":
        onIndigencyFormOpen();
        break;
      case "Barangay Clearance":
        onClearanceFormOpen();
        break;
      case "Barangay Permit":
        onPermitFormOpen();
        break;
    }
  };

  const steps = [
    {
      selector: "",
      content:
        "We've got plenty of available documents here. Let me do a quick tutorial of how to do this.",
    },
    {
      selector: ".document-price",
      content:
        "These indicates the price of the Document. This one if Free! Isn't that great? But we've got paid ones too.",
    },
    {
      selector: ".document-left-btn",
      content:
        "Click this button if you want to download the blank form and print it to fill it out yourself.",
    },
    {
      selector: ".document-right-btn",
      content:
        "Or you can also click this button to fill out online and it will let you download the document with the information that you input.",
    },
  ];

  return (
    <Center
      w={breakPoints}
      margin="auto"
      ref={ref}
      paddingBlockStart="10rem"
      flexDir="column"
      gap="3rem"
    >
      <HStack w="100%" justifyContent="space-between">
        <HStack
          marginBottom="2rem"
          cursor="pointer"
          onClick={() => navigate("../../")}
          w="fit-content"
          alignSelf="start"
        >
          <Box>
            <TbArrowBackUp />
          </Box>
          <Text fontFamily="inter">Back</Text>
        </HStack>
        <VStack
          fontFamily="inter"
          fontSize=".8rem"
          color="#8A8899"
          align="start"
          w="30%"
        >
          <Text fontWeight="medium">Instructions:</Text>
          <Text>
            1. If you download a blank form, schedule an appointment to get your
            document stamped with a dry seal and to make payment (if needed) .
          </Text>
          <Text>
            2. If you fill out online, schedule an appointment and attached your
            document to get your document stamped with a dry seal and to make
            payments (if needed)
          </Text>
        </VStack>
      </HStack>
      {/* <PDFViewer style={{ width: "40rem", height: "50rem" }}>
        <IndigencyTemplate />
      </PDFViewer> */}
      <Heading fontSize="1.5rem" opacity=".6" textAlign="center">
        Choose the document that you need.
      </Heading>
      <Wrap p="1rem" justify="center" spacing="2rem">
        {availableDocuments.map((item) => {
          return (
            <VStack
              key={item.document}
              borderRadius=".3rem"
              p="1.2rem"
              bg="#F6F5FF"
              w="22rem"
              pos="relative"
              spacing="1rem"
              boxShadow="2px 2px 16px rgba(0, 0, 0, .1)"
            >
              <Center
                className="document-price"
                bg="palette.accent"
                p=".6rem"
                w="3rem"
                h="3rem"
                borderRadius="5rem"
                pos="absolute"
                top="-1rem"
                right="-1rem"
                fontWeight="semibold"
                fontFamily="inter"
                fontSize=".9rem"
              >
                {item.price}
              </Center>
              <Flex
                h="25rem"
                justifyContent="center"
                alignItems="center"
                pos="relative"
              >
                {/* <Lottie
                  loop
                  animationData={DocumentAnimation}
                  play
                  style={{ width: "100%", height: "100%", opacity: 0.5 }}
                /> */}
                <Image
                  src={item.image}
                  w="100%"
                  objectFit="cover"
                  opacity=".1"
                  objectPosition="center"
                />

                <Text
                  fontFamily="inter"
                  fontSize="1.3rem"
                  fontWeight="extrabold"
                  pos="absolute"
                  color="palette.tertiary"
                  textAlign="center"
                >
                  {item.document}
                </Text>
              </Flex>
              <HStack w="100%" justify="space-between">
                <Button
                  className="document-left-btn"
                  bg="transparent"
                  border="1px solid"
                  borderColor="palette.secondary"
                  color="palette.secondary"
                  fontFamily="inter"
                  fontSize=".8rem"
                  as="a"
                  href={item.file}
                  download
                >
                  Download Blank Form
                </Button>
                <Button
                  className="document-right-btn"
                  bg="palette.secondary"
                  color="palette.primary"
                  fontFamily="inter"
                  fontSize=".8rem"
                  onClick={() => handleClick(item.document)}
                  _hover={{ bg: "palette.secondary_hover" }}
                >
                  Fill Out Online
                </Button>
              </HStack>
            </VStack>
          );
        })}
      </Wrap>
      <LetterFormModal
        isOpen={isLetterFormOpen}
        onClose={onLetterFormClose}
        documentName="Letter"
      />
      <ResidencyFormModal
        isOpen={isResidencyFormOpen}
        onClose={onResidencyFormClose}
        documentName="Certificate of Residency"
      />
      <IndigencyFormModal
        isOpen={isIndigencyFormOpen}
        onClose={onIndigencyFormClose}
        documentName="Certificate of Indigency"
      />

      <ClearanceFormModal
        isOpen={isClearanceFormOpen}
        onClose={onClearanceFormClose}
        documentName="Barangay Clearance"
      />

      <PermitFormModal
        isOpen={isPermitFormOpen}
        onClose={onPermitFormClose}
        documentName="Barangay Permit"
      />

      <CreateTutorial steps={steps} storageVariable="document-tutorial" />
    </Center>
  );
}

export default GetDocuments;
