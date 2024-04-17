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
} from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../app-service/firebase-config";
import Appointment from "./Appointment";
import SectionTitle from "./SectionTitle";

interface AppointmentData {
  first_name: string;
  last_name: string;
  middle_name: string;
  date: string;
  uid: string;
  subject: string;
  additional_info: string;
  status: string;
}

interface AppointmentModel {
  appointmentData: AppointmentData;
  id: string;
}

function AppointmentsOverview() {
  const navigate = useNavigate();
  const getAppointments = async (): Promise<AppointmentModel[]> => {
    const collectionRef = collection(db, "appointments");
    const q = query(collectionRef, orderBy("date", "desc"));
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      const data: AppointmentModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            appointmentData: doc.data() as AppointmentData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: appointments,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "appointments");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box w="100%" borderRadius=".8rem" bg="#FCFCFC" p="2rem">
      <SectionTitle justify="start" title="Appointments" />
      <Flex
        w="100%"
        alignItems="center"
        fontFamily="inter"
        color="#868686"
        fontWeight="medium"
        fontSize=".8rem"
        marginTop="2rem"
      >
        <Text flex={2}>Name</Text>
        <Text flex={1}>Status</Text>
      </Flex>
      <VStack marginTop="1.5rem" spacing="1rem">
        {appointments?.map((appointment) => {
          return (
            <Appointment
              uid={appointment.appointmentData.uid}
              status={appointment.appointmentData.status}
              key={appointment.id}
              firstName={appointment.appointmentData.first_name}
              lastName={appointment.appointmentData.last_name}
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
          onClick={() => navigate("/manage-appointments")}
        >
          Manage Appointments
        </Button>
      </Flex>
    </Box>
  );
}

export default AppointmentsOverview;
