import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function Notice(props: Props) {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();
  return (
    <Modal isCentered preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notice!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack bg="green.200" borderRadius=".3rem" p="1rem">
            <AiFillExclamationCircle />
            <Text textAlign="center" fontFamily="inter" fontSize=".9rem">
              Set an appointment and attached the document to get the stamp in
              the office for certified true copy.
            </Text>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="palette.secondary"
            color="palette.primary"
            _hover={{ bg: "palette.secondary_hover" }}
            onClick={() => navigate("/")}
          >
            Back to home
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Notice;
