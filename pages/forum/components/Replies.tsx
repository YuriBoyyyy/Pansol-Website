import {
  Avatar,
  Box,
  Flex,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsArrow90DegRight } from "react-icons/bs";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  Query,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import SingleReply from "./SingleReply";
import { db } from "../../../app-service/firebase-config";

interface ReplyData {
  reply: string;
  uid: string;
  date: Timestamp;
  discussion_id: string;
}

interface ReplyModel {
  discussionData: ReplyData;
  id: string;
}

interface RepliesProps {
  discussionID: string | undefined;
}

function Replies(props: RepliesProps) {
  const { discussionID } = props;
  console.log(discussionID);
  const getReplies = (): Promise<ReplyModel[]> => {
    const collectionRef: CollectionReference = collection(db, "replies");
    const q: Query = query(
      collectionRef,
      where("discussion_id", "==", discussionID),
      orderBy("date")
    );
    return new Promise((resolve) => {
      const data: ReplyModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            discussionData: doc.data() as ReplyData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: discussionReplies,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["replies", discussionID],
    queryFn: getReplies,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "replies");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box marginTop="2rem">
      <Skeleton isLoaded={!isFetching}>
        <HStack>
          <Text fontWeight="medium" fontFamily="inter">
            Comments
          </Text>
          <Box fontSize="1.2rem" transform="rotate(90deg)">
            <BsArrow90DegRight />
          </Box>
        </HStack>
      </Skeleton>
      <VStack
        p="1.5rem"
        h="25rem"
        marginTop="1rem"
        bg="#E7E6F6"
        borderRadius=".4rem"
        spacing=".8rem"
        overflowY="scroll"
      >
        {discussionReplies?.map((reply) => {
          return (
            <Skeleton w="100%" isLoaded={!isFetching} key={reply.id}>
              <SingleReply
                reply={reply.discussionData.reply}
                date={reply.discussionData.date}
                uid={reply.discussionData.uid}
              />
            </Skeleton>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Replies;
