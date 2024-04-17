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
import MembersListModal from "./MembersList.Modal";
import ProjectListModal from "./ProjectListModal";

interface MemberModel {
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
  member: MemberModel[];
}

interface SamahanModel {
  samahanData: SamahanData;
  id: string;
}

function SamahanCard(props: SamahanModel) {
  const { samahanData, id } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isProjectOpen,
    onClose: onProjectClose,
    onOpen: onProjectOpen,
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
          bg="palette.accent"
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
            <Text fontWeight="semibold" color="palette.secondary">
              President:
            </Text>
            <Text>{samahanData.president}</Text>
          </HStack>
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="palette.secondary">
              Area of Operation:
            </Text>
            <Text>{samahanData.area_of_operation || "None"}</Text>
          </HStack>
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="palette.secondary">
              Contact:
            </Text>
            <Text>{samahanData.contact_number || "None"}</Text>
          </HStack>
          <HStack fontFamily="inter" fontSize=".8rem">
            <Text fontWeight="semibold" color="palette.secondary">
              Office Address:
            </Text>
            <Text>{samahanData.office_address || "None"}</Text>
          </HStack>
        </VStack>
        <HStack marginTop="2rem" w="100%" spacing="1rem">
          <Button
            border="1px solid"
            borderColor="palette.secondary"
            bg="transparent"
            color="palette.secondary"
            fontFamily="inter"
            p="1.3rem"
            onClick={onOpen}
          >
            Members
          </Button>
          <Button
            bg="palette.secondary"
            color="palette.primary"
            fontFamily="inter"
            p="1.3rem"
            onClick={onProjectOpen}
            _hover={{ bg: "palette.secondary_hover" }}
          >
            Projects
          </Button>
        </HStack>
      </Center>
      {isOpen ? (
        <MembersListModal
          isOpen={isOpen}
          onClose={onClose}
          memberName={samahanData.member}
        />
      ) : null}
      {isProjectOpen ? (
        <ProjectListModal
          isOpen={isProjectOpen}
          onClose={onProjectClose}
          samahan={samahanData.title}
        />
      ) : null}
    </WrapItem>
  );
}

export default SamahanCard;
