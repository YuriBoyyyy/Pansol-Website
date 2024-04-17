import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import NoImage from "../../../assets/noimage.jpg";
import { UserModel } from "../../../utils/interfaces/AppInterfaces";
import ComplaintDetailsModal from "./modal/ComplaintDetailsModal";

interface ComplaintsData {
  date: Timestamp;
  complaint: string;
  supporting_image?: string;
  uid: string;
  status: string;
}

interface ComplaintsModel {
  complaintsData: ComplaintsData;
  id: string;
}

interface PopulatedComplaintsData {
  date: Timestamp;
  complaint: string;
  supporting_image?: string;
  username: string;
  status: string;
  avatar: string;
  uid: string;
}

interface PopulatedComplaintsModel {
  complaintsData: PopulatedComplaintsData;
  id: string;
}

function AllComplaints() {
  const navigate = useNavigate();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [selectedComplaint, setSelectedComplaint] =
    useState<PopulatedComplaintsModel | null>(null);

  const getComplaints = async (): Promise<PopulatedComplaintsModel[]> => {
    const collectionRef = collection(db, "complaints");
    const q = query(collectionRef, orderBy("date", "desc"));
    const data: PopulatedComplaintsModel[] = [];

    return new Promise((resolve, reject) => {
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((docS: DocumentSnapshot) => {
          const cData = docS.data() as ComplaintsData;
          console.log(cData);
          const docRef = doc(db, "users", cData.uid);
          const getUsername = async () => {
            const docSnap = await getDoc(docRef);
            const { username, avatar } = docSnap.data() as UserModel;
            const populatedData = {
              complaintsData: {
                date: cData.date,
                complaint: cData.complaint,
                supporting_image: cData.supporting_image,
                uid: cData.uid,
                status: cData.status,
                username,
                avatar,
              },
              id: docS.id,
            };
            console.log(populatedData);
            data.push(populatedData);
          };
          getUsername()
            .then(() => {
              if (snapshot.docs.length === data.length) {
                console.log(data);
                resolve(data);
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
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
    <Box w="100%" p="2rem">
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Complaints
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
      <Wrap justify="start">
        {complaints?.map((complaint) => {
          return (
            <WrapItem key={complaint.id}>
              <Flex
                flexDir="column"
                justifyContent="center"
                h="20rem"
                w="18rem"
                bg="#FCFCFC"
                p="1rem"
                borderRadius=".3rem"
                gap="1rem"
                cursor="pointer"
                onClick={() => {
                  setSelectedComplaint(complaint);
                  onOpen();
                }}
              >
                <HStack>
                  <Avatar
                    size="sm"
                    name={complaint.complaintsData.username}
                    src={complaint.complaintsData.avatar}
                  />
                  <VStack align="start" spacing="0">
                    <Text
                      fontFamily="inter"
                      fontSize=".9rem"
                      fontWeight="normal"
                    >{`Complaint by ${complaint.complaintsData.username}`}</Text>
                    <Text
                      fontSize=".7rem"
                      fontFamily="inter"
                      color="#FF6A55"
                      fontWeight="medium"
                    >
                      {moment(complaint.complaintsData.date.toDate()).fromNow()}
                    </Text>
                  </VStack>
                </HStack>
                <Box w="100%">
                  <Image
                    w="100%"
                    src={complaint.complaintsData.supporting_image || NoImage}
                  />
                </Box>
              </Flex>
            </WrapItem>
          );
        })}
      </Wrap>
      {selectedComplaint ? (
        <ComplaintDetailsModal
          complaint={selectedComplaint}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
    </Box>
  );
}

export default AllComplaints;
