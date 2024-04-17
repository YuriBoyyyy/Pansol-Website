import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import LinesEllipsis from "react-lines-ellipsis";
import { useEffect, useState } from "react";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import Spot4 from "../../../assets/pansol-spots/spot4.webp";
import Spot7 from "../../../assets/pansol-spots/spot7.webp";
import Spot9 from "../../../assets/pansol-spots/spot9.webp";
import Spot10 from "../../../assets/pansol-spots/spot10.webp";
import Spot12 from "../../../assets/pansol-spots/pansol_baranggay_hall.webp";
import useObserver from "../../../hooks/useObserver";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import SectionTitle from "../../../components/others/SectionTitle";
import isEven from "../../../utils/CheckIfEven";
import SpotsInfoModal from "../../about/components/SpotsInfoModal";
import { db } from "../../../app-service/firebase-config";
import SpotsImageSlider from "./SpotsImageSlider";

interface SpotsData {
  image: string[];
  description: string;
  name: string;
}

interface SpotsModel {
  spotsData: SpotsData;
  id: string;
}

function SpotLists() {
  const { ref } = useObserver("Places");
  const [selectedSpot, setSelectedSpot] = useState<SpotsModel>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const getSpots = (): Promise<SpotsModel[]> => {
    const collectionRef: CollectionReference = collection(db, "tourist-spots");
    return new Promise((resolve) => {
      const data: SpotsModel[] = [];
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            spotsData: doc.data() as SpotsData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: spots,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["pansol-spots"],
    queryFn: getSpots,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "tourist-spots");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box ref={ref}>
      <Flex margin="auto" justify="space-between" gap="8rem" flexDir="column">
        {spots?.map((spot, index) => {
          return (
            <Stack
              key={spot.id}
              direction={{
                lg: isEven(index) ? "row" : "row-reverse",
                base: "column",
              }}
              spacing={{ base: "5rem", md: "10rem" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex
                justifyContent={isEven(index) ? "end" : "start"}
                flex={1}
                w={{ base: "100%", lg: "50%" }}
              >
                <SpotsImageSlider images={spot.spotsData.image} />
              </Flex>
              <VStack
                alignItems={isEven(index) ? "start" : "end"}
                flex={1}
                gap="2rem"
                justifyContent="space-between"
              >
                <Text
                  fontFamily="inter"
                  fontSize="1.2rem"
                  fontWeight="semibold"
                >
                  {spot.spotsData.name}
                </Text>
                <Text textAlign="justify">
                  {/* <LinesEllipsis
                    text={spot.spotsData.description}
                    maxLine="6"
                    ellipsis="..."
                    trimRight
                    basedOn="words"
                  /> */}
                  {spot.spotsData.description}
                </Text>
                {/* <Button
                  p="1.5rem"
                  bg="palette.secondary"
                  color="palette.primary"
                  onClick={() => {
                    setSelectedSpot(spot);
                    onOpen();
                  }}
                  _hover={{ bg: "palette.secondary_hover" }}
                >
                  More Details
                </Button> */}
              </VStack>
            </Stack>
          );
        })}
      </Flex>
      {selectedSpot ? (
        <SpotsInfoModal
          onClose={onClose}
          isOpen={isOpen}
          spotsData={selectedSpot}
        />
      ) : null}
    </Box>
  );
}

export default SpotLists;
