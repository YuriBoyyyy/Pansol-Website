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
import IndigencyTemplate from "../templates/IndigencyTemplate";
import LetterTemplate from "../templates/LetterTemplate";
import PermitTemplate from "../templates/PermitTemplate";
import ResidencyTemplate from "../templates/ResidencyTemplate";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

function PermitFormModal(props: ComProps) {
  const { isOpen, onClose, documentName } = props;
  const [readyToDownload, setReadyToDownload] = useState<boolean>(false);
  const [requestToGenerate, setRequestToGenerate] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [structure, setStructure] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [distanceFromKapilya, setDistanceFromKapilya] = useState<string>("");
  const [distanceFromPaaralan, setDistanceFromPaaralan] = useState<string>("");
  const [distanceFromOthers, setDistanceFromOthers] = useState<string>("");
  const [distanceFromBahayNayon, setDistanceFromBahayNayon] =
    useState<string>("");

  useEffect(() => {
    if (
      fullName &&
      address &&
      structure &&
      location &&
      distanceFromBahayNayon &&
      distanceFromKapilya &&
      distanceFromPaaralan &&
      distanceFromOthers
    ) {
      setReadyToDownload(true);
    } else {
      setReadyToDownload(false);
      setRequestToGenerate(false);
    }
  }, [
    address,
    distanceFromBahayNayon,
    distanceFromKapilya,
    distanceFromOthers,
    distanceFromPaaralan,
    fullName,
    location,
    structure,
  ]);

  const handleDownload = () => {
    setFullName("");
    setAddress("");
    setLocation("");
    setStructure("");
    setDistanceFromBahayNayon("");
    setDistanceFromKapilya("");
    setDistanceFromPaaralan("");
    setDistanceFromOthers("");
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
              placeholder="Full Name"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Address"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Location"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Structure"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
            />
            <Text paddingBlock="1.5rem">
              Indicate the distance of the structure from the following:{" "}
            </Text>
            <Input
              p="1.6rem"
              placeholder="Bahay Nayon"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={distanceFromBahayNayon}
              onChange={(e) => setDistanceFromBahayNayon(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Kapilya"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={distanceFromKapilya}
              onChange={(e) => setDistanceFromKapilya(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Paaralan"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={distanceFromPaaralan}
              onChange={(e) => setDistanceFromPaaralan(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Others"
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={distanceFromOthers}
              onChange={(e) => setDistanceFromOthers(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          {readyToDownload && requestToGenerate ? (
            <PDFDownloadLink
              document={
                <PermitTemplate
                  fullName={fullName}
                  location={location}
                  address={address}
                  structure={structure}
                  bahayNayon={distanceFromBahayNayon}
                  kapilya={distanceFromKapilya}
                  paaralan={distanceFromPaaralan}
                  others={distanceFromOthers}
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

export default PermitFormModal;
