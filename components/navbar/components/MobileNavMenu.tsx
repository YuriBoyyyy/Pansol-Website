import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Divider,
  HStack,
  Box,
  Button,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { NavItems } from "../../../utils/interfaces/AppInterfaces";
import { useAuth } from "../../../context/AuthContext";
import auth from "../../../app-service/firebase-config";

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItems;
}

function MobileNavMenu(props: MobileNavMenuProps) {
  const { isOpen, onClose, navItems } = props;
  const firebaseAuth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

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

  return (
    <Modal
      preserveScrollBarGap
      size={{ base: "sm", md: "md" }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        as={motion.div}
        animate={{
          opacity: 1,
          y: 0,
        }}
        initial={{
          opacity: 0,
          y: -30,
        }}
      >
        <ModalHeader>
          <Flex p="1rem" justifyContent="center" w="100%">
            <Image src={navItems.logo} />
          </Flex>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack paddingBlockEnd="1rem" align="start" spacing="1.5rem">
            {firebaseAuth?.currentUser ? (
              <>
                <Box>
                  <Avatar />
                  <Text fontFamily="inter">
                    {firebaseAuth.currentUser.email}
                  </Text>
                </Box>
                <Button
                  bg="palette.secondary"
                  color="palette.primary"
                  fontFamily="inter"
                  _hover={{
                    bg: "palette.secondary_hover",
                  }}
                >
                  Manage Profile
                </Button>
                <Button
                  bg="transparent"
                  borderColor="palette.secondary"
                  border="1px solid"
                  color="palette.secondary"
                  fontFamily="inter"
                  onClick={() => {
                    signOutUser();
                    onClose();
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button
                bg="palette.secondary"
                color="palette.primary"
                fontFamily="inter"
                _hover={{
                  bg: "palette.secondary_hover",
                }}
                onClick={() => {
                  onClose();
                  navigate("/signIn");
                }}
              >
                Sign in
              </Button>
            )}
            <Divider />
            {navItems.navLinks.map((item, index) => {
              return (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  key={item}
                  onClick={onClose}
                >
                  <HStack
                    spacing="1.2rem"
                    transition="all .3s ease"
                    _hover={{
                      fontWeight: "semibold",
                      color: "palette.secondary",
                    }}
                  >
                    <Box fontSize="1.1rem" color="palette.secondary">
                      {navItems.navLogo[index]}
                    </Box>
                    <Text fontFamily="inter" fontSize="1rem">
                      {item}
                    </Text>
                  </HStack>
                </Link>
              );
            })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MobileNavMenu;
