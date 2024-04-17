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
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../app-service/firebase-config";

interface SamahanData {
  area_of_operation: string;
  logo: string;
  title: string;
  contact_number?: string;
  president?: string;
  office_address?: string;
}

interface SamahanModel {
  samahanData: SamahanData;
  id: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  samahan: SamahanModel;
}

function UpdateSamahanDetailsModal(props: ComProps) {
  const { isOpen, onClose, samahan } = props;

  const [president, setPresident] = useState<string>(
    samahan.samahanData.president || ""
  );
  const [contact, setContact] = useState<string>(
    samahan.samahanData.contact_number || ""
  );
  const [areaOfOperation, setAreaOfOperation] = useState<string>(
    samahan.samahanData.area_of_operation || ""
  );
  const [officeAddress, setOfficeAddress] = useState<string>(
    samahan.samahanData.office_address || ""
  );
  const [title, setTitle] = useState<string>(samahan.samahanData.title);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!title) {
      toast({
        title: "Incomplete Fields.",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsSubmitting(false);
      return;
    }

    const docRef = doc(db, "samahan", samahan.id);
    await updateDoc(docRef, {
      president,
      area_of_operation: areaOfOperation,
      contact_number: contact,
      office_address: officeAddress,
      title,
    })
      .then((res) => {
        console.log(res);
        toast({
          title: "Record Added.",
          description: "We've added the record for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsSubmitting(false);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        onClose();
      });
  };

  return (
    <Modal
      size="2xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Samahan Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <Input
              p="1.6rem"
              placeholder="Name of Samahan"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="President"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={president}
              onChange={(e) => setPresident(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Area of Operation"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={areaOfOperation}
              onChange={(e) => setAreaOfOperation(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Contact"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Office Address"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            _hover={{ opacity: 0.9 }}
            bg="#FF6A55"
            color="white"
            p="1.5rem"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Adding..."
          >
            Update Details
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateSamahanDetailsModal;
