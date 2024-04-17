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

interface SpotsData {
  image: string[];
  description: string;
  name: string;
}

interface SpotsModel {
  spotsData: SpotsData;
  id: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spotsData: SpotsModel;
}

function SpotsInfoModal(props: Props) {
  const { spotsData, isOpen, onClose } = props;
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
        <ModalHeader p="1rem">{spotsData.spotsData.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="1rem">
          <VStack w="100%" align="start">
            <Image src={spotsData.spotsData.image[0]} />
            <Text>{spotsData.spotsData.description}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SpotsInfoModal;
