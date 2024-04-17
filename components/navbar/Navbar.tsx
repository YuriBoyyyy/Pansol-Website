/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Reactour from "reactour";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Lottie from "react-lottie-player";
import { NavItems } from "../../utils/interfaces/AppInterfaces";
import breakPoints from "../../utils/interfaces/Breakpoints";
import NavigationLink from "./components/NavLink";
import useApp from "../../hooks/useApp";
import MobileNav from "./components/MobileNav";
import { useAuth } from "../../context/AuthContext";
import UserSignedIn from "./components/UserSignedIn";
import Avatar from "../../assets/avatar.json";
import CreateTutorial from "../others/CreateTutorial";

function Navbar(props: NavItems): JSX.Element {
  const { logo, navLinks, navLogo } = props;
  const appContext = useApp();
  const navigate = useNavigate();
  const auth = useAuth();

  const steps = [
    {
      content:
        "Welcome! Let's have a quick tour on how to navigate your way to Pansol Website",
    },
    {
      selector: ".nav-links",
      content:
        "These are the links for easy navigation. We've got quite a few of them too!",
    },
    {
      selector: ".about",
      content:
        "See all information about Pansol here! From the history, officials, samahan and all of that.",
    },
    {
      selector: ".projects",
      content:
        "Projects of Pansol can be seen here. Finished and Ongoing are posted. You can put your comments too!",
    },
    {
      selector: ".places",
      content: "Places in Pansol. All of the establishments can be seen here.",
    },
    {
      selector: ".events",
      content:
        "Events! All of the upcoming and finished events of Pansol are in here. They post one from time to time.",
    },
    {
      selector: ".news",
      content:
        "News is in here if you want to see the latest news about Pansol. There might be an opportunity for you, always check this out!",
    },
    {
      selector: ".forum",
      content:
        "Then the forum. You can join the community discussion here and share your thoughts.",
    },
    {
      selector: ".signin-btn",
      content:
        "This is not required, but if you want to access the full feature of the Pansol Website, then you can create an account.",
    },
  ];

  // TRACK SCREEN SIZE TO ADJUST THE NAV APPEARANCE
  const [isSmallerThan850] = useMediaQuery("(max-width: 64em)");

  return (
    <Box
      w="100%"
      pos="fixed"
      zIndex={999}
      transition="all .3s ease"
      h={appContext?.scrolled ? "4.5rem" : "6rem"}
      bg="palette.secondary"
      boxShadow={
        appContext?.scrolled ? "0 0 10px rgba(43, 39, 62, .5)" : "none"
      }
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        h="100%"
        margin="auto"
        w={breakPoints}
      >
        {/* LOGO */}
        <Link to="/">
          <Image transition="all .3s ease" src={logo} w="7rem" />
        </Link>
        {/* NAVIGATION LINKS */}
        {isSmallerThan850 ? (
          <MobileNav />
        ) : (
          <>
            <HStack spacing="2rem" className="nav-links">
              {navLinks.map((nav, index) => {
                return (
                  <NavigationLink
                    nav={nav}
                    key={nav}
                    navLogo={navLogo[index]}
                  />
                );
              })}
            </HStack>
            {auth?.currentUser ? (
              <UserSignedIn />
            ) : (
              <Button
                className="signin-btn"
                bg="transparent"
                color="palette.accent"
                border="1px solid"
                borderColor="palette.accent"
                transition="all .3s ease"
                _hover={{
                  bg: "rgba(253, 209, 110, .05)",
                }}
                onClick={() => navigate("/signIn")}
                fontSize={appContext?.scrolled ? ".95rem" : "1rem"}
              >
                Sign in
              </Button>
            )}
          </>
        )}
      </Flex>
      <CreateTutorial steps={steps} storageVariable="homepage-tutorial" />
    </Box>
  );
}

export default Navbar;
