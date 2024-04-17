import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
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
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import LinesEllipsis from "react-lines-ellipsis";
import { useParams } from "react-router-dom";
import { db } from "../../../../app-service/firebase-config";
import { ConversationData, ConversationModel } from "../utils/interface";

interface MessageData {
  message: string;
  sender: string;
  date: Timestamp;
  seen: boolean;
}

interface MessageModel {
  messageData: MessageData;
  id: string;
}

function Sidebar() {
  const { id } = useParams();
  const [reply, setReply] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activeConversation, setActiveConversation] = useState<string>(
    id || ""
  );

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

  const getMessages = async (): Promise<MessageModel[]> => {
    const collectionRef = collection(db, "messages");
    const q = query(
      collectionRef,
      where("conversation_id", "==", activeConversation),
      orderBy("date")
    );
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      const data: MessageModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            messageData: doc.data() as MessageData,
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

  const {
    data: messagesData,
    isFetched: isMessagesFetched,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages", activeConversation],
    queryFn: getMessages,
    enabled: !!activeConversation,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "conversations");
    const unSub = onSnapshot(collectionRef, () => {
      if (activeConversation) {
        const updateSeenStatus = async () => {
          const docRef = doc(db, "conversations", activeConversation);
          await updateDoc(docRef, { seen_by_admin: true })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        updateSeenStatus();
      }
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "messages");
    const unSub = onSnapshot(collectionRef, () => {
      refetchMessages();
    });
    return () => {
      unSub();
    };
  }, [refetchMessages]);

  const handleReply = async () => {
    setIsSending(true);
    if (!reply) {
      setIsSending(false);
      return;
    }

    const docRef = doc(db, "conversations", activeConversation);
    await updateDoc(docRef, {
      latest_message: reply,
      seen_by_admin: true,
      seen_by_resident: false,
      date: Timestamp.fromDate(new Date()),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const data = {
      message: reply,
      date: Timestamp.fromDate(new Date()),
      sender: "admin",
      conversation_id: activeConversation,
    };

    const collectionRef = collection(db, "messages");
    await addDoc(collectionRef, data)
      .then((res) => {
        setIsSending(false);
        setReply("");
        console.log(res);
      })
      .catch((err) => {
        setReply("");
        setIsSending(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (activeConversation) {
      const updateSeenStatus = async () => {
        const docRef = doc(db, "conversations", activeConversation);
        await updateDoc(docRef, { seen_by_admin: true })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      updateSeenStatus();
    }
  }, [activeConversation]);

  return (
    <Flex h="70vh" gap=".5rem">
      <VStack p="1rem" flex={1} borderRadius=".3rem" bg="#FCFCFC">
        {conversationData?.map((conversation) => {
          return (
            <HStack
              key={conversation.id}
              bg={conversation.id === activeConversation ? "#E8E8E8" : ""}
              borderRadius=".3rem"
              p=".5rem"
              w="100%"
              cursor="pointer"
              onClick={() => setActiveConversation(conversation.id)}
            >
              <Avatar
                size="md"
                src={conversation.conversationData.sender_info.avatar}
              />
              <VStack spacing={0} align="start">
                <Text
                  fontFamily="inter"
                  fontWeight={
                    !conversation.conversationData.seen_by_admin
                      ? "bold"
                      : "medium"
                  }
                >
                  {conversation.conversationData.sender_info.username}
                </Text>
                <Text
                  fontWeight={
                    conversation.conversationData.seen_by_admin
                      ? "semibold"
                      : "normal"
                  }
                  fontFamily="inter"
                  fontSize=".7rem"
                  opacity=".8"
                >
                  <LinesEllipsis
                    text={conversation.conversationData.latest_message}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="words"
                  />
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
      <VStack
        justify="space-between"
        bg="#FCFCFC"
        p="2rem"
        flex={3}
        borderRadius=".3rem"
      >
        <VStack spacing=".8rem" overflowY="scroll" w="100%">
          {messagesData?.map((message) => {
            return message.messageData.sender === "admin" ? (
              <HStack w="100%" justify="end" key={message.id}>
                <HStack bg="#FF6A55" p=".3rem .8rem" borderRadius=".3rem">
                  <VStack align="end" spacing={0}>
                    <Text fontFamily="inter" color="white" fontSize=".9rem">
                      {message.messageData.message}
                    </Text>
                    <Text
                      fontSize=".6rem"
                      fontWeight="normal"
                      fontFamily="inter"
                      color="white"
                      opacity=".6"
                    >
                      {moment(message.messageData.date.toDate()).fromNow()}
                    </Text>
                  </VStack>
                  <Avatar size="sm" />
                </HStack>
              </HStack>
            ) : (
              <HStack w="100%" key={message.id}>
                <Avatar size="sm" />
                <VStack align="start" spacing={0}>
                  <Text fontFamily="inter" fontSize=".9rem">
                    {message.messageData.message}
                  </Text>
                  <Text
                    fontSize=".6rem"
                    fontWeight="medium"
                    fontFamily="inter"
                    color="#FF6A55"
                  >
                    {moment(message.messageData.date.toDate()).fromNow()}
                  </Text>
                </VStack>
              </HStack>
            );
          })}
        </VStack>
        <HStack w="100%" gap="1rem">
          <Input
            p="1.6rem"
            fontFamily="inter"
            placeholder="Type a message..."
            focusBorderColor="#FFC0B8"
            borderColor="rgba(0, 0, 0, .1)"
            _placeholder={{
              color: "#5C596E",
              opacity: ".7",
            }}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button
            p=".3rem"
            bg="transparent"
            transition="all .3s ease"
            borderRadius=".3rem"
            _hover={{ bg: "#F3F3F3" }}
            color="#FF6A55"
            isLoading={isSending}
            onClick={handleReply}
          >
            <Box fontSize="2rem">
              <AiOutlineSend />
            </Box>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default Sidebar;
