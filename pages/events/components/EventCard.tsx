import {
  Box,
  Center,
  Divider,
  Flex,
  Highlight,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { BiDetail } from "react-icons/bi";
import LinesEllipsis from "react-lines-ellipsis";

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

interface EventCardProps {
  item: EventModel;
  setSelectedEvent: React.Dispatch<
    React.SetStateAction<EventModel | undefined>
  >;
  onOpen: () => void;
}

function EventCard(props: EventCardProps) {
  const { item, setSelectedEvent, onOpen } = props;
  return (
    <Flex
      p="1rem"
      bg="#F6F5FF"
      borderRadius=".5rem"
      boxShadow="2px 2px 16px rgba(0, 0, 0, .1)"
      gap="1rem"
      h="15rem"
      alignItems="center"
      opacity={new Date(item.eventData.date) < new Date() ? 1 : 1}
    >
      <VStack
        w="6rem"
        h="100%"
        bg="#6E61BE"
        justify="center"
        paddingBlock="1rem"
        paddingInline=".4rem"
        borderRadius=".3rem"
      >
        <Text
          fontFamily="inter"
          color="palette.primary"
          fontSize="2.5rem"
          fontWeight="extrabold"
        >
          {moment(item.eventData.date).format("DD")}
        </Text>
        <Divider borderBottomColor="#CCC9EA" />
        <Text
          fontFamily="inter"
          color="palette.primary"
          fontSize="1rem"
          fontWeight="semibold"
        >
          {moment(item.eventData.date).format("MMM")}
        </Text>
      </VStack>
      <VStack w="18rem" align="start" h="100%" justify="space-between">
        <VStack align="start">
          <Text
            color="#554E76"
            fontFamily="inter"
            fontSize="1.1rem"
            fontWeight="semibold"
          >
            <LinesEllipsis
              text={item.eventData.title}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
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
          <Center bg="palette.tertiary" borderRadius=".3rem" p=".6rem">
            <Text
              fontSize=".7rem"
              fontFamily="inter"
              fontWeight="medium"
              color="palette.primary"
            >
              <Highlight query="Time:" styles={{ color: "palette.accent" }}>
                {`Time: ${moment(item.eventData.date).format("LT")}`}
              </Highlight>
            </Text>
          </Center>
          <HStack
            fontFamily="inter"
            color="#7E72C9"
            cursor="pointer"
            fontSize=".8rem"
            onClick={() => {
              setSelectedEvent(item);
              onOpen();
            }}
          >
            <Box>
              <BiDetail />
            </Box>
            <Text>More details</Text>
          </HStack>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default EventCard;
