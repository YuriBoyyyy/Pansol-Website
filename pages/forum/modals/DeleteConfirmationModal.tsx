import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../app-service/firebase-config";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  discussionID: string;
}

function DeleteConfirmationModal(props: DeleteModalProps) {
  const { isOpen, onClose, discussionID } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    const docRef = doc(db, "discussions", discussionID);
    await deleteDoc(docRef)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Modal
      size={{ base: "md", lg: "xl" }}
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this discussion?</ModalBody>
        <ModalFooter>
          <Button
            p="1.6rem"
            bg="red.500"
            color="palette.primary"
            _hover={{
              bg: "red.600",
            }}
            onClick={handleClick}
            isLoading={loading}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmationModal;
