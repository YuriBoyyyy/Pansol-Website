/* eslint-disable no-nested-ternary */
import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { db } from "../../../app-service/firebase-config";
import { useAuth } from "../../../context/AuthContext";
import { UserModel } from "../../../utils/interfaces/AppInterfaces";

interface CommentData {
  comment: string;
  uid: string;
  date: Timestamp;
  project_id: string;
}

interface SingleCommentProps {
  commentData: CommentData;
}

function SingleComment(props: SingleCommentProps) {
  const { commentData } = props;
  const firebaseAuth = useAuth();

  const getUsername = async () => {
    const docRef = doc(db, "users", commentData.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as UserModel;
    return data;
  };

  const { data: userData } = useQuery({
    queryKey: ["user-data", commentData.uid],
    queryFn: getUsername,
    enabled: !!commentData.uid,
  });

  return (
    <Flex
      w="100%"
      justifyContent={
        firebaseAuth?.currentUser?.uid === commentData.uid ? "end" : "start"
      }
    >
      {firebaseAuth?.currentUser?.uid === commentData.uid ? (
        <HStack
          bg="palette.tertiary"
          justify="end"
          p=".5rem 1rem"
          borderRadius=".3rem"
          spacing="1.2rem"
        >
          <VStack align="end" fontFamily="inter" spacing="0">
            <Text fontSize="1rem" fontWeight="medium" color="palette.primary">
              {commentData.comment}
            </Text>
            <HStack>
              <Text
                fontSize=".6rem"
                fontWeight="normal"
                color="palette.primary"
                opacity=".5"
              >
                {`${moment(commentData.date.toDate()).fromNow()}`}
              </Text>
              <Text fontSize=".6rem" fontWeight="medium" color="#E8A107">
                {userData?.username}
              </Text>
            </HStack>
          </VStack>
          <Avatar size="sm" src={userData?.avatar} />
        </HStack>
      ) : userData?.admin ? (
        <HStack
          bg="#E84A34"
          justify="end"
          p=".5rem 1rem"
          borderRadius=".3rem"
          spacing="1.2rem"
        >
          <Avatar size="sm" name="Pansol" />
          <VStack align="start" fontFamily="inter" spacing="0">
            <Text color="white" fontSize="1rem" fontWeight="medium">
              {commentData.comment}
            </Text>
            <HStack>
              <Text
                fontSize=".6rem"
                fontWeight="normal"
                color="white"
                opacity=".7"
              >
                Pansol, Lopez
              </Text>
              <Text
                fontSize=".6rem"
                fontWeight="normal"
                color="white"
                opacity=".5"
              >
                {`${moment(commentData.date.toDate()).fromNow()}`}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      ) : (
        <HStack>
          <Avatar size="sm" src={userData?.avatar} />
          <VStack align="start" fontFamily="inter" spacing="0">
            <Text fontSize="1rem" fontWeight="medium">
              {commentData.comment}
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
                {`${moment(commentData.date.toDate()).fromNow()}`}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      )}
    </Flex>
  );
}

export default SingleComment;
