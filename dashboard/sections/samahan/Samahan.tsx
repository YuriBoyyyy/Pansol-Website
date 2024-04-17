import { Box, Button, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../../app-service/firebase-config";
import useObserver from "../../../hooks/useObserver";
import AddMemberModal from "../../components/AddMemberModal";
import SamahanCard from "./components/SamahanCard";

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

function ManageSamahan() {
  const { ref } = useObserver("Samahan");

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
    queryKey: ["manage-samahan"],
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

  const {
    isOpen: isAddMemberOpen,
    onClose: onAddMemberClose,
    onOpen: onAddMemberOpen,
  } = useDisclosure();
  return (
    <Box p="2rem" ref={ref}>
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Mga Samahan
      </Text>
      <Box paddingBlockEnd="1.5rem">
        <Button
          fontFamily="inter"
          _hover={{ opacity: 0.9 }}
          bg="#FF6A55"
          color="white"
          onClick={onAddMemberOpen}
        >
          Add Member
        </Button>
      </Box>
      <Wrap p="1rem 1rem 1rem 0rem" spacing="1rem">
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
      <AddMemberModal isOpen={isAddMemberOpen} onClose={onAddMemberClose} />
    </Box>
  );
}

export default ManageSamahan;
