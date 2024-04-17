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
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { db } from "../../../app-service/firebase-config";

function TotalPWD() {
  const getTotalPWD = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("pwd", "==", true));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalMaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("gender", "==", "Male"),
      where("pwd", "==", true)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalFemaleResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("gender", "==", "Female"),
      where("pwd", "==", true)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalVaccinatedPWD = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("pwd", "==", true),
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const { data: vaccinatedPWDCount } = useQuery({
    queryKey: ["vaccinated-pwd-count"],
    queryFn: getTotalVaccinatedPWD,
  });

  const { data: maleResidentCount } = useQuery({
    queryKey: ["pwd-male-resident-count"],
    queryFn: getTotalMaleResidentCount,
  });

  const { data: femaleResidentCount } = useQuery({
    queryKey: ["pwd-female-resident-count"],
    queryFn: getTotalFemaleResidentCount,
  });

  const { data: pwdCount } = useQuery({
    queryKey: ["pwd-count"],
    queryFn: getTotalPWD,
  });

  const { isOpen, onToggle } = useDisclosure();

  return (
    <WrapItem>
      <VStack w="15rem">
        <Text fontFamily="inter" fontWeight="semibold">
          PWD
        </Text>
        <Text color="palette.secondary" fontSize="3rem" fontWeight="black">
          {pwdCount}
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
                {vaccinatedPWDCount}
              </Text>
            </HStack>
          </VStack>
        </Collapse>
      </VStack>
    </WrapItem>
  );
}

export default TotalPWD;
