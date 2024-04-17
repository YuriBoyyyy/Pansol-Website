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
import ResidencyTemplate from "../templates/ResidencyTemplate";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

function ResidencyFormModal(props: ComProps) {
  const { isOpen, onClose, documentName } = props;
  const [readyToDownload, setReadyToDownload] = useState<boolean>(false);
  const [requestToGenerate, setRequestToGenerate] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>();

  useEffect(() => {
    if (firstName && lastName && middleName && age) {
      setReadyToDownload(true);
    } else {
      setReadyToDownload(false);
      setRequestToGenerate(false);
    }
  }, [age, firstName, lastName, middleName]);

  const handleDownload = () => {
    setAge(undefined);
    setFirstName("");
    setMiddleName("");
    setLastName("");
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
          </VStack>
        </ModalBody>
        <ModalFooter>
          {readyToDownload && requestToGenerate ? (
            <PDFDownloadLink
              document={
                <ResidencyTemplate
                  age={age}
                  firstName={firstName}
                  lastName={lastName}
                  middleName={middleName}
                />
              }
              fileName={`${documentName}.pdf`}
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

export default ResidencyFormModal;
