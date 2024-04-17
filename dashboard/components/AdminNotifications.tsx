import {
  Box,
  Center,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineRead } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { db } from "../../app-service/firebase-config";

interface NotificationData {
  date: Timestamp;
  from_uid: string;
  message: string;
  seen: boolean;
  type: string;
}

interface NotificationModel {
  notificationData: NotificationData;
  id: string;
}

function AdminNotifications() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getUnseenNotificationCount = async (): Promise<number> => {
    const collectionRef = collection(db, "admin-notifications");
    const q = query(
      collectionRef,
      where("seen", "==", false),
      orderBy("date", "desc")
    );

    const snap = await getCountFromServer(q);
    return snap.data().count as number;
  };

  const getNotifications = async (): Promise<NotificationModel[]> => {
    const collectionRef = collection(db, "admin-notifications");
    const q = query(
      collectionRef,
      where("seen", "==", false),
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

  const {
    data: notificationCount,
    isFetched: isNotificationCountFetched,
    refetch: refetchNotificationCount,
  } = useQuery({
    queryKey: ["admin-notifications-count"],
    queryFn: getUnseenNotificationCount,
  });

  const navigate = useNavigate();
  const handleClick = async (type: string, id: string) => {
    if (type === "appointment") {
      setIsOpen(false);
      navigate("manage-appointments");
    } else {
      setIsOpen(false);
      navigate("all-complaints");
    }

    const docRef = doc(db, "admin-notifications", id);
    await updateDoc(docRef, {
      seen: true,
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    data: notificationData,
    isFetched: isNotificationFetched,
    refetch: refetchNotification,
  } = useQuery({
    queryKey: ["admin-notifications-data"],
    queryFn: getNotifications,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(
      db,
      "admin-notifications"
    );
    const unSub = onSnapshot(collectionRef, () => {
      refetchNotificationCount();
      refetchNotification();
    });
    return () => {
      unSub();
    };
  }, [refetchNotification, refetchNotificationCount]);

  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Box
          onClick={() => setIsOpen(!isOpen)}
          color="#6F767E"
          fontSize="1.5rem"
          pos="relative"
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
          <RiNotification3Line />
        </Box>
      </PopoverTrigger>
      <PopoverContent _focusVisible={{ outlineColor: "#FFC0B8" }}>
        <PopoverArrow />
        <PopoverBody>
          <VStack align="start" spacing=".1rem">
            {notificationData && notificationData?.length > 0 ? (
              notificationData?.map((notification) => {
                return (
                  <VStack
                    p=".5rem"
                    align="start"
                    w="100%"
                    borderRadius=".3rem"
                    borderBottom="1px solid rgba(0, 0, 0, .1)"
                    fontFamily="inter"
                    bg={
                      notification.notificationData.seen
                        ? "transparent"
                        : "green.100"
                    }
                    transition="all .3s ease"
                    _hover={{ bg: "green.200" }}
                    key={notification.id}
                    cursor="pointer"
                    onClick={() =>
                      handleClick(
                        notification.notificationData.type,
                        notification.id
                      )
                    }
                  >
                    <Text fontSize=".9rem">
                      {notification.notificationData.message}
                    </Text>
                  </VStack>
                );
              })
            ) : (
              <Text fontFamily="inter" textAlign="center">
                No notification
              </Text>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AdminNotifications;
