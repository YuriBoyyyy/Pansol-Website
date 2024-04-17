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
  VStack,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";

interface EventData {
  date: string;
  date_posted: Timestamp;
  title: string;
  details: string;
  images: string[];
  banner: string;
}

interface EventModel {
  eventData: EventData;
  id: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: EventModel;
}

function EventDetailsModal(props: ComProps) {
  const { isOpen, onClose, eventDetails } = props;
  return (
    <Modal
      size={{ base: "md", md: "xl", lg: "2xl" }}
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
          <Button fontFamily="inter" fontSize=".9rem">
            View Event Images
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EventDetailsModal;
