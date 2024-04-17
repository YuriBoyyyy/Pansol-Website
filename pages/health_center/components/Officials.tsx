import {
  Avatar,
  Box,
  Flex,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { BiDownArrowAlt } from "react-icons/bi";
import { db } from "../../../app-service/firebase-config";
import AboutWave from "../../../assets/waves/AboutWave";
import AboutWaveBottom from "../../../assets/waves/AboutWaveBottom";
import SectionTitleVariant from "../../../components/others/SectionTitleVariant";
import breakPoints from "../../../utils/interfaces/Breakpoints";

interface HealthWorkersModel {
  name: string;
  position: string;
}

function Officials() {
  const getHealthWorkers = async () => {
    const data: HealthWorkersModel[] = [];
    const collectionRef = collection(db, "health-workers");
    const q = query(collectionRef, orderBy("name"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      data.push(doc.data() as HealthWorkersModel);
    });

    return data;
  };

  const { data: officialsData } = useQuery({
    queryKey: ["health-workers"],
    queryFn: getHealthWorkers,
  });

  return (
    <Flex flexDir="column">
      <Box
        id="officials"
        pos="relative"
        bg="palette.secondary"
        marginTop="10rem"
      >
        <AboutWave />
        <Flex w={breakPoints} margin="auto" gap="8rem" flexDir="column">
          <SectionTitleVariant
            title="Barangay Health Center Officials."
            description="Meet the team."
          />
          <Wrap
            spacing={{ base: "1rem", lg: "3rem" }}
            justify="center"
            p="2rem"
          >
            {officialsData?.map((official) => {
              return (
                <VStack key={official.name} w="12rem" h="12rem">
                  <Avatar
                    // name={official.name}
                    size="xl"
                    // bg="palette.accent"
                    opacity=".5"
                    // color="palette.tertiary"
                    // border="2px solid #FDD16E"
                  />
                  <Text
                    textAlign="center"
                    fontWeight="semibold"
                    fontFamily="inter"
                    color="palette.primary"
                  >
                    {official.name}
                  </Text>
                  <Text textAlign="center" color="palette.accent">
                    {official.position}
                  </Text>
                </VStack>
              );
            })}
          </Wrap>
        </Flex>
        <VStack
          w="100%"
          color="palette.accent"
          pos="absolute"
          bottom="-6rem"
          zIndex={2}
          opacity=".8"
        >
          <Text>More Below</Text>
          <Box fontSize="1.5rem">
            <BiDownArrowAlt />
          </Box>
        </VStack>
      </Box>
      <AboutWaveBottom />
    </Flex>
  );
}

export default Officials;
