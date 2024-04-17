import { Box, Flex, Highlight, Text } from "@chakra-ui/react";
import ForumWave from "../../../assets/waves/ForumWave";
import WaterMark from "../../../components/others/Watermark";
import breakPoints from "../../../utils/interfaces/Breakpoints";

function ForumHeader() {
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
            fontSize="4rem"
            color="palette.primary"
            zIndex={1}
          >
            <Highlight query="Community" styles={{ color: "palette.accent" }}>
              Pansol Community
            </Highlight>
          </Text>
          <Text
            textAlign="center"
            fontSize="1.1rem"
            color="palette.primary"
            fontWeight="light"
            zIndex={2}
            maxW="50rem"
          >
            Create a sense of community and social ties by exchanging thoughts
            and questions. Healthy and useful online conversation is made
            possible through Pansol Online Forum.
          </Text>
        </Flex>
      </Box>
      <WaterMark text="Community" bottom="12rem" right="-20rem" />
      <WaterMark text="Pansol" bottom="5rem" left="0" />
      <ForumWave />
    </Box>
  );
}

export default ForumHeader;
