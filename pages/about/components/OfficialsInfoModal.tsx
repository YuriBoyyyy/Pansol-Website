import {
  Box,
  Highlight,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

interface OfficialsData {
  name: string;
  mobile_number: number;
  facebook: string;
  info: string;
  image: string;
  position: string;
  email: string;
  birthday: string;
}

interface OfficialModel {
  officialsData: OfficialsData;
  id: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  officialsData: OfficialModel;
}

function OfficialsInfoModal(props: Props) {
  const { officialsData, isOpen, onClose } = props;
  return (
    <Modal
      size="3xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p="1rem">{officialsData.officialsData.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="1rem">
          <VStack w="100%" align="start">
            <Text fontFamily="inter" color="purple.500" fontWeight="semibold">
              <Highlight
                query="Position:"
                styles={{ color: "palette.tertiary", fontWeight: "medium" }}
              >{`Position: ${officialsData.officialsData.position}`}</Highlight>
            </Text>
            <Text fontFamily="inter" color="purple.500" fontWeight="semibold">
              <Highlight
                query="Mobile Number:"
                styles={{ color: "palette.tertiary", fontWeight: "medium" }}
              >{`Mobile Number: ${
                officialsData.officialsData.mobile_number || "Not Provided"
              }`}</Highlight>
            </Text>
            <Text fontFamily="inter" color="purple.500" fontWeight="semibold">
              <Highlight
                query="Facebook:"
                styles={{ color: "palette.tertiary", fontWeight: "medium" }}
              >{`Facebook: ${
                officialsData.officialsData.facebook || "Not Provided"
              }`}</Highlight>
            </Text>
            <Text fontFamily="inter" color="purple.500" fontWeight="semibold">
              <Highlight
                query="Birthday:"
                styles={{ color: "palette.tertiary", fontWeight: "medium" }}
              >{`Birthday: ${
                officialsData.officialsData.birthday || "Not Provided"
              }`}</Highlight>
            </Text>
            {officialsData.officialsData.email ? (
              <Text fontFamily="inter" color="purple.500" fontWeight="semibold">
                <Highlight
                  query="Email:"
                  styles={{ color: "palette.tertiary", fontWeight: "medium" }}
                >{`Email: ${officialsData.officialsData.email}`}</Highlight>
              </Text>
            ) : null}
            <Image alignSelf="center" src={officialsData.officialsData.image} />
            <Text>{officialsData.officialsData.info}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default OfficialsInfoModal;
