import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { db } from "../../../app-service/firebase-config";
import { useAuth } from "../../../context/AuthContext";
import { UserModel } from "../../../utils/interfaces/AppInterfaces";

interface ReplyProps {
  reply: string;
  uid: string;
  date: Timestamp;
}

function SingleReply(props: ReplyProps) {
  const firebaseAuth = useAuth();
  const { reply, uid, date } = props;

  const getUsername = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as UserModel;
    return data;
  };

  const { data: userData } = useQuery({
    queryKey: ["user-data", uid],
    queryFn: getUsername,
    enabled: !!uid,
  });

  return (
    <Flex
      w="100%"
      justifyContent={firebaseAuth?.currentUser?.uid === uid ? "end" : "start"}
    >
      {firebaseAuth?.currentUser?.uid === uid ? (
        <HStack
          bg="palette.tertiary"
          justify="end"
          align="start"
          p=".5rem 1rem"
          borderRadius=".3rem"
          spacing="1.2rem"
        >
          <VStack align="end" fontFamily="inter" spacing="0">
            <Text fontSize=".9rem" fontWeight="normal" color="palette.primary">
              {reply}
            </Text>
            <HStack>
              <Text
                fontSize=".6rem"
                fontWeight="normal"
                color="palette.primary"
                opacity=".5"
              >
                {`${moment(date.toDate()).fromNow()}`}
              </Text>
              <Text fontSize=".6rem" fontWeight="medium" color="#E8A107">
                {userData?.username}
              </Text>
            </HStack>
          </VStack>
          <Avatar size="sm" name={userData?.username} src={userData?.avatar} />
        </HStack>
      ) : (
        <HStack align="start">
          <Avatar size="sm" name={userData?.username} src={userData?.avatar} />
          <VStack align="start" fontFamily="inter" spacing="0">
            <Text fontSize=".9rem" fontWeight="normal">
              {reply}
            </Text>
            <HStack>
              <Text fontSize=".6rem" fontWeight="semibold" color="#E8A107">
                {userData?.username}
              </Text>
              <Text
                fontSize=".6rem"
                fontWeight="semibold"
                color="palette.secondary"
              >
                {`${moment(date.toDate()).fromNow()}`}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      )}
    </Flex>
  );
}

export default SingleReply;
