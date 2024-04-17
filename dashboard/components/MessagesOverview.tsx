import { GridItem, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../app-service/firebase-config";
import {
  ConversationData,
  ConversationModel,
} from "../sections/manage-messages/utils/interface";
import Message from "./Message";
import SectionTitle from "./SectionTitle";

function MessagesOverview() {
  const getConversations = async (): Promise<ConversationModel[]> => {
    const collectionRef = collection(db, "conversations");
    const q = query(collectionRef, orderBy("date", "desc"));
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      const data: ConversationModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            conversationData: doc.data() as ConversationData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: conversationData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "conversations");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  return (
    <GridItem borderRadius=".8rem" bg="#FCFCFC" rowSpan={3} p="2rem">
      <SectionTitle title="Messages" justify="start" />
      <VStack marginTop="2rem" spacing="0">
        {conversationData?.map((conversation) => {
          return (
            <Message
              avatar={conversation.conversationData.sender_info.avatar}
              id={conversation.id}
              key={conversation.id}
              username={conversation.conversationData.sender_info.username}
              message={conversation.conversationData.latest_message}
              date={conversation.conversationData.date}
            />
          );
        })}
      </VStack>
    </GridItem>
  );
}

export default MessagesOverview;
