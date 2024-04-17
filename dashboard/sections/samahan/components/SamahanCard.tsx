import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../app-service/firebase-config";
import MembersModal from "./MembersModal";
import UpdateSamahanDetailsModal from "./UpdateSamahanDetailsModal";

interface MemberData {
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface SamahanData {
  area_of_operation: string;
  logo: string;
  title: string;
  contact_number?: string;
  president?: string;
  office_address?: string;
  member: MemberData[];
}

interface SamahanModel {
  samahanData: SamahanData;
  id: string;
}

function SamahanCard(props: SamahanModel) {
  const { samahanData, id } = props;

  const {
    isOpen: isOpenModalOpen,
    onClose: onCloseModalOpen,
    onOpen: onOpenModalOpen,
  } = useDisclosure();

  const {
    isOpen: isMemberModalOpen,
    onClose: onMemberModalClose,
    onOpen: onMemberModalOpen,
  } = useDisclosure();

  return (
    <WrapItem>
      <Center
        w="27rem"
        bg="#F6F5FF"
        p="1rem"
        borderRadius=".3rem"
        boxShadow="2px 2px 15px rgba(0, 0, 0, .1)"
        flexDir="column"
      >
        <Center
          gap="1rem"
          flexDir="column"
          borderRadius=".3rem"
          p="1rem"
          h="15rem"
          bg="#FFC0B8"
          w="100%"
        >
          <Image w="30%" src={samahanData.logo} />
          <Text
            fontWeight="bold"
            textAlign="center"
            fontFamily="inter"
            fontSize="1.2rem"
          >
            {samahanData.title}
          </Text>
        </Center>
        <VStack w="100%" marginTop="1rem" align="start">
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="#FF6A55">
              President:
            </Text>
            <Text>{samahanData.president}</Text>
          </HStack>
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="#FF6A55">
              Area of Operation:
            </Text>
            <Text>{samahanData.area_of_operation || "None"}</Text>
          </HStack>
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="#FF6A55">
              Contact:
            </Text>
            <Text>{samahanData.contact_number || "None"}</Text>
          </HStack>
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="#FF6A55">
              Office Address:
            </Text>
            <Text>{samahanData.office_address || "None"}</Text>
          </HStack>
        </VStack>
        <HStack marginTop="2rem" w="100%" spacing="1rem">
          <Button
            border="1px solid"
            borderColor="#FF6A55"
            bg="transparent"
            color="#FF6A55"
            fontFamily="inter"
            p="1.3rem"
            onClick={onMemberModalOpen}
          >
            Manage Members
          </Button>
          <Button
            bg="#FF6A55"
            color="white"
            fontFamily="inter"
            p="1.3rem"
            onClick={onOpenModalOpen}
            _hover={{ opacity: 0.9 }}
          >
            Update Samahan
          </Button>
        </HStack>
      </Center>
      <UpdateSamahanDetailsModal
        isOpen={isOpenModalOpen}
        onClose={onCloseModalOpen}
        samahan={{ samahanData, id }}
      />
      <MembersModal
        isOpen={isMemberModalOpen}
        onClose={onMemberModalClose}
        memberName={samahanData.member}
        id={id}
      />
    </WrapItem>
  );
}

export default SamahanCard;
