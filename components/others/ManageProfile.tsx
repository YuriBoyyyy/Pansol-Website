import {
  Avatar,
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useEditableControls,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAuth, updateProfile, User } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { db } from "../../app-service/firebase-config";
import { useAuth } from "../../context/AuthContext";
import { UserModel } from "../../utils/interfaces/AppInterfaces";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

function ManageProfile(props: ProfileProps) {
  const { isOpen, onClose } = props;

  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [isEditingFirstName, setIsEditingFirstName] = useState<boolean>(false);
  const [isEditingMiddleName, setIsEditingMiddleName] =
    useState<boolean>(false);
  const [isEditingLastName, setIsEditingLastName] = useState<boolean>(false);
  const firebaseAuth = useAuth();

  // GET RESIDENT RECORDS
  const getUserInfo = async (): Promise<UserModel> => {
    let docRef: DocumentReference<DocumentData>;
    if (firebaseAuth?.currentUser?.uid) {
      docRef = doc(db, "users", firebaseAuth?.currentUser?.uid);
    }
    // const snapshot = await getDocs(q);
    return new Promise((resolve) => {
      let data: UserModel | null = null;
      onSnapshot(docRef, (snapshot) => {
        data = snapshot.data() as UserModel;
        setUsername(data.username);
        setFirstName(data.profile.first_name);
        setMiddleName(data.profile.middle_name);
        setLastName(data.profile.last_name);
        resolve(data);
      });
    });
  };

  const {
    data: userData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["user-info", isOpen],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "users");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  const handleSave = async () => {
    if (!username && !firstName && !middleName && !lastName) {
      return;
    }
    if (firebaseAuth?.currentUser?.uid) {
      setIsSaving(true);
      const data = {
        avatar: userData?.avatar,
        email: userData?.email,
        username,
        profile: {
          age: "",
          gender: "",
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
        },
      };
      const docRef = doc(db, "users", firebaseAuth?.currentUser?.uid);
      await updateDoc(docRef, data)
        .then((res) => {
          console.log(res);
          const updateAuthProfile = async () => {
            const auth = getAuth();
            await updateProfile(auth.currentUser as User, {
              displayName: username,
            })
              .then((res) => {
                setIsSaving(false);
                setUsername("");
                setFirstName("");
                setLastName("");
                setMiddleName("");
                onClose();
                console.log(res);
              })
              .catch((err) => {
                setIsSaving(false);
                console.log(err);
              });
          };
          updateAuthProfile();
        })
        .catch((err) => {
          setIsSaving(false);
          console.log(err);
        });
    }
  };

  console.log(username);

  useEffect(() => {
    if (!isOpen) {
      setIsEditingFirstName(false);
      setIsEditingUsername(false);
      setIsEditingMiddleName(false);
      setIsEditingLastName(false);
    }
  }, [isOpen]);

  return (
    <Modal
      size="lg"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing="1.5rem" paddingBlockEnd="1rem">
            <Avatar
              size="xl"
              src={userData?.avatar}
              name={userData?.username}
            />
            <VStack align="start">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                color="palette.secondary"
              >
                {userData?.email}
              </Text>
              <InputGroup>
                <Input
                  placeholder={userData?.username}
                  p="1rem"
                  w="100%"
                  focusBorderColor="#8F80E5"
                  borderColor="#D9D7FF"
                  _placeholder={{
                    color: "#5C596E",
                    opacity: ".8",
                  }}
                  maxLength={16}
                  disabled={!isEditingUsername}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputRightAddon
                  p="1rem .8rem"
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                  fontSize="1.2rem"
                  bg="#E6E3FA"
                  borderColor="#D9D7FF"
                  color="#6553CA"
                  borderLeft="none"
                >
                  {isEditingUsername ? <AiOutlineCheck /> : <AiFillEdit />}
                </InputRightAddon>
              </InputGroup>
            </VStack>
          </HStack>
          <Divider />
          <VStack spacing="1rem" paddingBlockStart="1rem" w="100%">
            <Box w="100%">
              <Text fontFamily="inter" fontSize=".8rem" paddingBlock=".6rem">
                First Name
              </Text>
              <InputGroup>
                <Input
                  placeholder={userData?.profile.first_name}
                  p="1.5rem"
                  w="100%"
                  disabled={!isEditingFirstName}
                  focusBorderColor="#8F80E5"
                  borderColor="#D9D7FF"
                  _placeholder={{
                    color: "#5C596E",
                    opacity: ".8",
                  }}
                  maxLength={25}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputRightAddon
                  p="1.5rem 1rem"
                  onClick={() => setIsEditingFirstName(!isEditingFirstName)}
                  fontSize="1.2rem"
                  bg="#E6E3FA"
                  borderColor="#D9D7FF"
                  color="#6553CA"
                  borderLeft="none"
                >
                  {isEditingFirstName ? <AiOutlineCheck /> : <AiFillEdit />}
                </InputRightAddon>
              </InputGroup>
            </Box>
            <Box w="100%">
              <Text fontFamily="inter" fontSize=".8rem" paddingBlock=".6rem">
                Middle Name
              </Text>
              <InputGroup>
                <Input
                  placeholder={userData?.profile.middle_name}
                  p="1.5rem"
                  w="100%"
                  maxLength={25}
                  disabled={!isEditingMiddleName}
                  focusBorderColor="#8F80E5"
                  borderColor="#D9D7FF"
                  _placeholder={{
                    color: "#5C596E",
                    opacity: ".8",
                  }}
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
                <InputRightAddon
                  p="1.5rem 1rem"
                  onClick={() => setIsEditingMiddleName(!isEditingMiddleName)}
                  fontSize="1.2rem"
                  bg="#E6E3FA"
                  borderColor="#D9D7FF"
                  color="#6553CA"
                  borderLeft="none"
                >
                  {isEditingMiddleName ? <AiOutlineCheck /> : <AiFillEdit />}
                </InputRightAddon>
              </InputGroup>
            </Box>
            <Box w="100%">
              <Text fontFamily="inter" fontSize=".8rem" paddingBlock=".6rem">
                Last Name
              </Text>
              <InputGroup>
                <Input
                  placeholder={userData?.profile.last_name}
                  p="1.5rem"
                  w="100%"
                  disabled={!isEditingLastName}
                  focusBorderColor="#8F80E5"
                  borderColor="#D9D7FF"
                  _placeholder={{
                    color: "#5C596E",
                    opacity: ".8",
                  }}
                  maxLength={25}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <InputRightAddon
                  p="1.5rem 1rem"
                  onClick={() => setIsEditingLastName(!isEditingLastName)}
                  fontSize="1.2rem"
                  bg="#E6E3FA"
                  borderColor="#D9D7FF"
                  color="#6553CA"
                  borderLeft="none"
                >
                  {isEditingLastName ? <AiOutlineCheck /> : <AiFillEdit />}
                </InputRightAddon>
              </InputGroup>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack paddingBlock="1rem">
            <Button fontFamily="inter" onClick={onClose} p="1.5rem">
              Cancel
            </Button>
            <Button
              fontFamily="inter"
              p="1.5rem"
              bg="palette.secondary"
              color="palette.primary"
              _hover={{ bg: "palette.secondary_hover" }}
              onClick={handleSave}
              isLoading={isSaving}
              loadingText="Saving..."
            >
              Save
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ManageProfile;
