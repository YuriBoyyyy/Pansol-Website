import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getCountFromServer,
  getDoc,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Replies from "../components/Replies";
import { useAuth } from "../../../context/AuthContext";
import AddDocument from "../../../utils/firebase-functions/AddDocument";
import { db } from "../../../app-service/firebase-config";
import { UserModel } from "../../../utils/interfaces/AppInterfaces";

interface DiscussionData {
  date_posted: Timestamp;
  discussion_title: string;
  user_id: string;
}

function SingleDiscussion() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");
  const { id } = useParams();
  const firebaseAuth = useAuth();
  const navigate = useNavigate();

  const handleReply = async () => {
    setIsSending(true);
    if (!reply) {
      setIsSending(false);
      return;
    }

    const data = {
      reply,
      uid: firebaseAuth?.currentUser?.uid,
      date: Timestamp.fromDate(new Date()),
      discussion_id: id,
    };

    await AddDocument("replies", data)
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

  const getDiscussion = async () => {
    let docRef: DocumentReference<DocumentData> | null = null;
    let data: DiscussionData | null = null;
    if (id) {
      docRef = doc(db, "discussions", id);
      const docSnap = await getDoc(docRef);
      data = docSnap.data() as DiscussionData;
    }
    return data;
  };

  const { data: discussionData, isFetching } = useQuery({
    queryKey: ["single-discussion", id],
    queryFn: getDiscussion,
  });

  const getCommentsCount = async (): Promise<number> => {
    const collectionRef = collection(db, "replies");
    const q = query(collectionRef, where("discussion_id", "==", id));
    const snap = await getCountFromServer(q);
    return snap.data().count;
  };

  const { data: commentCount } = useQuery({
    queryKey: ["comments-count", id],
    queryFn: getCommentsCount,
    enabled: !!id,
  });

  const getUserData = async () => {
    let docRef: DocumentReference<DocumentData> | null = null;
    let data: UserModel | null = null;
    if (discussionData?.user_id) {
      docRef = doc(db, "users", discussionData.user_id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data() as UserModel;
      data = docData;
    }
    return data;
  };

  const { data: userData, isFetching: isFetchingUserData } = useQuery({
    queryKey: ["user-data", discussionData],
    queryFn: getUserData,
    enabled: !!discussionData,
  });

  return (
    <Box w="100%">
      <HStack
        marginBottom="2rem"
        cursor="pointer"
        onClick={() => navigate("../")}
      >
        <Box>
          <TbArrowBackUp />
        </Box>
        <Text fontFamily="inter">Back</Text>
      </HStack>
      <Skeleton isLoaded={!isFetching && !isFetchingUserData}>
        <Box borderRadius=".4rem" p="1.5rem 2rem" bg="palette.tertiary">
          <HStack>
            <Avatar
              size="sm"
              name={userData?.username}
              src={userData?.avatar}
            />
            <Text
              fontSize=".8rem"
              color="palette.accent"
              fontWeight="medium"
              fontFamily="inter"
            >
              {userData?.username}
            </Text>
          </HStack>
          <Text
            fontSize="1.5rem"
            paddingBlock="1rem"
            color="palette.primary"
            fontFamily="inter"
            fontWeight="medium"
          >
            {discussionData?.discussion_title}
          </Text>
          <HStack justify="space-between">
            <Text
              color="palette.accent"
              fontWeight="medium"
              fontFamily="inter"
              fontSize=".8rem"
            >
              {`Posted ${moment(
                discussionData?.date_posted.toDate()
              ).fromNow()}`}
            </Text>
            <HStack color="palette.primary" opacity=".7">
              <Text fontWeight="normal" fontFamily="inter" fontSize=".9rem">
                {commentCount}
              </Text>
              <Box fontSize="1.2rem">
                <BiMessageSquareDetail />
              </Box>
            </HStack>
          </HStack>
        </Box>
      </Skeleton>
      <Replies discussionID={id} />
      <HStack marginTop="1.5rem" justify="end" spacing="1rem">
        {firebaseAuth?.currentUser ? (
          <>
            <Input
              w="40rem"
              placeholder="Type a reply..."
              p="1.5rem"
              focusBorderColor="#8F80E5"
              borderColor="#D9D7FF"
              _placeholder={{
                color: "#5C596E",
                opacity: ".8",
              }}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <Button
              p="1.6rem"
              w="8rem"
              color="palette.primary"
              bg="palette.secondary"
              rightIcon={<AiOutlineSend />}
              isLoading={isSending}
              loadingText="Sending..."
              _hover={{ bg: "palette.secondary_hover" }}
              onClick={handleReply}
            >
              Send
            </Button>
          </>
        ) : (
          <Text fontFamily="inter" fontWeight="semibold" color="#887DCF">
            You need to sign in first to join the discussion.
          </Text>
        )}
      </HStack>
    </Box>
  );
}

export default SingleDiscussion;
