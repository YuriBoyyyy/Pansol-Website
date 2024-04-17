import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../app-service/firebase-config";
import NoImage from "../../../../assets/noimage.jpg";
import AddDocument from "../../../../utils/firebase-functions/AddDocument";

interface PopulatedComplaintsData {
  date: Timestamp;
  complaint: string;
  supporting_image?: string;
  username: string;
  status: string;
  uid: string;
}

interface PopulatedComplaintsModel {
  complaintsData: PopulatedComplaintsData;
  id: string;
}
interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: PopulatedComplaintsModel;
}

function ComplaintDetailsModal(props: ComProps) {
  const { isOpen, onClose, complaint } = props;
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const markForReview = async () => {
    setIsSubmitting(true);
    const docRef = doc(db, "complaints", complaint.id);
    await updateDoc(docRef, { status: "Reviewing" })
      .then((res) => {
        const sendNotif = async () => {
          const data = {
            complaint_id: complaint.id,
            message: `Great News! Your Complaint is now being reviewed by the officials`,
            to_uid: complaint.complaintsData.uid,
            status: "Approved",
            date: Timestamp.fromDate(new Date()),
            seen: false,
          };

          await AddDocument("notifications", data)
            .then(() => {
              setIsSubmitting(false);
              onClose();
              toast({
                title: "Marked.",
                description:
                  "We also notified the user that the complaint is under review.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
              console.log(res);
            })
            .catch((err) => {
              setIsSubmitting(false);
              console.log(err);
            });
        };
        sendNotif();
        console.log(res);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

  const sendMessage = () => {
    navigate(`/manage-messages/${complaint.complaintsData.uid}`);
  };

  return (
    <Modal
      size="lg"
      isCentered
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack paddingBlockEnd="1rem">
            <Avatar size="sm" />
            <VStack align="start" spacing="0">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="normal"
              >{`Complaint by ${complaint.complaintsData.username}`}</Text>
              <Text
                fontSize=".7rem"
                fontFamily="inter"
                color="#FF6A55"
                fontWeight="medium"
              >
                {moment(complaint.complaintsData.date.toDate()).fromNow()}
              </Text>
            </VStack>
          </HStack>
          <Box w="100%">
            <Image
              w="100%"
              src={complaint.complaintsData.supporting_image || NoImage}
            />
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{complaint.complaintsData.complaint}</ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button fontFamily="inter" p="1.5rem" onClick={sendMessage}>
            Send Message
          </Button>
          {complaint.complaintsData.status === "Unmanaged" ? (
            <Button
              fontFamily="inter"
              p="1.5rem"
              _hover={{ opacity: 0.9 }}
              bg="#FF6A55"
              color="white"
              onClick={markForReview}
              isLoading={isSubmitting}
              loadingText="Marking..."
            >
              Mark for Review
            </Button>
          ) : (
            <Text
              fontFamily="inter"
              borderRadius=".3rem"
              w="fit-content"
              p=".5rem"
              bg="#FAD1CC"
              fontSize=".9rem"
              fontWeight="medium"
              color="#FF6A55"
            >
              Marked for Review
            </Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ComplaintDetailsModal;
