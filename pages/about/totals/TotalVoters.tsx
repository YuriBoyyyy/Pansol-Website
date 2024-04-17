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
import getPercentage from "../../../utils/GetPercentage";

function TotalVoters() {
  const getTotalVoters = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("registered_voter", "==", true));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalMaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("gender", "==", "Male"),
      where("registered_voter", "==", true)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalFemaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("gender", "==", "Female"),
      where("registered_voter", "==", true)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  };

  const getTotalVaccinated = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "Vaccinated"),
      where("registered_voter", "==", true)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const { data: vaccinatedResidentCount } = useQuery({
    queryKey: ["vaccinated-voter-residents-count"],
    queryFn: getTotalVaccinated,
  });

  const { data: residentCount } = useQuery({
    queryKey: ["residents-count"],
    queryFn: getTotalResidentCount,
  });

  const { data: maleResidentCount } = useQuery({
    queryKey: ["voter-male-resident-count"],
    queryFn: getTotalMaleResidentCount,
  });

  const { data: femaleResidentCount } = useQuery({
    queryKey: ["voter-female-resident-count"],
    queryFn: getTotalFemaleResidentCount,
  });

  const { data: registeredVoterCount } = useQuery({
    queryKey: ["registered-voter-count"],
    queryFn: getTotalVoters,
  });

  const { isOpen, onToggle } = useDisclosure();
  return (
    <WrapItem>
      <VStack w="15rem">
        <Text fontFamily="inter" fontWeight="semibold">
          Voter's Percentage
        </Text>
        <Text color="palette.secondary" fontSize="3rem" fontWeight="black">
          {registeredVoterCount && residentCount
            ? getPercentage(registeredVoterCount, residentCount)
            : null}
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
                {registeredVoterCount}
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
                Vaccinated:{" "}
              </Text>
              <Text
                fontSize="1rem"
                fontWeight="semibold"
                color="palette.secondary"
              >
                {vaccinatedResidentCount}
              </Text>
            </HStack>
          </VStack>
        </Collapse>
      </VStack>
    </WrapItem>
  );
}

export default TotalVoters;
