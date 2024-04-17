import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import Goal from "../components/Goal";
import HealthCenterGallery from "../components/HealthCenterGallery";
import MessageCard from "../components/MessageCard";
import Mission from "../components/Mission";
import Officials from "../components/Officials";
import Programs from "../components/Programs";
import Vision from "../components/Vision";

function HealthCenterDetails() {
  console.log("HJerere");

  return (
    <>
      <Stack w={breakPoints} margin="auto" paddingTop="5rem" spacing="1.5rem">
        <Stack direction={{ base: "column", lg: "row" }} spacing="1.5rem">
          <Goal />
          <Mission />
          <Vision />
        </Stack>
      </Stack>
      <Programs />
      <Box paddingBlockEnd="6rem" w={breakPoints} margin="auto">
        <MessageCard />
      </Box>
      <Officials />
      <HealthCenterGallery />
    </>
  );
}

export default HealthCenterDetails;
