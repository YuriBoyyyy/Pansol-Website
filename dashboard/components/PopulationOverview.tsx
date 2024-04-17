import { Box, Center, GridItem, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TbVaccine } from "react-icons/tb";
import { db } from "../../app-service/firebase-config";
import BarChart from "./BarChart";

function PopulationOverview() {
  const getTotalResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  };

  const getTotalVaccinated = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const { data: residentCount } = useQuery({
    queryKey: ["residents-count"],
    queryFn: getTotalResidentCount,
  });

  const { data: vaccinatedResidentCount } = useQuery({
    queryKey: ["vaccinated-residents-count"],
    queryFn: getTotalVaccinated,
  });

  return (
    <GridItem borderRadius=".8rem" bg="#FCFCFC" rowSpan={3} colSpan={2}>
      <Box p="2rem">
        <HStack w="100%" marginBottom="2rem" spacing="2rem">
          <Box
            bg="white"
            boxShadow="0 2px 16px rgba(0, 0, 0, .1)"
            p="1rem"
            borderRadius="1rem"
            w="100%"
          >
            <HStack>
              <Center w="2rem" h="2rem" borderRadius="50%" bg="#F9D6DA">
                <BsFillPeopleFill />
              </Center>
              <Text fontFamily="inter" fontWeight="semibold" color="#535353">
                Total Population
              </Text>
              <Box color="#535353">
                <HiOutlineExclamationCircle />
              </Box>
            </HStack>
            <Text
              paddingLeft="2.5rem"
              fontFamily="inter"
              fontWeight="bold"
              fontSize="2.5rem"
            >
              {residentCount || 0}
            </Text>
          </Box>
          <Box bg="#EBEBEB" p="1rem" borderRadius="1rem" w="100%">
            <HStack>
              <Center w="2rem" borderRadius="50%" h="2rem" bg="#F9D6DA">
                <TbVaccine />
              </Center>
              <Text fontFamily="inter" fontWeight="semibold" color="#535353">
                Total Vaccinated
              </Text>
              <Box color="#535353">
                <HiOutlineExclamationCircle />
              </Box>
            </HStack>
            <Text
              paddingLeft="2.5rem"
              fontFamily="inter"
              fontWeight="bold"
              fontSize="2.5rem"
            >
              {vaccinatedResidentCount || 0}
            </Text>
          </Box>
        </HStack>
        <BarChart />
      </Box>
    </GridItem>
  );
}

export default PopulationOverview;
