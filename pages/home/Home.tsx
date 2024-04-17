import { Button, Flex, Stack, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  Query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../app-service/firebase-config";
import HomeWave from "../../assets/waves/HomeWave";
import WaterMark from "../../components/others/Watermark";
import WelcomeModal from "../../components/others/WelcomeModal";
import {
  Residents,
  ResidentsModel,
} from "../../dashboard/interfaces/appInterface";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import HeroButton from "./components/HeroButton";
import HeroText from "./components/HeroText";
import Mission from "./components/Mission";
import PansolSpots from "./components/PansolSpots";
import Vision from "./components/Vision";
import Services from "./sections/services/Services";

function Home(): JSX.Element {
  const { ref } = useObserver("Home");

  // const handleClick = async () => {
  //   const collectionRef = collection(db, "residents");
  //   const q = query(
  //     collectionRef,
  //     where("precinct", "==", "5K141A"),
  //     where("registered_voter", "==", true)
  //   );

  //   const snapshot = await getDocs(q);
  //   snapshot.forEach(async (doc) => {
  //     await updateDoc(doc.ref, { precinct: "SK141A" })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   });
  // };

  return (
    <>
      {/* <WelcomeModal /> */}
      <Flex
        ref={ref}
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        bg="palette.secondary"
        pos="relative"
        // RESPONSIVE ELEMENTS
        h={{ base: "100%", lg: "100vh" }}
        paddingBlock={{ base: "10rem" }}
      >
        <Flex
          w={breakPoints}
          margin="auto"
          alignItems="center"
          justifyContent="space-between"
          gap="2rem"
          zIndex={1}
          // RESPONSIVE ELEMENTS
          flexDir={{ base: "column", lg: "row" }}
        >
          {/* <Button onClick={handleClick}>Click</Button> */}
          <VStack flex={1} spacing="1rem" paddingTop="2.5rem" align="start">
            <HeroText />
            <HeroButton />
          </VStack>
          <PansolSpots />
        </Flex>
        <HomeWave width="100%" height="0" />
        <WaterMark text="PANSOL" bottom="-10rem" left="0" />
        <WaterMark text="LOPEZ" top="0" right="0" />
      </Flex>

      <Services />
      <Stack
        w={breakPoints}
        spacing="1rem"
        margin="auto"
        paddingBlockStart="5rem"
        direction={{ base: "column", lg: "row" }}
      >
        <Mission />
        <Vision />
      </Stack>
    </>
  );
}

export default Home;
