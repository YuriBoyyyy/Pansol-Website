import {
  Box,
  Collapse,
  HStack,
  Text,
  useDisclosure,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { db } from "../../../app-service/firebase-config";
import getVaccinatedPercentage from "../../../dashboard/utils/getPercentage";

function VaccinatedPercentage() {
  const getTotalVaccinated = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalUnvaccinated = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "Unvaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalFirstDose = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "First-dose")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalMaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("gender", "==", "Male"),
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalFemaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("gender", "==", "Female"),
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalSeniors = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("age", ">=", 60),
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const { data: seniorsCount } = useQuery({
    queryKey: ["vaccinated-seniors-count"],
    queryFn: getTotalSeniors,
  });

  const { data: vaccinatedResidentCount } = useQuery({
    queryKey: ["vaccinated-residents-count"],
    queryFn: getTotalVaccinated,
  });
  const { data: unvaccinatedResidentCount } = useQuery({
    queryKey: ["unvaccinated-residents-count"],
    queryFn: getTotalUnvaccinated,
  });
  const { data: firstDoseResidentCount } = useQuery({
    queryKey: ["first-dose-residents-count"],
    queryFn: getTotalFirstDose,
  });

  const { data: maleResidentCount } = useQuery({
    queryKey: ["vaccinated-male-resident-count"],
    queryFn: getTotalMaleResidentCount,
  });

  const { data: femaleResidentCount } = useQuery({
    queryKey: ["vaccinated-female-resident-count"],
    queryFn: getTotalFemaleResidentCount,
  });

  const { isOpen, onToggle } = useDisclosure();

  return (
    <WrapItem>
      <VStack w="15rem">
        <Text fontFamily="inter" fontWeight="semibold">
          Vaccinated Percentage
        </Text>
        <Text color="palette.secondary" fontSize="3rem" fontWeight="black">
          {vaccinatedResidentCount !== undefined &&
          unvaccinatedResidentCount !== undefined &&
          firstDoseResidentCount !== undefined
            ? getVaccinatedPercentage(
                vaccinatedResidentCount,
                unvaccinatedResidentCount,
                firstDoseResidentCount
              )
            : 0}
          %
        </Text>
        <Box
          fontSize="1.5rem"
          color="palette.secondary"
          transform="rotate(90deg)"
          cursor="pointer"
          onClick={onToggle}
        >
          {isOpen ? <AiOutlineCloseCircle /> : <MdOutlineDoubleArrow />}
        </Box>
        <Collapse in={isOpen} animateOpacity>
          <VStack
            p="2rem"
            color="palette.tertiary"
            bg="#F6F5FF"
            rounded="md"
            shadow="md"
            align="start"
          >
            <HStack>
              <Text fontFamily="inter" fontSize=".9rem" fontWeight="medium">
                Total by number:{" "}
              </Text>
              <Text
                fontSize="1rem"
                fontWeight="semibold"
                color="palette.secondary"
              >
                {vaccinatedResidentCount}
              </Text>
            </HStack>
            <HStack>
              <Text fontFamily="inter" fontSize=".9rem" fontWeight="medium">
                Male:{" "}
              </Text>
              <Text
                fontSize="1rem"
                fontWeight="semibold"
                color="palette.secondary"
              >
                {maleResidentCount}
              </Text>
            </HStack>
            <HStack>
              <Text fontFamily="inter" fontSize=".9rem" fontWeight="medium">
                Female:{" "}
              </Text>
              <Text
                fontSize="1rem"
                fontWeight="semibold"
                color="palette.secondary"
              >
                {femaleResidentCount}
              </Text>
            </HStack>
            <HStack>
              <Text fontFamily="inter" fontSize=".9rem" fontWeight="medium">
                Senior Citizen:{" "}
              </Text>
              <Text
                fontSize="1rem"
                fontWeight="semibold"
                color="palette.secondary"
              >
                {seniorsCount}
              </Text>
            </HStack>
          </VStack>
        </Collapse>
      </VStack>
    </WrapItem>
  );
}

export default VaccinatedPercentage;
