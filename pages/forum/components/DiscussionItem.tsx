import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
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
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { db } from "../../../app-service/firebase-config";
import { UserModel } from "../../../utils/interfaces/AppInterfaces";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { useAuth } from "../../../context/AuthContext";

interface DiscussionData {
  date_posted: Timestamp;
  discussion_title: string;
  user_id: string;
}

interface DiscussionModel {
  discussionData: DiscussionData;
  id: string;
}

interface DiscussionItemProps {
  discussion: DiscussionModel;
}

function DiscussionItem(props: DiscussionItemProps) {
  const { discussion } = props;
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const firebaseAuth = useAuth();

  const getCommentsCount = async (): Promise<number> => {
    const collectionRef = collection(db, "replies");
    const q = query(collectionRef, where("discussion_id", "==", discussion.id));
    const snap = await getCountFromServer(q);
    return snap.data().count;
  };

  const { data: commentCount } = useQuery({
    queryKey: ["comments-count", discussion.id],
    queryFn: getCommentsCount,
  });

  const getUsername = async () => {
    const docRef = doc(db, "users", discussion.discussionData.user_id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as UserModel;
    return data;
  };

  const { data: userData } = useQuery({
    queryKey: ["user-data", discussion],
    queryFn: getUsername,
    enabled: !!discussion,
  });

  return (
    <Flex alignItems="center">
      <HStack
        justify="space-between"
        w="100%"
        bg="#F6F5FF"
        p="1rem"
        borderRadius=".5rem"
        cursor="pointer"
        onClick={() => navigate(discussion.id)}
        transition="all .3s ease"
        _hover={{ bg: "#FAF9FE" }}
      >
        <HStack>
          <Avatar src={userData?.avatar} name={userData?.username} />
          <Box color="#8A8899">
            <MdSubdirectoryArrowRight />
          </Box>
          <VStack align="start" spacing=".3rem">
            <Text>{discussion.discussionData.discussion_title}</Text>
            <HStack>
              <Text
                fontSize=".7rem"
                fontFamily="inter"
                fontWeight="semibold"
                color="#FFAE00"
              >
                {userData?.username}
              </Text>
              <Text
                color="#A8A1D6"
                fontSize=".7rem"
                fontFamily="inter"
                fontWeight="normal"
              >
                {`Posted ${moment(
                  discussion.discussionData.date_posted.toDate()
                ).fromNow()}`}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack color="palette.secondary">
          <Text fontWeight="normal" fontFamily="inter" fontSize=".9rem">
            {commentCount}
          </Text>
          <Box fontSize="1.2rem">
            <BiMessageSquareDetail />
          </Box>
        </HStack>
      </HStack>
      {firebaseAuth &&
      discussion &&
      firebaseAuth.currentUser?.uid === discussion.discussionData.user_id ? (
        <>
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="red.100"
            h="5rem"
            color="red.400"
            fontSize="1.4rem"
            paddingInline="1rem"
            borderRightRadius=".5rem"
            cursor="pointer"
            onClick={onOpen}
          >
            <AiFillDelete />
          </Flex>
          <DeleteConfirmationModal
            discussionID={discussion.id}
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      ) : null}
    </Flex>
  );
}

export default DiscussionItem;
