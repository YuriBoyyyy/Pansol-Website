import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useApp from "../../hooks/useApp";

function WelcomeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const appContext = useApp();

  useEffect(() => {
    if (appContext?.showMessageModal) {
      onOpen();
      appContext.setShowMessageModal(false);
    }
  }, [appContext, onOpen]);

  return (
    <Modal preserveScrollBarGap isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom="1rem">
          <Text>Welcome sa Palarong Pambata!</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WelcomeModal;
