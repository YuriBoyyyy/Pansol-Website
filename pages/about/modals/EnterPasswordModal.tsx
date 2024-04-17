import {
  Button,
  Center,
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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  purok: string;
}

function EnterPasswordModal(props: Props) {
  const { isOpen, onClose, purok } = props;
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const getPurokPassword = async () => {
    const collectionRef = collection(db, "officials");
    const q = query(collectionRef, where("purok", "==", purok));
    let data = "";
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      const { password } = doc.data();
      data = password;
    });

    return data;
  };

  const { data: purokPassword } = useQuery({
    queryKey: ["purok-password", purok],
    queryFn: getPurokPassword,
    enabled: !!purok,
  });

  const handleAccess = () => {
    if (password === purokPassword) {
      navigate(`${encodeURIComponent(purok)}`);
    } else if (!password) {
      setError("Enter The Password.");
    } else {
      setError("Wrong Password");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <Modal isCentered preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Password Needed!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center flexDir="column" gap=".6rem">
            <AnimatePresence>
              {error ? (
                <Center
                  bg="red.300"
                  w="100%"
                  p=".8rem"
                  borderRadius=".3rem"
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, y: 0, transition: { duration: 0.2 } }}
                  color="palette.primary"
                  fontWeight="inter"
                  fontSize=".9rem"
                  fontFamily="inter"
                  textAlign="center"
                >
                  {error}
                </Center>
              ) : null}
            </AnimatePresence>
            <InputGroup>
              <Input
                placeholder="Password"
                p="1.5rem"
                w="100%"
                focusBorderColor="#8F80E5"
                borderColor="#D9D7FF"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".6",
                }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightAddon
                p="1.5rem 1rem"
                onClick={() => setShowPassword(!showPassword)}
                fontSize="1.2rem"
                bg="#E6E3FA"
                borderColor="#D9D7FF"
                color="#6553CA"
                borderLeft="none"
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </InputRightAddon>
            </InputGroup>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100%"
            bg="palette.secondary"
            color="palette.primary"
            p="1.5rem"
            onClick={handleAccess}
            _hover={{ bg: "palette.secondary_hover" }}
          >
            Access
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EnterPasswordModal;
