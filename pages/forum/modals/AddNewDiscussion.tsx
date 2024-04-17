import {
  Box,
  Button,
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
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import AddDocument from "../../../utils/firebase-functions/AddDocument";
import { useAuth } from "../../../context/AuthContext";

interface AddDiscussionProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddNewDiscussion(props: AddDiscussionProps) {
  const { isOpen, onClose } = props;
  const [discussionInput, setDiscussionInput] = useState<string>("");
  const [subject, setSubject] = useState<string>("Random");
  const [loading, setLoading] = useState<boolean>(false);
  const firebaseAuth = useAuth();
  const toast = useToast();

  const handleClick = () => {
    setLoading(true);
    if (!discussionInput) {
      toast({
        title: "Missing Fields",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    const data = {
      user_id: firebaseAuth?.currentUser?.uid || "",
      discussion_title: discussionInput,
      date_posted: Timestamp.fromDate(new Date()),
      subject,
    };

    AddDocument("discussions", data)
      .then((res) => {
        setLoading(false);
        setDiscussionInput("");
        onClose();
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setDiscussionInput("");
        onClose();
        console.log(err);
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
        <ModalHeader>Add New Discussion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%" spacing="1rem">
            <Text fontFamily="inter" w="100%" fontSize=".9rem">
              What is the subject of your discussion?
            </Text>
            <Select
              onChange={(e) => setSubject(e.target.value)}
              focusBorderColor="#8F80E5"
              defaultValue="Random"
              fontFamily="inter"
              _placeholder={{
                color: "#5C596E",
                opacity: ".6",
              }}
            >
              <option value="Random">Random</option>
              <option value="Documents">Documents</option>
              <option value="Events">Events</option>
              <option value="News">News</option>
            </Select>
            <Input
              placeholder="What do you want to discuss?"
              p="1.6rem"
              w="100%"
              focusBorderColor="#8F80E5"
              borderColor="#D9D7FF"
              _placeholder={{
                color: "#5C596E",
                opacity: ".6",
              }}
              value={discussionInput}
              onChange={(e) => setDiscussionInput(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100%"
            p="1.6rem"
            bg="palette.secondary"
            color="palette.primary"
            _hover={{
              bg: "palette.secondary_hover",
            }}
            onClick={handleClick}
            isLoading={loading}
            loadingText="Posting..."
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddNewDiscussion;
