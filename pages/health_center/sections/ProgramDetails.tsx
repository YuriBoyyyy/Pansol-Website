import {
  Box,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import { ProgramData } from "../../../utils/interfaces/AppInterfaces";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import ProgramImageSlider from "../components/ProgramImageSlider";

function ProgramDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getProgram = async () => {
    let data: ProgramData | null = null;
    if (id) {
      const docRef = doc(db, "health-center-programs", id);
      const docSnap = await getDoc(docRef);
      data = docSnap.data() as ProgramData;
    }
    return data;
  };

  const { data: programData, isFetching } = useQuery({
    queryKey: ["single-program", id],
    queryFn: getProgram,
  });
  return (
    <Box w={breakPoints} margin="auto">
      <HStack
        marginBottom="2rem"
        cursor="pointer"
        onClick={() => navigate("../")}
        paddingTop="1.2rem"
        w="fit-content"
      >
        <Box>
          <TbArrowBackUp />
        </Box>
        <Text fontFamily="inter">Back</Text>
      </HStack>
      <VStack
        spacing={{ base: "1rem", xl: "1.5rem" }}
        align="start"
        h="100%"
        flex={1.5}
      >
        <Skeleton isLoaded={!isFetching}>
          <Text fontFamily="inter" fontSize="1.5rem" fontWeight="bold">
            {programData?.title}
          </Text>
        </Skeleton>
        <SkeletonText startColor="rgba(0, 0, 0, .1)" isLoaded={!isFetching}>
          <Text fontSize="1rem">{programData?.details}</Text>
        </SkeletonText>
      </VStack>
      <Skeleton isLoaded={!isFetching}>
        <ProgramImageSlider images={programData?.images} />
      </Skeleton>
    </Box>
  );
}

export default ProgramDetails;
