import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { db } from "../../app-service/firebase-config";
import { UserModel } from "../../utils/interfaces/AppInterfaces";

interface ComplaintsProps {
  uid: string;
  date: Timestamp;
}

function Complaints(props: ComplaintsProps) {
  const { uid, date } = props;

  const getUserData = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as UserModel;
    return data;
  };

  const { data: userData } = useQuery({
    queryKey: ["user-data", uid],
    queryFn: getUserData,
    enabled: !!uid,
  });

  return (
    <Flex
      w="100%"
      alignItems="center"
      fontFamily="inter"
      fontSize=".9rem"
      color="#2F2F2F"
    >
      <HStack flex={1}>
        <Avatar size="sm" name={userData?.username} src={userData?.avatar} />
        <Text fontWeight="medium">{userData?.username}</Text>
      </HStack>
      <Box flex={1}>
        <Text
          w="-webkit-fit-content"
          p=".3rem .6rem"
          borderRadius=".5rem"
          fontWeight="medium"
        >
          {moment(date.toDate()).format("LLL")}
        </Text>
      </Box>
    </Flex>
  );
}

export default Complaints;
