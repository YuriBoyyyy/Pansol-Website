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
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { AiOutlineSend } from "react-icons/ai";
import LinesEllipsis from "react-lines-ellipsis";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { db } from "../../app-service/firebase-config";
import breakPoints from "../../utils/interfaces/Breakpoints";
import { useAuth } from "../../context/AuthContext";
import useObserver from "../../hooks/useObserver";
import NoMessage from "../../assets/noMessage.json";
import SectionTitle from "../../components/others/SectionTitle";

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

function Messages() {
  const { ref } = useObserver("Messages");
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const firebaseAuth = useAuth();

  const getMessages = async (): Promise<MessageModel[]> => {
    const collectionRef = collection(db, "messages");
    const q = query(
      collectionRef,
      where("conversation_id", "==", firebaseAuth?.currentUser?.uid),
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
    data: messagesData,
    isFetched: isMessagesFetched,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages", firebaseAuth?.currentUser],
    queryFn: getMessages,
    enabled: !!firebaseAuth?.currentUser,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "messages");
    const unSub = onSnapshot(collectionRef, () => {
      refetchMessages();
    });
    return () => {
      unSub();
    };
  }, [refetchMessages]);

  const handleMessage = async () => {
    setIsSending(true);
    if (!message) {
      setIsSending(false);
      return;
    }

    const conversationData = {
      sender_info: {
        username: firebaseAuth?.currentUser?.username,
        avatar: firebaseAuth?.currentUser?.photoURL,
        email: firebaseAuth?.currentUser?.email,
      },
      latest_message: message,
      receiver: "admin",
      seen_by_admin: false,
      seen_by_resident: true,
      date: Timestamp.fromDate(new Date()),
    };

    const messageData = {
      sender: firebaseAuth?.currentUser?.uid,
      conversation_id: firebaseAuth?.currentUser?.uid,
      message,
      date: Timestamp.fromDate(new Date()),
    };

    const collectionRef = collection(db, "messages");
    let docRef: DocumentReference<DocumentData>;
    if (firebaseAuth?.currentUser?.uid) {
      docRef = doc(db, "conversations", firebaseAuth?.currentUser?.uid);
      await setDoc(docRef, conversationData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      await addDoc(collectionRef, messageData)
        .then((res) => {
          console.log(res);
          setMessage("");
          setIsSending(false);
        })
        .catch((err) => {
          console.log(err);
          setMessage("");
          setIsSending(false);
        });
    }
  };

  useEffect(() => {
    let docRef: DocumentReference<DocumentData>;
    let unSub: () => void;
    if (firebaseAuth?.currentUser?.uid) {
      docRef = doc(db, "conversations", firebaseAuth?.currentUser?.uid);
      unSub = onSnapshot(docRef, () => {
        if (firebaseAuth?.currentUser?.uid) {
          const docRef = doc(
            db,
            "conversations",
            firebaseAuth?.currentUser?.uid
          );
          updateDoc(docRef, { seen_by_resident: true });
        }
      });
    }
    return () => {
      unSub();
    };
  }, [firebaseAuth?.currentUser?.uid]);

  return (
    <Box ref={ref} paddingBlockStart="10rem" w={breakPoints} margin="auto">
      <Box paddingBlockEnd="2rem">
        <SectionTitle title="Message" description="Get in touch with Pansol" />
      </Box>
      <Flex h="70vh" gap=".5rem">
        <VStack p="1rem" flex={1} borderRadius=".3rem" bg="#F6F5FF">
          <HStack
            bg="#E6E4F6"
            borderRadius=".3rem"
            p=".5rem"
            w="100%"
            cursor="pointer"
          >
            <Avatar size="md" name="Pansol" />
            <VStack spacing={0} align="start">
              <Text fontFamily="inter">Pansol</Text>
              {/* <Text fontFamily="inter" fontSize=".7rem" opacity=".8">
                <LinesEllipsis
                  text="Okay"
                  maxLine="3"
                  ellipsis="..."
                  trimRight
                  basedOn="words"
                />
              </Text> */}
            </VStack>
          </HStack>
        </VStack>
        <VStack
          justify="space-between"
          bg="#F6F5FF"
          p="2rem"
          flex={3}
          borderRadius=".3rem"
        >
          <VStack spacing=".8rem" overflowY="scroll" w="100%">
            {messagesData && messagesData?.length < 1 ? (
              <VStack spacing="1rem">
                <Lottie
                  loop
                  animationData={NoMessage}
                  play
                  style={{ width: 250, height: 250 }}
                />
                <Text
                  p="1rem"
                  fontWeight="medium"
                  fontFamily="inter"
                  opacity=".5"
                >
                  Start Messaging Pansol
                </Text>
              </VStack>
            ) : (
              messagesData?.map((message) => {
                return message.messageData.sender !== "admin" ? (
                  <HStack w="100%" justify="end" key={message.id}>
                    <HStack bg="#46379E" p=".3rem .8rem" borderRadius=".3rem">
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
                      <Avatar
                        size="sm"
                        name={firebaseAuth?.currentUser?.username || ""}
                        src={firebaseAuth?.currentUser?.photoURL || ""}
                      />
                    </HStack>
                  </HStack>
                ) : (
                  <HStack w="100%" key={message.id}>
                    <Avatar size="sm" name="Pansol" />
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
              })
            )}
          </VStack>
          <HStack w="100%" gap="1rem">
            <Input
              p="1.6rem"
              fontFamily="inter"
              placeholder="Type a message..."
              focusBorderColor="#887DCF"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              p=".3rem"
              bg="transparent"
              transition="all .3s ease"
              borderRadius=".3rem"
              _hover={{ bg: "#E6E4F6" }}
              color="#46379E"
              isLoading={isSending}
              onClick={handleMessage}
            >
              <Box fontSize="2rem">
                <AiOutlineSend />
              </Box>
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Messages;
