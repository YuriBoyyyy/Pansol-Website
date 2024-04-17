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
  useToast,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../app-service/firebase-config";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  docRef: string;
}

function DeleteConfirmation(props: ModalProps) {
  const { isOpen, onClose, docRef } = props;
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // DELETE RESIDENT RECORD
  const deleteRecord = async () => {
    setIsDeleting(true);
    await deleteDoc(doc(db, "residents", docRef))
      .then((res) => {
        console.log(res);
        toast({
          title: "Record Deleted.",
          description: "We've deleted the record for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsDeleting(false);
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Error.",
          description: "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsDeleting(false);
        onClose();
      });
  };
  return (
    <Modal isCentered preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Please confirm if you really want to delete this record.</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            p="1.5rem"
            bg="red.500"
            color="white"
            onClick={deleteRecord}
            _hover={{
              opacity: 0.9,
            }}
            isLoading={isDeleting}
            loadingText="Deleting..."
          >
            Confirm Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmation;
