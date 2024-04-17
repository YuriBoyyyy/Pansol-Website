import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Highlight,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  Query,
  query,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import LinesEllipsis from "react-lines-ellipsis";
import { db } from "../../../app-service/firebase-config";
import useObserver from "../../../hooks/useObserver";
import AddEventsModal from "../../components/AddEventsModal";
import DeleteEventModal from "./components/DeleteEventModal";
import EventDetailsModal from "./components/EventDetailsModal";
import UpdateEventsModal from "./components/UpdateEventModal";

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
function ManageEvents() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onClose: onUpdateModalClose,
    onOpen: onUpdateModalOpen,
  } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onOpen: onAddModalOpen,
  } = useDisclosure();
  const [selectedEventToUpdate, setSelectedEventToUpdate] =
    useState<EventModel | null>();
  const [selectedEvent, setSelectedEvent] = useState<EventModel>();
  const [selectedID, setSelectedID] = useState<string>("");
  const getNews = (): Promise<EventModel[]> => {
    const collectionRef: CollectionReference = collection(db, "events");
    const q: Query = query(collectionRef, orderBy("date_posted", "desc"));
    return new Promise((resolve) => {
      const data: EventModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            eventData: doc.data() as EventData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const { data: news, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: getNews,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "events");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      setSelectedEventToUpdate(null);
    }
  }, [isUpdateModalOpen]);

  const { ref } = useObserver("events");

  return (
    <Box p="2rem" ref={ref}>
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Posted Events
      </Text>
      <Box paddingBlockEnd="1.5rem">
        <Button
          fontFamily="inter"
          _hover={{ opacity: 0.9 }}
          bg="#FF6A55"
          color="white"
          onClick={onAddModalOpen}
        >
          Add Event
        </Button>
      </Box>
      <Wrap justify="start" p=".5rem" spacing=".8rem">
        {news?.map((item) => {
          return (
            <Flex
              p="1rem"
              bg="#FCFCFC"
              borderRadius=".5rem"
              // boxShadow="2px 2px 16px rgba(0, 0, 0, .1)"
              key={item.id}
              gap="1rem"
            >
              <VStack
                w="6rem"
                bg="#EBEBEB"
                justify="center"
                paddingBlock="1rem"
                paddingInline=".4rem"
                borderRadius=".3rem"
              >
                <Text
                  color="#FF6A55"
                  fontFamily="inter"
                  fontSize="2.5rem"
                  fontWeight="extrabold"
                >
                  {moment(item.eventData.date).format("DD")}
                </Text>
                <Divider borderBottomColor="#CCC9EA" />
                <Text
                  fontFamily="inter"
                  fontSize="1rem"
                  fontWeight="semibold"
                  color="#FF6A55"
                >
                  {moment(item.eventData.date).format("MMM")}
                </Text>
              </VStack>
              <VStack w="20rem" align="start" h="100%" justify="space-between">
                <VStack align="start">
                  <Text
                    color="#554E76"
                    fontFamily="inter"
                    fontSize="1.1rem"
                    fontWeight="semibold"
                  >
                    {item.eventData.title}
                  </Text>
                  <Text fontWeight="light" fontSize=".9rem">
                    <LinesEllipsis
                      text={item.eventData.details}
                      maxLine="3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </Text>
                </VStack>
                <HStack w="100%" justify="space-between">
                  <Center borderRadius=".3rem" p=".6rem">
                    <Text
                      fontSize=".7rem"
                      fontFamily="inter"
                      fontWeight="medium"
                      color="#FF6A55"
                    >
                      <Highlight query="Time:" styles={{ color: "#626466" }}>
                        {`Time: ${moment(item.eventData.date).format("LT")}`}
                      </Highlight>
                    </Text>
                  </Center>
                  <HStack spacing="1rem">
                    <HStack
                      fontFamily="inter"
                      color="palette.tertiary"
                      cursor="pointer"
                      fontSize=".8rem"
                      fontWeight="normal"
                      opacity=".8"
                      onClick={() => {
                        setSelectedEvent(item);
                        onOpen();
                      }}
                    >
                      <Box>
                        <BiDetail />
                      </Box>
                      <Text>More Details</Text>
                    </HStack>
                    <Popover placement="right-end">
                      <PopoverTrigger>
                        <Button fontSize=".8rem" fontFamily="inter">
                          Manage
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader border="none">
                          <Text fontFamily="inter">
                            What do you want to do?
                          </Text>
                        </PopoverHeader>
                        <PopoverBody>
                          <HStack justify="start">
                            <Button
                              fontSize=".8rem"
                              fontFamily="inter"
                              bg="green.200"
                              color="green.800"
                              _hover={{ opacity: 0.9 }}
                              onClick={() => {
                                setSelectedEventToUpdate(item);
                                onUpdateModalOpen();
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              fontSize=".8rem"
                              fontFamily="inter"
                              bg="red.200"
                              color="red.800"
                              _hover={{ opacity: 0.9 }}
                              onClick={() => {
                                setSelectedID(item.id);
                                onDeleteModalOpen();
                              }}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </HStack>
              </VStack>
            </Flex>
          );
        })}
      </Wrap>
      {selectedEvent ? (
        <EventDetailsModal
          eventDetails={selectedEvent}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}

      {selectedID ? (
        <DeleteEventModal
          eventID={selectedID}
          onClose={onDeleteModalClose}
          isOpen={isDeleteModalOpen}
        />
      ) : null}

      {selectedEventToUpdate ? (
        <UpdateEventsModal
          eventData={selectedEventToUpdate}
          onClose={onUpdateModalClose}
          isOpen={isUpdateModalOpen}
        />
      ) : null}
      <AddEventsModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </Box>
  );
}

export default ManageEvents;
