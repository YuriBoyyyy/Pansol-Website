/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";

interface AppointmentData {
  first_name: string;
  last_name: string;
  middle_name: string;
  date: string;
  uid: string;
  subject: string;
  additional_info: string;
  status: string;
  document: string;
  document_type: string;
}

interface AppointmentModel {
  appointmentData: AppointmentData;
  id: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: AppointmentModel;
}

function MoreDetailsModal(props: Props) {
  const { appointmentData, isOpen, onClose } = props;
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
        <ModalHeader>
          <VStack>
            <Text>{appointmentData.appointmentData.subject}</Text>
            <Box
              fontFamily="inter"
              fontSize=".9rem"
              fontWeight="normal"
              color="#E84A34"
            >
              <Text textAlign="center">{`${appointmentData.appointmentData.first_name} ${appointmentData.appointmentData.middle_name} ${appointmentData.appointmentData.last_name}`}</Text>
              <Text>{`${moment(appointmentData.appointmentData.date).format(
                "LLL"
              )}`}</Text>
            </Box>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {appointmentData.appointmentData.document_type === "pdf" ? (
              <HStack w="100%" justify="center" paddingBlock="1rem">
                <Button
                  fontFamily="inter"
                  as="a"
                  target="_blank"
                  href={appointmentData.appointmentData.document}
                >
                  See Attached Document
                </Button>
              </HStack>
            ) : (
              <Box w="100%">
                <Image
                  margin="auto"
                  w="100%"
                  src={appointmentData.appointmentData.document}
                />
              </Box>
            )}
            <Text textAlign="center" fontSize=".9rem">
              {appointmentData.appointmentData.additional_info}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="start">
          <Text
            w="-webkit-fit-content"
            p=".3rem .6rem"
            borderRadius=".5rem"
            fontFamily="inter"
            fontSize=".9rem"
            bg={
              // eslint-disable-next-line no-nested-ternary
              appointmentData.appointmentData.status === "Approved"
                ? "green.100"
                : "red.100"
            }
            color={
              appointmentData.appointmentData.status === "Approved"
                ? "green.600"
                : "red.600"
            }
            fontWeight="medium"
          >
            {appointmentData.appointmentData.status}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MoreDetailsModal;
