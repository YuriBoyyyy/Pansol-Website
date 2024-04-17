import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiMessage3Line, RiNotification3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import auth, { db } from "../../app-service/firebase-config";
import { useAuth } from "../../context/AuthContext";
import AddNewResident from "./AddNewResident";
import AdminNotifications from "./AdminNotifications";

function Header() {
  const firebaseAuth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

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

  const getConversation = () => {
    let isMessageSeen = false;
    // let docRef: DocumentReference<DocumentData>;
    const collectionRef = collection(db, "conversations");
    const q = query(collectionRef, where("seen_by_admin", "==", false));

    return new Promise((resolve) => {
      onSnapshot(q, (snapshot) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        if (snapshot.empty) {
          isMessageSeen = true;
        }
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

  return (
    <Flex p="1rem 2rem" bg="#FCFCFC" w="100%" justifyContent="end">
      <HStack spacing="1.5rem">
        <Button
          bg="#FF6A55"
          color="white"
          p="1.5rem"
          rightIcon={<AiOutlinePlus />}
          _hover={{}}
          onClick={onOpen}
        >
          New Resident
        </Button>
        <AdminNotifications />
        <Box
          cursor="pointer"
          onClick={() => navigate("/manage-messages/")}
          color="#6F767E"
          fontSize="1.5rem"
          pos="relative"
        >
          <RiMessage3Line />
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
            <MenuButton>
              <Avatar
                size="sm"
                name={firebaseAuth?.currentUser?.username || ""}
                src={firebaseAuth?.currentUser?.photoURL || ""}
              />
            </MenuButton>
            <MenuList
              fontFamily="inter"
              boxShadow="5px 5px 18px rgba(0, 0, 0, .3)"
            >
              <Link to="/profile">
                <MenuItem>Manage Profile</MenuItem>
              </Link>
              <MenuDivider borderColor="rgba(0, 0, 0, .1)" />
              <MenuItem onClick={signOutUser}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
          <Text
            fontWeight="medium"
            fontFamily="inter"
            color="#FF6A55"
            fontSize=".9rem"
          >
            {firebaseAuth?.currentUser?.email}
          </Text>
        </HStack>
      </HStack>
      <AddNewResident isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Header;
