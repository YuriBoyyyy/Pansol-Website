import {
  Avatar,
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../app-service/firebase-config";
import Appointment from "./Appointment";
import Complaints from "./Complaints";
import SectionTitle from "./SectionTitle";

interface ComplaintsData {
  date: Timestamp;
  complaint: string;
  supporting_image?: string;
  uid: string;
}

interface ComplaintsModel {
  complaintsData: ComplaintsData;
  id: string;
}

function ComplaintsOverview() {
  const navigate = useNavigate();
  const getComplaints = async (): Promise<ComplaintsModel[]> => {
    const collectionRef = collection(db, "complaints");
    const q = query(collectionRef, orderBy("date", "desc"));
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      const data: ComplaintsModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            complaintsData: doc.data() as ComplaintsData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: complaints,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: getComplaints,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "complaints");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box w="100%" borderRadius=".8rem" bg="#FCFCFC" p="2rem">
      <SectionTitle justify="start" title="Complaints" />
      <Flex
        w="100%"
        alignItems="center"
        fontFamily="inter"
        color="#868686"
        fontWeight="medium"
        fontSize=".8rem"
        marginTop="2rem"
      >
        <Text flex={1}>Name</Text>
        <Text flex={1}>Date</Text>
      </Flex>
      <VStack marginTop="1.5rem" spacing="1rem">
        {complaints?.map((complaint) => {
          return (
            <Complaints
              key={complaint.id}
              date={complaint.complaintsData.date}
              uid={complaint.complaintsData.uid}
            />
          );
        })}
      </VStack>
      <Flex paddingBlockStart="3rem" justifyContent="end" w="100%">
        <Button
          p="1.5rem"
          bg="transparent"
          border="1px solid #FF6A55"
          color="#FF6A55"
          fontFamily="inter"
          fontSize=".9rem"
          onClick={() => navigate("/all-complaints")}
        >
          View all
        </Button>
      </Flex>
    </Box>
  );
}

export default ComplaintsOverview;
