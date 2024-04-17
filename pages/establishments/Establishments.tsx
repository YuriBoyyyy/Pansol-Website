import {
  Box,
  Button,
  Flex,
  Highlight,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { FaPalfed } from "react-icons/fa";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  Query,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import Place1 from "../../assets/pansol-spots/pansol_mangrove.webp";
import isEven from "../../utils/CheckIfEven";
import MoreDetailsModal from "./components/MoreDetailsModal";
import SectionTitle from "../../components/others/SectionTitle";
import { db } from "../../app-service/firebase-config";
import EstablishmentImageSlider from "./components/EstablishmentImageSlider";

interface PlaceModel {
  image: string[];
  name: string;
  owner: string;
  description: string;
}

function Establishments() {
  const { ref } = useObserver("Places");
  const getEstablishments = (): Promise<PlaceModel[]> => {
    const collectionRef: CollectionReference = collection(db, "establishment");
    const q: Query = query(collectionRef, orderBy("name"));
    return new Promise((resolve) => {
      const data: PlaceModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push(doc.data() as PlaceModel);
        });
        resolve(data);
      });
    });
  };

  const {
    data: places,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["establishments"],
    queryFn: getEstablishments,
    refetchOnWindowFocus: false,
  });

  return (
    <Box ref={ref}>
      <Flex
        paddingTop="10rem"
        w={breakPoints}
        margin="auto"
        justify="space-between"
        gap="8rem"
        flexDir="column"
      >
        <SectionTitle title="Establishments" description="Places in Pansol" />
        {places?.map((place, index) => {
          return (
            <Stack
              direction={{
                md: isEven(index) ? "row" : "row-reverse",
                base: "column",
              }}
              spacing={{ base: "5rem", md: "10rem" }}
              key={place.name}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex
                justifyContent={isEven(index) ? "end" : "start"}
                flex={1}
                w="50%"
              >
                <EstablishmentImageSlider images={place.image} />
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
                  {place.name}
                </Text>
                <Text textAlign="justify">{place.description}</Text>
                <Text
                  fontWeight="semibold"
                  color="palette.secondary"
                  fontFamily="inter"
                >
                  <Highlight
                    query="Owner:"
                    styles={{ color: "palette.tertiary" }}
                  >{`Owner: ${place.owner}`}</Highlight>
                </Text>
              </VStack>
            </Stack>
          );
        })}
      </Flex>
    </Box>
  );
}

export default Establishments;
