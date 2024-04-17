import {
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Highlight,
  HStack,
  Skeleton,
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
  query,
  Query,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import LinesEllipsis from "react-lines-ellipsis";
import Lottie from "react-lottie-player";
import { db } from "../../app-service/firebase-config";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import EventCard from "./components/EventCard";
import EventsHeader from "./components/EventsHeader";
import MoreDetailsModal from "./components/MoreDetailsModal";
import Empty from "../../assets/empty.json";
import ImageViewerComponent from "../../components/others/ImageGallery";

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

function Events(): JSX.Element {
  const { ref } = useObserver("Events");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<EventModel>();

  const getEvents = (): Promise<EventModel[]> => {
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
    queryFn: getEvents,
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
    <Box ref={ref}>
      <EventsHeader setIsViewerOpen={setIsViewerOpen} />
      <Box w={breakPoints} margin="auto" paddingBlockStart="10rem">
        <Flex w="100%" flexDir={{ base: "column", lg: "row" }}>
          <Box flex={1}>
            <Text
              textAlign="center"
              fontFamily="inter"
              fontSize="1.2rem"
              paddingBlockEnd="2rem"
              fontWeight="medium"
              opacity=".8"
            >
              Event List
            </Text>
            <Wrap justify="center" p=".5rem" spacing="1.5rem">
              {events && events.length > 0
                ? events?.map((item) => {
                    return new Date(item.eventData.date).getDay() !==
                      new Date().getDay() ? (
                      <Skeleton isLoaded={!isFetching}>
                        <EventCard
                          item={item}
                          onOpen={onOpen}
                          key={item.id}
                          setSelectedEvent={setSelectedEvent}
                        />
                      </Skeleton>
                    ) : null;
                  })
                : null}
            </Wrap>
          </Box>
        </Flex>
      </Box>
      {selectedEvent && isOpen ? (
        <MoreDetailsModal
          eventDetails={selectedEvent}
          isOpen={isOpen}
          onClose={onClose}
          setIsViewerOpen={setIsViewerOpen}
        />
      ) : null}
      {isViewerOpen ? (
        <ImageViewerComponent
          images={selectedEvent?.eventData.images}
          setIsViewerOpen={setIsViewerOpen}
        />
      ) : null}
    </Box>
  );
}

export default Events;
