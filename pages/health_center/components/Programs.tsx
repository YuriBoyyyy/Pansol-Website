import {
  Box,
  Button,
  Skeleton,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { useNavigate } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import SectionTitle from "../../../components/others/SectionTitle";
import {
  ProgramData,
  ProgramModel,
} from "../../../utils/interfaces/AppInterfaces";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import ProgramCard from "./ProgramCard";

function Programs() {
  const getPrograms = (): Promise<ProgramModel[]> => {
    const collectionRef: CollectionReference = collection(
      db,
      "health-center-programs"
    );
    return new Promise((resolve) => {
      const data: ProgramModel[] = [];
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            programData: doc.data() as ProgramData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: programs,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(
      db,
      "health-center-programs"
    );
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box paddingTop="5rem" w={breakPoints} margin="auto">
      <Text
        textAlign="center"
        fontSize="2rem"
        fontFamily="inter"
        fontWeight="extrabold"
        color="palette.secondary"
      >
        Programs
      </Text>
      <Wrap spacing="1.5rem" justify="center" p="1rem" paddingTop="4rem">
        {programs?.map((program) => {
          return (
            <Skeleton key={program.id} isLoaded={!isFetching}>
              <ProgramCard programData={program} />
            </Skeleton>
          );
        })}
      </Wrap>
    </Box>
  );
}

export default Programs;
