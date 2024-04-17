import { Box, Flex, Highlight, Text } from "@chakra-ui/react";
import EventsWave from "../../../assets/waves/EventsWave";
import WaterMark from "../../../components/others/Watermark";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import HappeningNow from "./HappeningNow";

interface Props {
  setIsViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventsHeader(props: Props) {
  const { setIsViewerOpen } = props;
  return (
    <Box pos="relative">
      <Box bg="palette.secondary" pos="relative">
        <Flex
          w={breakPoints}
          margin="auto"
          paddingBlockStart="8rem"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap="1.2rem"
        >
          <Text
            textAlign="center"
            fontWeight="bold"
            fontFamily="inter"
            fontSize={{ base: "2.5rem", md: "4rem" }}
            color="palette.primary"
            zIndex={1}
          >
            <Highlight query="Events" styles={{ color: "palette.accent" }}>
              Pansol Events
            </Highlight>
          </Text>
          <Text
            textAlign="center"
            fontSize={{ base: ".9rem", md: "1.1rem" }}
            color="palette.primary"
            fontWeight="light"
            zIndex={2}
            maxW="50rem"
          >
            Here's what's on our radar! Don't be left out, be updated and
            informed on the latest and upcoming events.
          </Text>
        </Flex>
        <HappeningNow setIsViewerOpen={setIsViewerOpen} />
      </Box>
      <EventsWave />
      <WaterMark text="Events" bottom="12rem" right="10rem" />
      <WaterMark text="Upcoming" bottom="-5rem" left="-20" />
    </Box>
  );
}

export default EventsHeader;
