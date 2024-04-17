import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { db } from "../../app-service/firebase-config";
import { UserModel } from "../../utils/interfaces/AppInterfaces";

interface AppointmentProps {
  firstName: string;
  lastName: string;
  status: string;
  uid: string;
}

function Appointment(props: AppointmentProps) {
  const { firstName, lastName, status, uid } = props;

  const getUser = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as UserModel;
  };

  const { data: userData } = useQuery({
    queryKey: ["user-date", uid],
    queryFn: getUser,
  });

  return (
    <Flex
      w="100%"
      alignItems="center"
      fontFamily="inter"
      fontSize=".9rem"
      color="#2F2F2F"
    >
      <HStack flex={2}>
        <Avatar
          size="sm"
          name={userData?.username}
          src={userData?.avatar || ""}
        />
        <Text fontWeight="medium">{`${firstName} ${lastName}`}</Text>
      </HStack>
      <Box flex={1}>
        <Text
          w="-webkit-fit-content"
          p=".3rem .6rem"
          borderRadius=".5rem"
          bg={
            // eslint-disable-next-line no-nested-ternary
            status === "Approved"
              ? "green.100"
              : status === "Unmanaged"
              ? "orange.100"
              : "red.100"
          }
          color={
            // eslint-disable-next-line no-nested-ternary
            status === "Approved"
              ? "green.600"
              : status === "Unmanaged"
              ? "orange.600"
              : "red.600"
          }
          fontWeight="medium"
        >
          {status}
        </Text>
      </Box>
    </Flex>
  );
}

export default Appointment;
