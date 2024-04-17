import { Box, Flex, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SectionTitle from "../../components/others/SectionTitle";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";

function Projects() {
  const { ref } = useObserver("Projects");

  return (
    <Box ref={ref}>
      <Flex
        paddingTop="10rem"
        w={breakPoints}
        margin="auto"
        justify="space-between"
        gap="1.5rem"
        flexDir="column"
        // RESPONSIVE ELEMENTS
      >
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Projects;
