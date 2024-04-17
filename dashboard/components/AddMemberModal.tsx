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
import { db } from "../../app-service/firebase-config";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddMemberModal(props: ComProps) {
  const { isOpen, onClose } = props;

  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [samahan, setSamahan] = useState<string>("Coconut Farmers Association");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!firstName || !lastName) {
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

    const collectionRef = collection(db, "samahan");
    const q = query(collectionRef, where("title", "==", samahan));
    const snapshot = await getDocs(q);
    console.log(snapshot);

    const docRef = doc(db, "samahan", snapshot.docs[0].id);
    await updateDoc(docRef, {
      member: arrayUnion({
        first_name: firstName,
        middle_name: middleName || "",
        last_name: lastName,
      }),
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
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setSamahan("Coconut Farmers Association");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setSamahan("Coconut Farmers Association");
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
        <ModalHeader>Add New Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <HStack w="100%" justifyContent="space-between">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="medium"
                opacity=".7"
              >
                Select Samahan
              </Text>
              <Select
                defaultValue="Beach A"
                focusBorderColor="#FF9C8E"
                opacity=".7"
                w="50%"
                value={samahan}
                fontSize=".9rem"
                onChange={(e) => setSamahan(e.target.value)}
              >
                <option value="Coconut Farmers Association">
                  Coconut Farmers Association
                </option>
                <option value="Pansol Bound Line">Pansol Bound Line</option>
                <option value="Pansol Farmers Association">
                  Pansol Farmers Association
                </option>
                <option value="4K Kababaihan Kabalikatan Para sa Kapakanan at Kaunlaran ng  Bayan">
                  4K Kababaihan Kabalikatan Para sa Kapakanan at Kaunlaran ng
                  Bayan
                </option>
                <option value="Samahan ng mga Mangingisda">
                  Samahan ng mga Mangingisda
                </option>
                <option value="Senior Citizens Association">
                  Senior Citizens Association
                </option>
              </Select>
            </HStack>
            <Input
              p="1.6rem"
              placeholder="First Name"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Middle Name"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <Input
              p="1.6rem"
              placeholder="Last Name"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            Add Member
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddMemberModal;
