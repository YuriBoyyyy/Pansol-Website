import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import LetterTemplate from "../templates/LetterTemplate";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

function LetterFormModal(props: ComProps) {
  const { isOpen, onClose, documentName } = props;
  const [readyToDownload, setReadyToDownload] = useState<boolean>(false);
  const [requestToGenerate, setRequestToGenerate] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [purok, setPurok] = useState<string>("Beach A");
  const [reason, setReason] = useState<string>("Edukasyon");
  const [age, setAge] = useState<number>();
  const [contactNumber, setContactNumber] = useState<number>();

  useEffect(() => {
    if (firstName && lastName && middleName && reason && contactNumber && age) {
      setReadyToDownload(true);
    } else {
      setReadyToDownload(false);
      setRequestToGenerate(false);
    }
  }, [age, contactNumber, firstName, lastName, middleName, reason]);

  const handleDownload = () => {
    setContactNumber(undefined);
    setAge(undefined);
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setReason("");
    setPurok("");
    setReadyToDownload(false);
    setRequestToGenerate(false);
    onClose();
  };

  return (
    <Modal
      size="xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{documentName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <Input
              p="1.6rem"
              placeholder="First Name"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Middle Name"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Last Name"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              p="1.6rem"
              type="number"
              placeholder="Age"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value, 10))}
            />
            <Input
              p="1.6rem"
              type="number"
              placeholder="Contact Number"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={contactNumber}
              onChange={(e) => setContactNumber(parseInt(e.target.value, 10))}
            />
            <HStack w="100%" justifyContent="space-between">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="medium"
                opacity=".7"
              >
                Select Purok
              </Text>
              <Select
                defaultValue="Beach A"
                focusBorderColor="#887DCF"
                opacity=".7"
                w="12.5rem"
                fontSize=".9rem"
                value={purok}
                onChange={(e) => setPurok(e.target.value)}
              >
                <option value="Beach A">Beach A</option>
                <option value="Beach B">Beach B</option>
                <option value="Riverside A">Riverside A</option>
                <option value="Riverside B">Riverside B</option>
                <option value="Oriental A">Oriental A</option>
                <option value="Oriental B">Oriental B</option>
                <option value="Central">Central</option>
              </Select>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="medium"
                opacity=".7"
              >
                Select Reason for Obtaining
              </Text>
              <Select
                defaultValue="Beach A"
                focusBorderColor="#887DCF"
                opacity=".7"
                w="12.5rem"
                fontSize=".9rem"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="Beach A">Edukasyon</option>
                <option value="Beach B">Pang araw-araw na pamumuhay</option>
              </Select>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {readyToDownload && requestToGenerate ? (
            <PDFDownloadLink
              document={
                <LetterTemplate
                  age={age}
                  contactNumber={contactNumber}
                  firstName={firstName}
                  lastName={lastName}
                  middleName={middleName}
                  purok={purok}
                  reason={reason}
                />
              }
              fileName="letter.pdf"
            >
              {({ loading }) => (
                <Button
                  isLoading={loading}
                  loadingText="Generating"
                  _hover={{ bg: "palette.secondary_hover" }}
                  bg="palette.secondary"
                  color="white"
                  p="1.5rem"
                  onClick={handleDownload}
                >
                  Download Document
                </Button>
              )}
            </PDFDownloadLink>
          ) : (
            <Button
              bg="transparent"
              border="1px solid"
              borderColor="palette.secondary"
              color="palette.secondary"
              p="1.5rem"
              onClick={() => {
                if (!readyToDownload) {
                  return;
                }
                setRequestToGenerate(true);
              }}
              opacity={readyToDownload ? 1 : 0.5}
              cursor={readyToDownload ? "pointer" : "not-allowed"}
            >
              Generate Document
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LetterFormModal;
