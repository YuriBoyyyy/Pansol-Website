import {
  Avatar,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ResidentsModel } from "../../../interfaces/appInterface";

function FullProfileModal({
  isOpen,
  onClose,
  residentData,
}: {
  isOpen: boolean;
  onClose: () => void;
  residentData: ResidentsModel;
}) {
  return (
    <Modal
      size="2xl"
      isCentered
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Resident Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom="2rem">
          <VStack gap="1rem">
            <HStack align="center" justify="start" w="100%" gap="1rem">
              <Avatar
                size="2xl"
                bg="#FF6A55"
                color="white"
                name={residentData.residentData.name.first_name}
              />
              <VStack spacing={0} align="start" justify="center">
                <HStack spacing="1rem">
                  <Text
                    fontSize=".7rem"
                    fontWeight="medium"
                    marginBlock=".5rem"
                    fontFamily="inter"
                    border="1px solid"
                    borderColor={
                      // eslint-disable-next-line no-nested-ternary
                      residentData.residentData.vaccination_status ===
                      "Vaccinated"
                        ? "green.500"
                        : residentData.residentData.vaccination_status ===
                          "Unvaccinated"
                        ? "red.500"
                        : "orange.500"
                    }
                    color={
                      // eslint-disable-next-line no-nested-ternary
                      residentData.residentData.vaccination_status ===
                      "Vaccinated"
                        ? "green.500"
                        : residentData.residentData.vaccination_status ===
                          "Unvaccinated"
                        ? "red.500"
                        : "orange.500"
                    }
                    bg={
                      // eslint-disable-next-line no-nested-ternary
                      residentData.residentData.vaccination_status ===
                      "Vaccinated"
                        ? "green.100"
                        : residentData.residentData.vaccination_status ===
                          "Unvaccinated"
                        ? "red.100"
                        : "orange.100"
                    }
                    borderRadius=".3rem"
                    w="fit-content"
                    p=".2rem .5rem"
                  >
                    {residentData.residentData.vaccination_status}
                  </Text>
                  <Text
                    border="1px solid"
                    borderColor="#FF6A55"
                    color="#FF6A55"
                    borderRadius=".3rem"
                    p=".1rem .5rem"
                    fontSize=".7rem"
                    fontWeight="medium"
                    fontFamily="inter"
                  >
                    {residentData.residentData.purok}
                  </Text>
                </HStack>
                <Text fontSize="1.2rem" fontWeight="semibold">
                  {residentData.residentData.name.first_name}
                </Text>
                <HStack>
                  <Text>{residentData.residentData.name.last_name},</Text>
                  <Text>{residentData.residentData.name.middle_name}</Text>
                </HStack>
              </VStack>
            </HStack>
            <Divider />
            <Text
              textAlign="start"
              w="100%"
              fontFamily="inter"
              fontSize="1.1rem"
              fontWeight="bold"
              opacity=".6"
            >
              Personal Information
            </Text>
            <Wrap align="start" w="100%" spacing="2rem">
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Age
                  </Text>
                  <Text>{residentData.residentData.age}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Birthday
                  </Text>
                  <Text>{residentData.residentData.birthday}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Birth Place
                  </Text>
                  <Text>{residentData.residentData.birthPlace}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Sex
                  </Text>
                  <Text>{residentData.residentData.gender}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Civil Status
                  </Text>
                  <Text>{residentData.residentData.status}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Religion
                  </Text>
                  <Text>{residentData.residentData.religion}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Educational Attainment
                  </Text>
                  <Text>
                    {residentData.residentData.educational_attainment}
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Occupation
                  </Text>
                  <Text>{residentData.residentData.occupation}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Illiterate
                  </Text>
                  <Text>
                    {residentData.residentData.illiterate ? "Yes" : "No"}
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    PWD
                  </Text>
                  <Text>{residentData.residentData.pwd ? "Yes" : "No"}</Text>
                </VStack>
              </WrapItem>
            </Wrap>
            <Divider />
            <Text
              textAlign="start"
              w="100%"
              fontFamily="inter"
              fontSize="1.1rem"
              fontWeight="bold"
              opacity=".6"
            >
              Records
            </Text>
            <Wrap align="start" w="100%" spacing="2rem">
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    4P's
                  </Text>
                  <Text>{residentData.residentData.is4ps ? "Yes" : "No"}</Text>
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack align="start">
                  <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                    Registered Voter
                  </Text>
                  <Text>
                    {residentData.residentData.registered_voter ? "Yes" : "No"}
                  </Text>
                </VStack>
              </WrapItem>
              {residentData.residentData.registered_voter ? (
                <WrapItem>
                  <VStack align="start">
                    <Text fontFamily="inter" fontSize=".75rem" color="#FF6A55">
                      Precinct
                    </Text>
                    <Text>{residentData.residentData.precinct}</Text>
                  </VStack>
                </WrapItem>
              ) : null}
            </Wrap>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FullProfileModal;
