import {
  Button,
  Center,
  Highlight,
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
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import ImageViewerComponent from "../../../components/others/ImageGallery";

interface EventData {
  date: string;
  date_posted: Timestamp;
  title: string;
  details: string;
  banner: string;
  images: string[];
}

interface EventModel {
  eventData: EventData;
  id: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  setIsViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventDetails: EventModel;
}

function MoreDetailsModal(props: ComProps) {
  const { isOpen, onClose, eventDetails, setIsViewerOpen } = props;
  const toast = useToast();
  const handleOpen = () => {
    if (eventDetails.eventData.images.length < 1) {
      toast({
        title: "No Images.",
        description:
          "This event doesn't have any attached images yet. Wait until Pansol added one.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsViewerOpen(true);
    onClose();
  };
  return (
    <Modal
      size={{ base: "md", lg: "2xl" }}
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack spacing="1rem" w="100%" align="start">
            <HStack spacing="1rem">
              <Center bg="palette.tertiary" borderRadius=".3rem" p=".6rem">
                <Text
                  fontSize=".7rem"
                  fontFamily="inter"
                  fontWeight="medium"
                  color="palette.primary"
                >
                  <Highlight query="Time:" styles={{ color: "palette.accent" }}>
                    {`Time: ${moment(eventDetails.eventData.date).format(
                      "LT"
                    )}`}
                  </Highlight>
                </Text>
              </Center>
              <Text
                fontSize=".8rem"
                fontFamily="inter"
                fontWeight="medium"
                color="palette.tertiary"
              >
                {moment(eventDetails.eventData.date).format("LL")}
              </Text>
            </HStack>
            <Text>{eventDetails.eventData.title}</Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Image w="100%" src={eventDetails.eventData.banner} />
            <Text paddingBlockEnd="1rem" fontWeight="light">
              {eventDetails.eventData.details}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleOpen}>View Event Pictures</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MoreDetailsModal;
