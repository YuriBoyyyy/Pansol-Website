import { Flex, GridItem } from "@chakra-ui/react";
import AppointmentsOverview from "../../components/AppointmentsOverview";
import ComplaintsOverview from "../../components/ComplaintsOverview";

function AppointmentAndComplaintsOverview() {
  return (
    <GridItem colSpan={2} rowSpan={2}>
      <Flex w="100%" h="100%" gap="1rem">
        <AppointmentsOverview />
        <ComplaintsOverview />
      </Flex>
    </GridItem>
  );
}

export default AppointmentAndComplaintsOverview;
