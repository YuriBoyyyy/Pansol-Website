import {
  Avatar,
  Box,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { RiContactsBookLine, RiNotification2Fill } from "react-icons/ri";
import { AiFillMessage, AiOutlineCheck, AiOutlineRead } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getCountFromServer,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import auth, { db } from "../../../app-service/firebase-config";
import ManageProfile from "../../others/ManageProfile";
import { UserModel } from "../../../utils/interfaces/AppInterfaces";

interface NotificationData {
  appointment_id: string;
  date: Timestamp;
  message: string;
  seen: boolean;
  to_uid: string;
  status: string;
}

interface NotificationModel {
  notificationData: NotificationData;
  id: string;
}

interface Conversation {
  seen_by_resident: boolean;
}

function UserSignedIn() {
  const appAuth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // GET RESIDENT RECORDS
  const getUserInfo = async (): Promise<UserModel> => {
    let docRef: DocumentReference<DocumentData>;
    if (appAuth?.currentUser?.uid) {
      docRef = doc(db, "users", appAuth?.currentUser?.uid);
    }
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      let data: UserModel | null = null;
      onSnapshot(docRef, (snapshot) => {
        data = snapshot.data() as UserModel;
        resolve(data);
      });
    });
  };

  const {
    data: userData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
  });

  const getNotifications = async (): Promise<NotificationModel[]> => {
    const collectionRef = collection(db, "notifications");
    const q = query(
      collectionRef,
      where("to_uid", "==", appAuth?.currentUser?.uid),
      orderBy("date", "desc")
    );
    return new Promise((resolve) => {
      const data: NotificationModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            notificationData: doc.data() as NotificationData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const getUnseenNotificationCount = async (): Promise<number> => {
    const collectionRef = collection(db, "notifications");
    const q = query(
      collectionRef,
      where("to_uid", "==", appAuth?.currentUser?.uid),
      where("seen", "==", false),
      orderBy("date", "desc")
    );

    const snap = await getCountFromServer(q);
    return snap.data().count as number;
  };

  const {
    data: notificationCount,
    isFetched: isNotificationCountFetched,
    refetch: refetchNotificationCount,
  } = useQuery({
    queryKey: ["notifications-count"],
    queryFn: getUnseenNotificationCount,
  });

  const {
    data: notificationData,
    isFetched: isNotificationFetched,
    refetch: refetchNotification,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "users");
    const unSub = onSnapshot(collectionRef, () => {
      refetchNotification();
    });
    return () => {
      unSub();
    };
  }, [refetchNotification]);

  useEffect(() => {
    const collectionRef = collection(db, "notifications");
    const q = query(
      collectionRef,
      where("to_uid", "==", appAuth?.currentUser?.uid),
      where("seen", "==", false),
      orderBy("date", "desc")
    );
    const unSub = onSnapshot(q, () => {
      refetchNotificationCount();
    });
    return () => {
      unSub();
    };
  }, [appAuth?.currentUser?.uid, refetchNotificationCount]);

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "notifications");
    const unSub = onSnapshot(collectionRef, () => {
      refetchNotification();
      refetchNotificationCount();
    });
    return () => {
      unSub();
    };
  }, [refetchNotification, refetchNotificationCount]);

  const signOutUser = () => {
    signOut(auth).then(() => {
      toast({
        title: "Signed out.",
        description: "See you later",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });

      navigate("/signIn");
    });
  };

  const handleRead = async (id: string) => {
    const docRef = doc(db, "notifications", id);
    await updateDoc(docRef, {
      seen: true,
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const getConversation = () => {
    let isMessageSeen = false;
    let docRef: DocumentReference<DocumentData>;
    if (appAuth?.currentUser?.uid) {
      docRef = doc(db, "conversations", appAuth?.currentUser?.uid);
    }

    return new Promise((resolve) => {
      onSnapshot(docRef, (snapshot) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { seen_by_resident } = snapshot.data() as Conversation;
        isMessageSeen = seen_by_resident;
        resolve(isMessageSeen);
      });
    });
  };

  const {
    data: isSeen,
    refetch: refetchIsSeen,
    isFetched: isSeenFetched,
  } = useQuery({
    queryKey: ["conversation-is-seen"],
    queryFn: getConversation,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "conversations");
    const unSub = onSnapshot(collectionRef, () => {
      refetchIsSeen();
    });
    return () => {
      unSub();
    };
  }, [refetchIsSeen]);

  return (
    <HStack spacing="1.2rem">
      <Popover>
        <PopoverTrigger>
          <Box
            color="palette.accent"
            pos="relative"
            fontSize="1.2rem"
            cursor="pointer"
          >
            {notificationCount && notificationCount > 0 ? (
              <Center
                top="-.5rem"
                right="-.5rem"
                bg="red.500"
                w="1rem"
                h="1rem"
                borderRadius="50%"
                pos="absolute"
              >
                <Text
                  fontSize=".6rem"
                  color="white"
                  fontWeight="semibold"
                  fontFamily="inter"
                >
                  {notificationCount}
                </Text>
              </Center>
            ) : null}
            <RiNotification2Fill />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          w="28rem"
          fontFamily="inter"
          boxShadow="2px 2px 18px rgba(0, 0, 0, .2)"
        >
          <PopoverArrow />
          <PopoverHeader>Hello!</PopoverHeader>
          <PopoverBody as={VStack} spacing=".3rem">
            {notificationData?.map((notification) => {
              return (
                <VStack
                  bg={
                    // eslint-disable-next-line no-nested-ternary
                    notification.notificationData.status === "Approved" &&
                    notification.notificationData.seen
                      ? ""
                      : // eslint-disable-next-line no-nested-ternary
                      notification.notificationData.status === "Approved" &&
                        !notification.notificationData.seen
                      ? "green.100"
                      : notification.notificationData.status === "Denied" &&
                        notification.notificationData.seen
                      ? ""
                      : "red.100"
                  }
                  p=".5rem"
                  borderRadius=".3rem"
                  key={notification.id}
                  spacing=".5rem"
                >
                  <Text fontFamily="inter" fontSize=".9rem">
                    {notification.notificationData.message}
                  </Text>
                  {notification.notificationData.seen ? (
                    <HStack
                      alignSelf="end"
                      fontWeight="medium"
                      fontSize=".7rem"
                      fontFamily="inter"
                      cursor="pointer"
                    >
                      <Text>Read</Text>
                      <Box>
                        <AiOutlineCheck />
                      </Box>
                    </HStack>
                  ) : (
                    <HStack
                      alignSelf="end"
                      fontWeight="medium"
                      fontSize=".7rem"
                      fontFamily="inter"
                      cursor="pointer"
                      onClick={() => handleRead(notification.id)}
                    >
                      <Text>Mark as read</Text>
                      <Box>
                        <AiOutlineRead />
                      </Box>
                    </HStack>
                  )}
                </VStack>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Box
        onClick={() => navigate("/messages")}
        color="palette.accent"
        fontSize="1.2rem"
        cursor="pointer"
        pos="relative"
      >
        <AiFillMessage />
        {isSeenFetched && !isSeen ? (
          <Center
            top="-.3rem"
            right="-.3rem"
            bg="red.500"
            w=".8rem"
            h=".8rem"
            borderRadius="50%"
            pos="absolute"
          />
        ) : null}
      </Box>
      <HStack>
        <Menu>
          <MenuButton cursor="pointer">
            <Avatar
              size="sm"
              name={userData?.username || ""}
              src={userData?.avatar || ""}
            />
          </MenuButton>
          <MenuList
            fontFamily="inter"
            boxShadow="5px 5px 18px rgba(0, 0, 0, .3)"
          >
            <MenuItem onClick={onOpen}>Manage Profile</MenuItem>
            <MenuDivider borderColor="rgba(0, 0, 0, .1)" />
            <MenuItem onClick={signOutUser}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
        <Text
          fontWeight="medium"
          fontFamily="inter"
          fontSize=".8rem"
          color="palette.accent"
        >
          {userData?.username}
        </Text>
      </HStack>
      <ManageProfile isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}

export default UserSignedIn;
