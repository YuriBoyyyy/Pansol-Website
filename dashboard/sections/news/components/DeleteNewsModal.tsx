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
import { useState } from "react";
import { db } from "../../../../app-service/firebase-config";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  eventID: string;
}

function DeleteNewsModal(props: ComProps) {
  const { isOpen, onClose, eventID } = props;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const docRef = doc(db, "news", eventID);
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
          <Text>Do you really want to delete this news?</Text>
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

export default DeleteNewsModal;
