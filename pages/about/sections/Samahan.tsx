import { Box, Grid, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../../app-service/firebase-config";
import SectionTitle from "../../../components/others/SectionTitle";
import useObserver from "../../../hooks/useObserver";
import breakPoints from "../../../utils/interfaces/Breakpoints";
import SamahanCard from "../components/SamahanCard";

interface MemberModel {
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface SamahanData {
  area_of_operation: string;
  logo: string;
  title: string;
  contact_number?: string;
  president?: string;
  office_address?: string;
  member: MemberModel[];
}

interface SamahanModel {
  samahanData: SamahanData;
  id: string;
}

function Samahan() {
  const { ref } = useObserver("About");

  const getSamahan = (): Promise<SamahanModel[]> => {
    const collectionRef: CollectionReference = collection(db, "samahan");
    return new Promise((resolve) => {
      const data: SamahanModel[] = [];
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            samahanData: doc.data() as SamahanData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: samahanDetails,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["samahan"],
    queryFn: getSamahan,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "samahan");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box w={breakPoints} ref={ref} margin="auto" paddingTop="10rem">
      <SectionTitle title="Samahan" description="Mga Organisasyon sa Pansol." />
      <Wrap p="1rem" justify="center" spacing="2.5rem" marginTop="5rem">
        {samahanDetails?.map((samahan) => {
          return (
            <SamahanCard
              key={samahan.id}
              samahanData={samahan.samahanData}
              id={samahan.id}
            />
          );
        })}
      </Wrap>
    </Box>
  );
}

export default Samahan;
