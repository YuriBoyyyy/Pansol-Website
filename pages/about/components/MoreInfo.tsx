/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Box,
  Button,
  Center,
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
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrow90DegRight, BsPeople } from "react-icons/bs";
import { db } from "../../../app-service/firebase-config";
import { ResidentsModel } from "../../../dashboard/interfaces/appInterface";
import EnterPasswordModal from "../modals/EnterPasswordModal";

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selectedBG: string;
}

interface OfficialModel {
  name: string;
  image: string;
  position: string;
}

function MoreInfo(props: Props) {
  const { selected, selectedBG, setSelected } = props;

  const getFemaleCount = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("purok", "==", selected),
      where("gender", "==", "Female")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const getMaleCount = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("purok", "==", selected),
      where("gender", "==", "Male")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const getVaccinatedCount = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("purok", "==", selected),
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const getPWDCount = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("purok", "==", selected),
      where("pwd", "==", true)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const getSeniorsCount = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("age", ">=", 60),
      where("purok", "==", selected)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const getOfficial = async () => {
    const collectionRef = collection(db, "officials");
    const q = query(collectionRef, where("purok", "==", selected));
    let data: OfficialModel | undefined;
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      data = doc.data() as OfficialModel;
    });

    return data;
  };

  const { data: maleCount } = useQuery({
    queryKey: ["male-count", selected],
    queryFn: getMaleCount,
    enabled: !!selected,
  });
  const { data: femaleCount } = useQuery({
    queryKey: ["female-count", selected],
    queryFn: getFemaleCount,
    enabled: !!selected,
  });
  const { data: vaccinatedCount } = useQuery({
    queryKey: ["vaccinated-count", selected],
    queryFn: getVaccinatedCount,
    enabled: !!selected,
  });
  const { data: PWDCount } = useQuery({
    queryKey: ["pwd-count", selected],
    queryFn: getPWDCount,
    enabled: !!selected,
  });
  const { data: official } = useQuery({
    queryKey: ["purok-official", selected],
    queryFn: getOfficial,
    enabled: !!selected,
  });
  const { data: seniorsCount } = useQuery({
    queryKey: ["seniors-count", selected],
    queryFn: getSeniorsCount,
    enabled: !!selected,
  });

  const data2 = {
    labels: [`Purok ${selected}`],
    datasets: [
      {
        label: "Total Population",
        data: [femaleCount && maleCount ? femaleCount + maleCount : null],
        backgroundColor: [selectedBG],
        borderWidth: 1,
      },
    ],
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center
      flex={1}
      position="relative"
      borderRadius=".5rem"
      bg="#F6F5FF"
      as={motion.div}
      flexDir="column"
      p="1.5rem"
      animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, x: 50 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
    >
      <VStack w="100%" align="start" paddingBottom="2rem">
        <HStack>
          <Text
            fontWeight="semibold"
            color="palette.secondary"
            fontFamily="inter"
            fontSize=".8rem"
          >
            Assigned Official
          </Text>
          <Box transform="rotate(90deg)" color="palette.secondary">
            <BsArrow90DegRight />
          </Box>
        </HStack>
        <HStack>
          <Avatar name={official?.name} src={official?.image} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">{official?.name}</Text>
            <Text
              fontFamily="inter"
              fontSize=".8rem"
              fontWeight="semibold"
              color="palette.secondary"
            >
              {official?.position}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <Box
        pos="absolute"
        top="1rem"
        right="1rem"
        fontSize="1.5rem"
        opacity=".6"
        cursor="pointer"
        onClick={() => setSelected("")}
      >
        <AiOutlineCloseCircle />
      </Box>
      <Center pos="relative">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, 25%)"
          textAlign="center"
        >
          <VStack spacing={0}>
            <HStack>
              <Box>
                <BsPeople />
              </Box>
              {femaleCount && maleCount ? (
                <Text fontFamily="inter" fontWeight="bold">
                  {femaleCount + maleCount}
                </Text>
              ) : null}
            </HStack>
          </VStack>
        </Box>
        <Box h="15rem">
          <Doughnut data={data2} />
        </Box>
      </Center>
      <Wrap paddingTop="2rem" justify="center" spacing="2.5rem">
        <WrapItem>
          <VStack>
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="semibold">
              Household
            </Text>
            <Text fontWeight="bold" color="palette.secondary" fontSize="1.5rem">
              {selected === "Beach A"
                ? "85"
                : selected === "Beach B"
                ? "104"
                : selected === "Riverside A"
                ? "81"
                : selected === "Riverside B"
                ? "52"
                : selected === "Oriental A"
                ? "53"
                : selected === "Oriental B"
                ? "124"
                : selected === "Central"
                ? "137"
                : ""}
            </Text>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack>
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="semibold">
              Male
            </Text>
            <Text fontWeight="bold" color="palette.secondary" fontSize="1.5rem">
              {maleCount}
            </Text>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack>
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="semibold">
              Female
            </Text>
            <Text fontWeight="bold" color="palette.secondary" fontSize="1.5rem">
              {femaleCount}
            </Text>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack>
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="semibold">
              Senior Citizen
            </Text>
            <Text fontWeight="bold" color="palette.secondary" fontSize="1.5rem">
              {seniorsCount}
            </Text>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack>
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="semibold">
              PWD
            </Text>
            <Text fontWeight="bold" color="palette.secondary" fontSize="1.5rem">
              {PWDCount}
            </Text>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack>
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="semibold">
              Vaccinated
            </Text>
            <Text fontWeight="bold" color="palette.secondary" fontSize="1.5rem">
              {vaccinatedCount}
            </Text>
          </VStack>
        </WrapItem>
      </Wrap>
      <Box paddingTop="2rem" alignSelf="end">
        <Button
          transition="all .3s ease"
          bg="transparent"
          color="palette.secondary"
          border="1px solid"
          borderColor="palette.secondary"
          fontFamily="inter"
          onClick={onOpen}
          _hover={{ bg: "rgba(70, 55, 158, .1)" }}
        >
          View Full List
        </Button>
      </Box>
      <EnterPasswordModal purok={selected} isOpen={isOpen} onClose={onClose} />
    </Center>
  );
}

export default MoreInfo;
