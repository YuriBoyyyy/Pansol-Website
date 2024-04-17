import {
  Avatar,
  HStack,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  DocumentSnapshot,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../app-service/firebase-config";
import SectionTitle from "../../../../components/others/SectionTitle";
import OfficialsInfoModal from "../../components/OfficialsInfoModal";

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
function BarangayPolice() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialModel>();

  const getBarangayPoliceOfficials = async (): Promise<OfficialModel[]> => {
    const collectionRef = collection(db, "other_officials");
    const q = query(collectionRef, where("position", "==", "Barangay Police"));
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
    data: barangayPoliceData,
    isFetched: barangayPoliceFetched,
    refetch: barangayPoliceRefetch,
  } = useQuery({
    queryKey: ["barangay-police-officials"],
    queryFn: getBarangayPoliceOfficials,
  });

  return (
    <>
      <HStack justify="space-between">
        <SectionTitle
          title="Barangay Police."
          description="Other officials of Pansol."
        />
      </HStack>
      <Wrap
        spacing={{ base: "1.5rem", lg: "3rem" }}
        w="100%"
        justify="center"
        p="2rem"
      >
        {barangayPoliceData?.map((official) => {
          return (
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
          );
        })}
      </Wrap>
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

export default BarangayPolice;
