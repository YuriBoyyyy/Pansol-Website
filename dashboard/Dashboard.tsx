import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useObserver from "../hooks/useObserver";
import MessagesOverview from "./components/MessagesOverview";
import PopulationOverview from "./components/PopulationOverview";
import VaccinationOverview from "./components/VaccinationOverview";
import AppointmentAndComplaintsOverview from "./sections/appointmentAndComplaints/AppointmentAndComplaintsOverview";

function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const { ref } = useObserver("dashboard");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon!");
    } else if (hour >= 18 && hour < 22) {
      setGreeting("Good Evening!");
    } else {
      setGreeting("Good Night!");
    }
  }, []);

  return (
    <Box ref={ref} w="100%">
      <Box p="2rem">
        <Text fontSize="2rem" fontWeight="semibold">
          {greeting}
        </Text>
      </Box>
      <Grid
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(3, 1fr)"
        p="1rem"
        gap="1rem"
      >
        <PopulationOverview />
        <VaccinationOverview />
        <MessagesOverview />
        <AppointmentAndComplaintsOverview />
      </Grid>
    </Box>
  );
}

export default Dashboard;
