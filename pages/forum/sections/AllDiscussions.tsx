/* eslint-disable react/no-unstable-nested-components */
import { Box, Center, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ReactourStep } from "reactour";
import { TourProvider, components } from "@reactour/tour";
import CreateTutorial from "../../../components/others/CreateTutorial";
import Categories from "../components/Categories";
import DiscussionList from "../components/DiscussionList";
import SearchAndNewDiscussion from "../components/SearchAndNewDiscussion";
import UserInfo from "../components/UserInfo";

function AllDiscussions() {
  const [activeCategory, setActiveCategory] = useState<string>("Random");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const steps = [
    {
      selector: "default",
      content: "Welcome to Pansol Forum. Let me show you how to navigate here.",
    },
    {
      selector: ".forum-discussions",
      content:
        "These are the current discussion posted. You can click one that your're interested to take part in.",
    },
    {
      selector: ".appointment-name-input",
      content: "Input the details asked here.",
    },
    {
      selector: ".appointment-date-input",
      content: "Also don't forget to set the schedule.",
    },
    {
      selector: ".appointment-btn",
      content:
        "Click this and you're done! You just need to wait for the officials' approval.",
    },
  ];

  return (
    // <TourProvider
    //   steps={steps}
    //   defaultOpen
    //   ContentComponent={({ steps, currentStep, components }) => {
    //     return (
    //       <Center>
    //         <Text>{components?.Content?.defaultProps?.content}</Text>
    //       </Center>
    //     );
    //   }}
    // >
    <>
      <Box
        className="forum-container"
        borderRadius=".5rem"
        h="30rem"
        bg="#F6F5FF"
        flex={1}
        paddingBlock="1.5rem"
      >
        <UserInfo />
        <Divider
          w="100%"
          borderBottomColor="palette.secondary"
          marginTop="1.2rem"
          opacity=".1"
        />
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </Box>
      <VStack flex={4.5} align="end" spacing="3.5rem">
        <HStack spacing="3rem" w="100%">
          <Text
            fontWeight="bold"
            fontSize="2rem"
            fontFamily="inter"
            color="#8379C3"
            textAlign="center"
          >
            {activeCategory}
          </Text>
          <SearchAndNewDiscussion
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </HStack>
        <DiscussionList
          activeCategory={activeCategory}
          searchFilter={searchFilter}
        />
      </VStack>
    </>
    /* </TourProvider> */
  );
}

export default AllDiscussions;
