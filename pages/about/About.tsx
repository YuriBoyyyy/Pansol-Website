import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import SectionTitle from "../../components/others/SectionTitle";
import WaterMarkVariant from "../../components/others/WatermarkVariant";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import FunFact from "./components/FunFact";
import PansolIntroduction from "./components/PansolIntroduction";
import PolarAreaChart from "./components/PolarAreaChart";
import TotalsOverview from "./components/TotalsOverview";
import PansolOfficals from "./sections/PansolOfficals";

function About(): JSX.Element {
  const { ref } = useObserver("About");
  return (
    <Box ref={ref} overflow="hidden" pos="relative">
      <WaterMarkVariant text="Pansol" right="0" />
      <Flex
        gap="5rem"
        paddingBlock="10rem"
        w={breakPoints}
        margin="auto"
        flexDir="column"
      >
        <SectionTitle title="About Us." description="Get to know Pansol." />
        <PansolIntroduction />
        <FunFact />
        <TotalsOverview />
        <PolarAreaChart />
      </Flex>
      <Box w="100%" h="50rem" paddingBlockStart="3rem" borderRadius="4rem">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=V6RG+5PG,%20Pan-Philippine%20Hwy,%20Lopez,%20Quezon,%20Philippines&t=k&z=17&ie=UTF8&iwloc=&output=embed"
        />
      </Box>
    </Box>
  );
}

export default About;
