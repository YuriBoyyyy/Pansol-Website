import {
  Box,
  Button,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MoreDetailsModal from "./components/MoreDetailsModal";
import { db } from "../../../app-service/firebase-config";
import AddDocument from "../../../utils/firebase-functions/AddDocument";

interface AppointmentData {
  first_name: string;
  last_name: string;
  middle_name: string;
  date: string;
  uid: string;
  subject: string;
  additional_info: string;
  status: string;
  document: string;
  document_type: string;
}

interface AppointmentModel {
  appointmentData: AppointmentData;
  id: string;
}

function ManageAppointments() {
  const navigate = useNavigate();
  const [selectedDetails, setSelectedDetail] = useState<AppointmentModel>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isDenying, setIsDenying] = useState<boolean>(false);
  const [selectedApprove, setSelectedApprove] = useState<string>("");
  const [selectedDeny, setSelectedDeny] = useState<string>("");
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

  const handleApprove = async (
    id: string,
    subject: string,
    date: string,
    uid: string
  ) => {
    setIsApproving(true);
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, { status: "Approved" })
      .then((res) => {
        console.log(res);
        const sendNotif = async () => {
          const data = {
            appointment_id: id,
            message: `Great News! Your Appointment about ${subject} has been approved. See you at ${moment(
              date
            ).format("LLL")}`,
            to_uid: uid,
            status: "Approved",
            date: Timestamp.fromDate(new Date()),
            seen: false,
          };

          await AddDocument("notifications", data)
            .then(() => {
              setIsApproving(false);
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        sendNotif();
      })
      .catch((err) => {
        console.log(err);
        setIsApproving(false);
      });
  };
  const handleDeny = async (
    id: string,
    subject: string,
    date: string,
    uid: string
  ) => {
    setIsDenying(true);
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, { status: "Denied" })
      .then((res) => {
        const sendNotif = async () => {
          const data = {
            appointment_id: id,
            message: `Bad News! Your Appointment about ${subject} has been denied. Try some other time.`,
            to_uid: uid,
            status: "Denied",
            date: Timestamp.fromDate(new Date()),
            seen: false,
          };

          await AddDocument("notifications", data)
            .then(() => {
              setIsDenying(false);
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        sendNotif();
        console.log(res);
        setIsDenying(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDenying(false);
      });
  };

  return (
    <Box w="100%" p="2rem">
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Appointments
      </Text>
      <HStack
        cursor="pointer"
        paddingBlockEnd="2rem"
        onClick={() => navigate("../")}
        fontFamily="inter"
      >
        <Text>Back</Text>
        <Box>
          <BsArrowReturnLeft />
        </Box>
      </HStack>
      <TableContainer>
        <Table
          variant="simple"
          fontFamily="inter"
          w="100%"
          size="sm"
          bg="#FCFCFC"
          borderRadius=".5rem"
        >
          <TableCaption>Pansol 2022</TableCaption>
          <Thead>
            <Tr>
              <Th p="1rem">Name</Th>
              <Th>Date</Th>
              <Th>Concern</Th>
              <Th>Status</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments?.map((appointment) => {
              return (
                <Tr key={appointment.id}>
                  <Td>{`${appointment.appointmentData.first_name} ${appointment.appointmentData.middle_name} ${appointment.appointmentData.last_name}`}</Td>
                  <Td>
                    {moment(appointment.appointmentData.date).format("LLL")}
                  </Td>
                  <Td>{appointment.appointmentData.subject}</Td>
                  <Td>
                    {appointment.appointmentData.status === "Unmanaged" ? (
                      <HStack>
                        <Button
                          transition="all .3s ease"
                          fontSize=".8rem"
                          bg="green.500"
                          color="white"
                          _hover={{ bg: "green.400" }}
                          onClick={() => {
                            setSelectedApprove(appointment.id);
                            handleApprove(
                              appointment.id,
                              appointment.appointmentData.subject,
                              appointment.appointmentData.date,
                              appointment.appointmentData.uid
                            );
                          }}
                          isLoading={
                            selectedApprove === appointment.id
                              ? isApproving
                              : undefined
                          }
                          loadingText="Approving..."
                        >
                          Approve
                        </Button>
                        <Button
                          transition="all .3s ease"
                          bg="red.500"
                          color="white"
                          fontSize=".8rem"
                          _hover={{ bg: "red.400" }}
                          onClick={() => {
                            setSelectedDeny(appointment.id);
                            handleDeny(
                              appointment.id,
                              appointment.appointmentData.subject,
                              appointment.appointmentData.date,
                              appointment.appointmentData.uid
                            );
                          }}
                          isLoading={
                            selectedDeny === appointment.id
                              ? isDenying
                              : undefined
                          }
                          loadingText="Denying..."
                        >
                          Deny
                        </Button>
                      </HStack>
                    ) : (
                      <Text
                        w="-webkit-fit-content"
                        p=".3rem .6rem"
                        borderRadius=".5rem"
                        bg={
                          // eslint-disable-next-line no-nested-ternary
                          appointment.appointmentData.status === "Approved"
                            ? "green.100"
                            : "red.100"
                        }
                        color={
                          appointment.appointmentData.status === "Approved"
                            ? "green.600"
                            : "red.600"
                        }
                        fontWeight="medium"
                      >
                        {appointment.appointmentData.status}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <Button
                      fontSize=".8rem"
                      fontFamily="inter"
                      rightIcon={<BiDetail />}
                      onClick={() => {
                        setSelectedDetail(appointment);
                        onOpen();
                      }}
                    >
                      More Details
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Concern</Th>
              <Th>Status</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {selectedDetails ? (
        <MoreDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          appointmentData={selectedDetails}
        />
      ) : null}
    </Box>
  );
}

export default ManageAppointments;
