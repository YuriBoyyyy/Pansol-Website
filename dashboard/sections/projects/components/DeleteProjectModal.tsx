import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../app-service/firebase-config";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  projectID: string;
}

function DeleteProjectModal(props: ComProps) {
  const { isOpen, onClose, projectID } = props;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const docRef = doc(db, "projects", projectID);
    await deleteDoc(docRef)
      .then((res) => {
        console.log(res);
        setIsDeleting(false);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setIsDeleting(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Do you really want to delete this project?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleDelete}
            loadingText="Deleting..."
            isLoading={isDeleting}
            bg="red.500"
            _hover={{ opacity: 0.9 }}
            color="white"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteProjectModal;
