import {
  Box,
  Collapse,
  HStack,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { db } from "../../../app-service/firebase-config";
import getVaccinatedPercentage from "../../../dashboard/utils/getPercentage";
import TotalHousehold from "../totals/TotalHousehold";
import TotalPopulation from "../totals/TotalPopulation";
import TotalPWD from "../totals/TotalPWD";
import TotalSeniors from "../totals/TotalSeniors";
import TotalVoters from "../totals/TotalVoters";
import VaccinatedPercentage from "../totals/VaccinatedPercentage";

function TotalsOverview() {
  return (
    <Wrap w="100%" justify="center" spacing="1.5rem">
      <TotalPopulation />
      <VaccinatedPercentage />
      <TotalVoters />
      <TotalSeniors />
      <TotalPWD />
      <TotalHousehold />
    </Wrap>
  );
}

export default TotalsOverview;
