import { arrayRemove, doc, updateDoc, collection } from "firebase/firestore";

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../../../../app-service/firebase-config";

interface MemberData {
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: MemberData[];
  id: string;
}

function MembersModal(props: ComProps) {
  const { isOpen, onClose, memberName, id } = props;
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [selectedRemove, setSelectedRemove] = useState<number>();

  const handleRemove = async (memberToRemove: MemberData) => {
    setIsRemoving(true);
    const docRef = doc(db, "samahan", id);
    await updateDoc(docRef, {
      member: arrayRemove(memberToRemove),
    })
      .then((res) => {
        setIsRemoving(false);
        console.log(res);
      })
      .catch((err) => {
        setIsRemoving(false);
        console.log(err);
      });
  };

  return (
    <Modal
      size="2xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Members</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom="1rem">
          <VStack w="100%">
            {memberName?.map((member, index) => {
              return (
                <HStack key={member.last_name} w="100%" justify="space-between">
                  <Text>{`${member.last_name}, ${member.first_name} ${member.middle_name}`}</Text>
                  <Button
                    color="white"
                    fontFamily="inter"
                    _hover={{
                      bg: "red.600",
                    }}
                    bg="red.500"
                    isLoading={selectedRemove === index && isRemoving}
                    loadingText="Removing..."
                    onClick={() => {
                      setSelectedRemove(index);
                      handleRemove(member);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              );
            })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MembersModal;
