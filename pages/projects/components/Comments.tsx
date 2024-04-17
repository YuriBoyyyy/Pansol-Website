import { Box, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Query, useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { BsArrow90DegRight } from "react-icons/bs";
import { db } from "../../../app-service/firebase-config";
import SingleComment from "./SingleComment";

interface CommentData {
  comment: string;
  uid: string;
  date: Timestamp;
  project_id: string;
}

interface CommentModel {
  commentData: CommentData;
  id: string;
}

interface CommentProps {
  projectID: string | undefined;
}

function Comments(props: CommentProps) {
  const { projectID } = props;
  const getComments = (): Promise<CommentModel[]> => {
    const collectionRef: CollectionReference = collection(db, "comments");
    const q = query(
      collectionRef,
      where("project_id", "==", projectID),
      orderBy("date")
    );
    return new Promise((resolve) => {
      const data: CommentModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            commentData: doc.data() as CommentData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: projectComments,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["comments", projectID],
    queryFn: getComments,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "comments");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <Box marginTop="2rem">
      <HStack>
        <Skeleton isLoaded={!isFetching}>
          <Text fontWeight="medium" fontFamily="inter">
            Comments
          </Text>
        </Skeleton>
        <Box fontSize="1.2rem" transform="rotate(90deg)">
          <BsArrow90DegRight />
        </Box>
      </HStack>
      <VStack
        p="1.5rem"
        h="25rem"
        marginTop="1rem"
        bg="#E7E6F6"
        borderRadius=".4rem"
        spacing=".8rem"
        overflowY="scroll"
      >
        {projectComments?.map((comment) => {
          return (
            <Skeleton w="100%" key={comment.id} isLoaded={!isFetching}>
              <SingleComment commentData={comment.commentData} />
            </Skeleton>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Comments;
