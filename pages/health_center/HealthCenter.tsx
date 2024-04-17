import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SectionTitle from "../../components/others/SectionTitle";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";

function HealthCenter() {
  const { ref } = useObserver("Places");

  return (
    <Box ref={ref}>
      <Flex
        paddingTop="10rem"
        justify="space-between"
        gap="1.5rem"
        flexDir="column"
        // RESPONSIVE ELEMENTS
      >
        <Box w={breakPoints} margin="auto">
          <SectionTitle
            title="Barangay Health Center"
            description="Get your health checked."
          />
        </Box>
        <Outlet />
      </Flex>
    </Box>
  );
}

export default HealthCenter;
