import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../app-service/firebase-config";

interface NewsData {
  date_posted: Timestamp;
  title: string;
  details: string;
}

interface NewsModel {
  newsData: NewsData;
  id: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  newsDetails: NewsModel;
}

function UpdateNewsModal(props: ComProps) {
  const { isOpen, onClose, newsDetails } = props;
  const [title, setTitle] = useState<string>(newsDetails.newsData.title);
  const [details, setDetails] = useState<string>(newsDetails.newsData.details);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleUpdate = async () => {
    setIsSubmitting(true);
    if (!title || !details) {
      toast({
        title: "Missing Fields",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsSubmitting(false);
      return;
    }

    const data = {
      title,
      details,
      date_posted: Timestamp.fromDate(new Date()),
    };

    const docRef = doc(db, "news", newsDetails.id);
    await updateDoc(docRef, data)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };
  return (
    <Modal
      size="xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update News</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <Input
              p="1.6rem"
              placeholder="Event Title"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              p="1.6rem"
              placeholder="Details"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              h="15rem"
              maxH="20rem"
              minH="10rem"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            _hover={{ opacity: 0.9 }}
            bg="#FF6A55"
            color="white"
            p="1.5rem"
            onClick={handleUpdate}
            isLoading={isSubmitting}
            loadingText="Updating..."
          >
            Update News
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateNewsModal;
