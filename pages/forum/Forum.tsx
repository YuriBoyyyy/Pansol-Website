import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import ForumHeader from "./components/ForumHeader";

function Forum(): JSX.Element {
  const { ref } = useObserver("Forum");

  return (
    <Box ref={ref}>
      <ForumHeader />
      <Flex
        paddingTop="4rem"
        w={breakPoints}
        margin="auto"
        justify="space-between"
        gap="1.5rem"
        // RESPONSIVE ELEMENTS
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Forum;
