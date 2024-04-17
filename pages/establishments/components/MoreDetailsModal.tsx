import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface MoreDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

function MoreDetailsModal(props: MoreDetailsProps) {
  const { isOpen, onClose } = props;
  return (
    <Modal
      size={{ base: "md", lg: "xl" }}
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Body</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MoreDetailsModal;
