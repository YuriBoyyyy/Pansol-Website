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

function TotalPopulation() {
  const { isOpen: isTotalPopulationOpen, onToggle: onTotalPopulationToggle } =
    useDisclosure();

  const getTotalResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  };

  const getTotalMaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("gender", "==", "Male"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalFemaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("gender", "==", "Female"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const { data: maleResidentCount } = useQuery({
    queryKey: ["male-resident-count"],
    queryFn: getTotalMaleResidentCount,
  });

  const { data: femaleResidentCount } = useQuery({
    queryKey: ["female-resident-count"],
    queryFn: getTotalFemaleResidentCount,
  });

  const { data: residentCount } = useQuery({
    queryKey: ["residents-count"],
    queryFn: getTotalResidentCount,
  });

  return (
    <WrapItem>
      <VStack w="15rem">
        <Text fontFamily="inter" fontWeight="semibold">
          Total Population
        </Text>
        <Text color="palette.secondary" fontSize="3rem" fontWeight="black">
          {residentCount}
        </Text>
        <Box
          fontSize="1.5rem"
          color="palette.secondary"
          transform="rotate(90deg)"
          cursor="pointer"
          onClick={onTotalPopulationToggle}
        >
          {isTotalPopulationOpen ? (
            <AiOutlineCloseCircle />
          ) : (
            <MdOutlineDoubleArrow />
          )}
        </Box>
        <Collapse in={isTotalPopulationOpen} animateOpacity>
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
          </VStack>
        </Collapse>
      </VStack>
    </WrapItem>
  );
}

export default TotalPopulation;
