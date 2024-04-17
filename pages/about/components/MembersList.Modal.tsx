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

interface MemberData {
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: MemberData[];
}

function MembersListModal(props: ComProps) {
  const { isOpen, onClose, memberName } = props;

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
            {memberName?.map((member) => {
              return (
                <HStack key={member.last_name} w="100%" justify="space-between">
                  <Text>{`${member.last_name}, ${member.first_name} ${member.middle_name}`}</Text>
                </HStack>
              );
            })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MembersListModal;
