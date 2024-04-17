import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { onSnapshot } from "firebase/firestore";
import SectionTitle from "../../components/others/SectionTitle";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import SpotLists from "./components/SpotLists";

function TouristSpots() {
  const { ref } = useObserver("Places");

  return (
    <Flex
      ref={ref}
      flexDir="column"
      gap="5rem"
      w={breakPoints}
      paddingBlock="12rem"
      margin="auto"
      pos="relative"
    >
      <SectionTitle title="Tourist Spots" description="Where to Pansol?" />
      <Stack
        spacing="5rem"
        direction={{ base: "column", lg: "row" }}
        lineHeight="7"
      >
        <Text fontWeight="light" textAlign="justify" fontSize="1.1rem">
          Pansol is renowned for its captivating views. One of these is the
          Mangrove Walk, which was constructed in 2021 with the intention of
          providing visitors with a sightseeing and resting area.
        </Text>
        <Text fontWeight="light" textAlign="justify" fontSize="1.1rem">
          Pansol Beach is another well-liked tourist destination in Pansol. It
          is renowned for both its crystal-clear water and stunning landscape.
          Being one of the most well-known sights, it attracts a lot of visitors
          to Pansol.
        </Text>
      </Stack>
      <Divider borderColor="palette.tertiary" opacity=".1" />
      <SpotLists />
    </Flex>
  );
}

export default TouristSpots;
