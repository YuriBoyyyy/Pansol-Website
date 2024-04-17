import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
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
import { db } from "../../../app-service/firebase-config";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import MoreDetailsModal from "./MoreDetailsModal";

interface EventData {
  date: string;
  date_posted: Timestamp;
  title: string;
  details: string;
  banner: string;
  images: [];
}

interface EventModel {
  eventData: EventData;
  id: string;
}

interface Props {
  setIsViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function HappeningNow(props: Props) {
  const { setIsViewerOpen } = props;
  const [selectedEvent, setSelectedEvent] = useState<EventModel>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const getNews = (): Promise<EventModel[]> => {
    const collectionRef: CollectionReference = collection(db, "events");
    const q: Query = query(collectionRef, orderBy("date", "desc"));
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

  const {
    data: events,
    refetch,
    isFetching,
  } = useQuery({
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

  return (
    <Center
      pos="absolute"
      bottom={{ xl: "-25rem", base: "-16rem" }}
      zIndex={2}
      w={breakPoints}
      margin="auto"
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      gap="1rem"
    >
      <Wrap justify="center">
        {events?.map((event) => {
          return new Date(event.eventData.date) === new Date() ? (
            <Skeleton isLoaded={!isFetching}>
              <WrapItem>
                <VStack
                  w="40rem"
                  boxShadow="4px 4px 16px rgba(0, 0, 0, .5)"
                  bg="palette.tertiary"
                  p="1.5rem"
                  borderRadius=".5rem"
                  spacing="1.5rem"
                >
                  <Flex w="100%" justifyContent="space-between">
                    <Text
                      color="palette.accent"
                      fontFamily="inter"
                      fontWeight="semibold"
                      fontSize="1.2rem"
                    >
                      Happening Today!
                    </Text>
                    <HStack
                      fontFamily="inter"
                      color="#7E72C9"
                      cursor="pointer"
                      fontSize=".9rem"
                      onClick={() => {
                        setSelectedEvent(event);
                        onOpen();
                      }}
                    >
                      <Box>
                        <BiDetail />
                      </Box>
                      <Text>More details</Text>
                    </HStack>
                  </Flex>
                  <Divider opacity=".1" />
                  <Flex w="100%">
                    <Center flex={1}>
                      <Text
                        color="#7E72C9"
                        fontWeight="bold"
                        fontFamily="inter"
                        fontSize={{ base: "1.2rem", md: "2rem" }}
                      >
                        {`${moment(event.eventData.date).format(
                          "MMM"
                        )} ${moment(event.eventData.date).format("DD")}`}
                      </Text>
                    </Center>
                    <Center flex={1} borderInline="1px solid #423C64">
                      <Text
                        color="#7E72C9"
                        fontWeight="bold"
                        fontFamily="inter"
                        fontSize={{ base: "1.2rem", md: "2rem" }}
                      >
                        {moment(event.eventData.date).format("LT")}
                      </Text>
                    </Center>
                    <Center flex={1}>
                      <Text
                        color="#7E72C9"
                        fontWeight="semibold"
                        fontFamily="inter"
                        fontSize={{ base: ".8rem", md: "1rem" }}
                        textAlign="center"
                      >
                        {event.eventData.title}
                      </Text>
                    </Center>
                  </Flex>
                </VStack>
              </WrapItem>
            </Skeleton>
          ) : null;
        })}
      </Wrap>
      {selectedEvent ? (
        <MoreDetailsModal
          eventDetails={selectedEvent}
          isOpen={isOpen}
          onClose={onClose}
          setIsViewerOpen={setIsViewerOpen}
        />
      ) : null}
    </Center>
  );
}

export default HappeningNow;
