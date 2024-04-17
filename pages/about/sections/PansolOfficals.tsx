import {
  Avatar,
  Box,
  Flex,
  HStack,
  Select,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import AboutWave from "../../../assets/waves/AboutWave";
import AboutWaveBottom from "../../../assets/waves/AboutWaveBottom";
import SectionTitleVariant from "../../../components/others/SectionTitleVariant";
import breakPoints from "../../../utils/interfaces/Breakpoints";

import Mercado from "../../../assets/officials/Mercado.jpg";
import OfficialsInfoModal from "../components/OfficialsInfoModal";
import { db } from "../../../app-service/firebase-config";
import useObserver from "../../../hooks/useObserver";
import SectionTitle from "../../../components/others/SectionTitle";

interface OfficialsData {
  name: string;
  mobile_number: number;
  facebook: string;
  info: string;
  image: string;
  position: string;
  email: string;
  birthday: string;
}

interface OfficialModel {
  officialsData: OfficialsData;
  id: string;
}

function PansolOfficals() {
  const { ref } = useObserver("About");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialModel>();
  const [selectedTerm, setSelectedTerm] = useState<string>("2010 - 2013");

  const getOfficials = async (): Promise<OfficialModel[]> => {
    const collectionRef = collection(db, "officials");
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      const data: OfficialModel[] = [];
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            officialsData: doc.data() as OfficialsData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const getPastOfficials = async (): Promise<OfficialModel[]> => {
    const collectionRef = collection(db, "past-officials");
    const q = query(collectionRef, where("year", "==", selectedTerm));
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      const data: OfficialModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            officialsData: doc.data() as OfficialsData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: officialsData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["officials"],
    queryFn: getOfficials,
  });

  const {
    data: pastOfficialsData,
    isFetched: pastOfficialsFetched,
    refetch: pastOfficialsRefetch,
  } = useQuery({
    queryKey: ["past-officials", selectedTerm],
    queryFn: getPastOfficials,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "officials");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <>
      <Box ref={ref} pos="relative" bg="palette.secondary">
        <AboutWave />
        <Flex
          w={breakPoints}
          margin="auto"
          paddingTop="10rem"
          gap="8rem"
          flexDir="column"
        >
          <HStack justify="space-between">
            <SectionTitleVariant
              title="Barangay Officials."
              description="Meet the team."
            />
          </HStack>
          <VStack spacing={{ base: "4.5rem", lg: "6rem" }}>
            {officialsData?.map((official) => {
              return official.officialsData.position === "Barangay Captain" ? (
                <VStack
                  onClick={() => {
                    setSelectedOfficial(official);
                    onOpen();
                  }}
                  cursor="pointer"
                  key={official.id}
                >
                  <Avatar
                    name={official.officialsData.name}
                    src={official.officialsData.image}
                    bg="palette.accent"
                    w="15rem"
                    h="15rem"
                  />
                  <Text
                    fontWeight="semibold"
                    fontFamily="inter"
                    color="palette.primary"
                  >
                    {official.officialsData.name}
                  </Text>
                  <Text color="palette.accent">
                    {official.officialsData.position}
                  </Text>
                </VStack>
              ) : null;
            })}
            <Wrap
              spacing={{ base: "1.5rem", lg: "3rem" }}
              w="100%"
              justify="center"
              p="2rem"
            >
              {officialsData?.map((official) => {
                return official.officialsData.position !==
                  "Barangay Captain" ? (
                  <VStack
                    key={official.id}
                    onClick={() => {
                      setSelectedOfficial(official);
                      onOpen();
                    }}
                    w="12rem"
                    h="12rem"
                    cursor="pointer"
                  >
                    <Avatar
                      name={official.officialsData.name}
                      src={official.officialsData.image}
                      size="2xl"
                      bg="palette.accent"
                      // border="2px solid #FDD16E"
                    />
                    <Text
                      textAlign="center"
                      fontWeight="semibold"
                      fontFamily="inter"
                      color="palette.primary"
                    >
                      {official.officialsData.name}
                    </Text>
                    <Text color="palette.accent">
                      {official.officialsData.position}
                    </Text>
                  </VStack>
                ) : null;
              })}
            </Wrap>
          </VStack>
        </Flex>
      </Box>
      <AboutWaveBottom />
      <VStack spacing="5rem" w={breakPoints} margin="auto" align="end">
        <HStack w="100%">
          <SectionTitle
            title="Past Officials"
            description="Here are the past officials of Pansol."
          />
          <Select
            w="13rem"
            fontFamily="inter"
            fontSize=".9rem"
            color="palette.secondary"
            _focusVisible={{}}
            cursor="pointer"
            borderColor="palette.secondary"
            sx={{
              ".official-option": {
                bg: "palette.primary",
                fontSize: ".9rem",
                color: "palette.tertiary",
                paddingBlock: ".8rem",
              },
            }}
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option className="official-option" value="2010 - 2013">
              2010-2013
            </option>
            <option className="official-option" value="2007 - 2010">
              2007-2010
            </option>
            <option className="official-option" value="2002 - 2005">
              2002-2005
            </option>
            <option className="official-option" value="1997 - 2002">
              1997-2002
            </option>
            <option className="official-option" value="1994 - 1997">
              1994-1997
            </option>
            <option className="official-option" value="1991 - 1997">
              1991-1997
            </option>
            <option className="official-option" value="1983 - 1991">
              1983-1991
            </option>
          </Select>
        </HStack>
        {pastOfficialsData?.map((official) => {
          return official.officialsData.position === "Barangay Captain" ? (
            <VStack
              key={official.id}
              onClick={() => {
                setSelectedOfficial(official);
                onOpen();
              }}
              alignSelf="center"
              w="12rem"
              h="12rem"
              cursor="pointer"
            >
              <Avatar
                name={official.officialsData.name}
                src={official.officialsData.image}
                size="2xl"
                bg="palette.secondary"
                color="palette.primary"
                // border="2px solid #FDD16E"
              />
              <Text
                textAlign="center"
                fontWeight="semibold"
                fontFamily="inter"
                color="palette.tertiary"
              >
                {official.officialsData.name}
              </Text>
              <Text color="palette.secondary" fontSize=".9rem">
                {official.officialsData.position}
              </Text>
            </VStack>
          ) : null;
        })}
        <Wrap
          spacing={{ base: "1.5rem", lg: "3rem" }}
          w="100%"
          justify="center"
          p="2rem"
        >
          {pastOfficialsData?.map((official) => {
            return official.officialsData.position !== "Barangay Captain" ? (
              <VStack
                key={official.id}
                onClick={() => {
                  setSelectedOfficial(official);
                  onOpen();
                }}
                w="12rem"
                h="12rem"
                cursor="pointer"
              >
                <Avatar
                  name={official.officialsData.name}
                  src={official.officialsData.image}
                  size="2xl"
                  bg="palette.secondary"
                  color="palette.primary"
                  // border="2px solid #FDD16E"
                />
                <Text
                  textAlign="center"
                  fontWeight="semibold"
                  fontFamily="inter"
                  color="palette.tertiary"
                >
                  {official.officialsData.name}
                </Text>
                <Text color="palette.secondary" fontSize=".9rem">
                  {official.officialsData.position}
                </Text>
              </VStack>
            ) : null;
          })}
        </Wrap>
      </VStack>
      {selectedOfficial ? (
        <OfficialsInfoModal
          isOpen={isOpen}
          onClose={onClose}
          officialsData={selectedOfficial}
        />
      ) : null}
    </>
  );
}

export default PansolOfficals;
