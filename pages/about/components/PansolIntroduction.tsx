import { Stack, Text } from "@chakra-ui/react";
import React from "react";

function PansolIntroduction() {
  return (
    <Stack
      spacing="5rem"
      direction={{ base: "column", lg: "row" }}
      lineHeight="7"
    >
      <Text fontWeight="light" textAlign="justify" fontSize="1.1rem" w="100%">
        Long time ago, there were many springs surrounding the town of Lopez
        that were used by all the people in the area, one time, a drought or a
        shortage of water came. Almost all the springs from the surrounding area
        have dried up, but there is one particular spring in the area that
        continues to produce clean and cold water. The people were very grateful
        and blessed because of this, the Spaniards called the name Pansol,
        because in their language, "PANSOL" means "SPRING" since then the place
        was called Pansol. As of now Pansol is surrounded by rice fields and
        coconuts and has a sea area or what is commonly called a fishpond.
      </Text>
      <Text fontWeight="light" textAlign="justify" fontSize="1.1rem" w="100%">
        This is the main source of the people of the barangay to establish their
        lifestyle while others build a small store to sell their produce such as
        fish, coconut, rice and it also reaches various stores that are part of
        the town of Lopez. Pansol is a barangay in the municipality of Lopez, in
        the province of Quezon. The population of Pansol grew from 1,440 in 1990
        to 2,249 in 2020, an increase of 809 people over the course of 30 years.
        The latest census figures in 2020 denote a negative growth rate of
        0.62%, or a decrease of 67 people, from the previous population of 2,316
        in 2015.
      </Text>
    </Stack>
  );
}

export default PansolIntroduction;
