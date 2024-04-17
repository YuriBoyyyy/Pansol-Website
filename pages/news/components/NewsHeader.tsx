import { Box, Flex, Highlight, Text } from "@chakra-ui/react";
import NewsWave from "../../../assets/waves/NewsWave";
import WaterMark from "../../../components/others/Watermark";
import breakPoints from "../../../utils/interfaces/Breakpoints";

function NewsHeader() {
  return (
    <Box pos="relative">
      <Box bg="palette.secondary">
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
            <Highlight query="Hottest" styles={{ color: "palette.accent" }}>
              Hottest News
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
            Don't know the latest news yet? Worry not, because here we bring you
            the latest and hottest news so you won't be left out.
          </Text>
        </Flex>
      </Box>
      <NewsWave />
      <WaterMark text="News" bottom="12rem" right="0" />
      <WaterMark text="Hottest" bottom="5rem" left="0" />
    </Box>
  );
}

export default NewsHeader;
