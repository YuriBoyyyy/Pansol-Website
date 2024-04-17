import { Avatar, Flex, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  DocumentSnapshot,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../../../app-service/firebase-config";
import SectionTitle from "../../../components/others/SectionTitle";
import useObserver from "../../../hooks/useObserver";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import BarangayJustice from "./components/BarangayJustice";
import BarangayPolice from "./components/BarangayPolice";
import BarangayUtility from "./components/BarangayUtility";
import DayCareWorker from "./components/DayCareWoker";
import SKOfficials from "./components/SKOfficials";

function OtherOfficials() {
  const { ref } = useObserver("About");

  return (
    <Flex
      ref={ref}
      w={breakPoints}
      margin="auto"
      paddingTop="10rem"
      gap="8rem"
      flexDir="column"
    >
      <BarangayPolice />
      <BarangayJustice />
      <SKOfficials />
      <BarangayUtility />
      <DayCareWorker />
    </Flex>
  );
}

export default OtherOfficials;
