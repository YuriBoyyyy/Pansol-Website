import {
  Image,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";

interface NewsData {
  date_posted: Timestamp;
  title: string;
  details: string;
  banner: string;
}

interface NewsModel {
  newsData: NewsData;
  id: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  newsDetails: NewsModel;
}

function NewsDetailsModal(props: ComProps) {
  const { isOpen, onClose, newsDetails } = props;
  return (
    <Modal
      size={{ base: "md", lg: "xl" }}
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack spacing="1rem" w="100%" align="start">
            <HStack spacing="1rem">
              <Text
                fontSize=".8rem"
                fontFamily="inter"
                fontWeight="medium"
                color="#FF6A55"
              >
                {moment(newsDetails.newsData.date_posted.toDate()).format("LL")}
              </Text>
            </HStack>
            <Text>{newsDetails.newsData.title}</Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Image w="100%" src={newsDetails.newsData.banner} />
            <Text paddingBlockEnd="1rem" fontWeight="light">
              {newsDetails.newsData.details}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default NewsDetailsModal;
