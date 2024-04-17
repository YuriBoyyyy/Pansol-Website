import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../app-service/firebase-config";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddNewResident(props: ModalProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [purok, setPurok] = useState<string>("");
  const [precinct, setPrecinct] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [birthPlace, setBirthPlace] = useState<string>("");
  const [educationalAttainment, setEducationalAttainment] =
    useState<string>("");
  const [vaccinationStatus, setVaccinationStatus] = useState<string>("");
  const [registeredVoter, setRegisteredVoter] = useState<boolean>(false);
  const [isPWD, setIsPWD] = useState<boolean>(false);
  const [is4ps, setIs4ps] = useState<boolean>(false);
  const [isIlliterate, setIsIlliterate] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!firstName || !lastName || !age) {
      toast({
        title: "Incomplete Fields.",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsSubmitting(false);
      return;
    }

    if (!registeredVoter) {
      setPrecinct("N/A");
    }

    const data = {
      age,
      purok,
      gender,
      religion,
      name: {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName || "",
      },
      pwd: isPWD,
      illiterate: isIlliterate,
      precinct,
      registered_voter: registeredVoter,
      status,
      educational_attainment: educationalAttainment,
      is4ps,
      birthday,
      birthPlace,
      vaccination_status: vaccinationStatus,
      occupation: occupation || "N/A",
    };

    const collectionRef = collection(db, "residents");
    await addDoc(collectionRef, data)
      .then((res) => {
        console.log(res);
        toast({
          title: "Record Added.",
          description: "We've added the record for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsSubmitting(false);
        onClose();
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setStatus("");
        setGender("");
        setOccupation("");
        setEducationalAttainment("");
        setBirthPlace("");
        setBirthday("");
        setIs4ps(false);
        setVaccinationStatus("");
        setAge(undefined);
        setPurok("");
        setReligion("");
        setIsIlliterate(false);
        setIsPWD(false);
        setPrecinct("");
        setRegisteredVoter(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setFirstName("");
        setLastName("");
        setOccupation("");
        setEducationalAttainment("");
        setBirthPlace("");
        setBirthday("");
        setIs4ps(false);
        setMiddleName("");
        setStatus("");
        setGender("");
        setVaccinationStatus("");
        setAge(undefined);
        setPurok("");
        setIsIlliterate(false);
        setIsPWD(false);
        setPrecinct("");
        setReligion("");
        setRegisteredVoter(false);
      });
  };

  const { isOpen, onClose } = props;

  return (
    <Modal
      size="5xl"
      isCentered
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Resident</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%" spacing="1rem">
            <Stack direction="row" spacing="1rem" w="100%">
              <Input
                p="1.6rem"
                placeholder="Last Name"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                p="1.6rem"
                placeholder="First Name"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                p="1.6rem"
                placeholder="Middle Name"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Stack>
            <Stack w="100%" direction="row">
              <Input
                p="1.6rem"
                type="date"
                placeholder="Birthday"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <Input
                p="1.6rem"
                placeholder="Birth Place"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
              />
              <Input
                p="1.6rem"
                type="number"
                placeholder="Age"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                max={3}
                value={age}
                step="any"
                onChange={(e) => {
                  if (e.target.value.length <= 3) {
                    setAge(parseInt(e.target.value, 10));
                  }
                }}
              />
              <Input
                p="1.6rem"
                placeholder="Occupation"
                focusBorderColor="#FFC0B8"
                borderColor="rgba(0, 0, 0, .1)"
                _placeholder={{
                  color: "#5C596E",
                  opacity: ".7",
                }}
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Stack>
            <VStack w="100%" spacing="1rem" paddingBlockStart="1rem">
              <Stack w="100%" direction="row">
                <Select
                  defaultValue="Male"
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  value={gender}
                  fontSize=".9rem"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                <Select
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  defaultValue="Select a Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  fontSize=".9rem"
                  // placeholder="Select a Status"
                >
                  <option disabled value="">
                    Status
                  </option>
                  <option value="Single">Single</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Engaged">Live in</option>
                  <option value="Engaged">Solo Parent</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </Select>
                <Select
                  defaultValue="Vaccinated"
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  fontSize=".9rem"
                  value={vaccinationStatus}
                  onChange={(e) => setVaccinationStatus(e.target.value)}
                >
                  <option disabled value="">
                    Vaccination Status
                  </option>
                  <option value="Vaccinated">Vaccinated</option>
                  <option value="Unvaccinated">Unvaccinated</option>
                  <option value="First-dose">First-dose</option>
                </Select>
                <Select
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  value={religion}
                  fontSize=".9rem"
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option disabled value="">
                    Religion
                  </option>
                  <option value="Catholic">Roman Catholic</option>
                  <option value="Iglesia ni Cristo">Iglesia ni Cristo</option>
                  <option value="Baptist">Baptist</option>
                  <option value="Born Again">Born Again</option>
                  <option value="Seventh Day Adventist">
                    Seventh Day Adventist
                  </option>
                </Select>
              </Stack>
            </VStack>
            <HStack w="100%" justify="space-between" flexDir="row-reverse">
              <VStack spacing="1rem">
                <Select
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  w="15rem"
                  value={educationalAttainment}
                  fontSize=".9rem"
                  onChange={(e) => setEducationalAttainment(e.target.value)}
                >
                  <option disabled value="">
                    Educational Attainment
                  </option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Elementary Graduate">
                    Elementary Graduate
                  </option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                  <option value="Highschool Graduate">
                    Highschool Graduate
                  </option>
                  <option value="First Year College">First Year College</option>
                  <option value="Second Year College">
                    Second Year College
                  </option>
                  <option value="Third Year College">Third Year College</option>
                  <option value="Fourth Year College">
                    Fourth Year College
                  </option>
                  <option value="College Graduate">College Graduate</option>
                  <option value="Vocational Graduate">
                    Vocational Graduate
                  </option>
                  <option value="Marritime Graduate">Marritime Graduate</option>
                  <option value="Degree Holder">Degree Holder</option>
                  <option value="Diploma in Information Technology">
                    Diploma in Information Technology
                  </option>
                </Select>
                <Select
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  w="15rem"
                  value={purok}
                  fontSize=".9rem"
                  onChange={(e) => setPurok(e.target.value)}
                >
                  <option disabled value="">
                    Purok
                  </option>
                  <option value="Beach A">Beach A</option>
                  <option value="Beach B">Beach B</option>
                  <option value="Riverside A">Riverside A</option>
                  <option value="Riverside B">Riverside B</option>
                  <option value="Oriental A">Oriental A</option>
                  <option value="Oriental B">Oriental B</option>
                  <option value="Central">Central</option>
                </Select>

                <Select
                  focusBorderColor="#FF9C8E"
                  opacity=".7"
                  w="14.8rem"
                  value={precinct}
                  fontSize=".9rem"
                  disabled={!registeredVoter}
                  onChange={(e) => setPrecinct(e.target.value)}
                >
                  <option value="" disabled>
                    Precinct
                  </option>
                  <option value="SK141A">SK141A</option>
                  <option value="0138A">0138A</option>
                  <option value="0138B">0138B</option>
                  <option value="0139A">0139A</option>
                  <option value="0139B">0139B</option>
                  <option value="0140A">0140A</option>
                  <option value="0140B">0140B</option>
                  <option value="0141A">0141A</option>
                  <option value="0141B">0141B</option>
                </Select>
              </VStack>
              <VStack spacing="1rem">
                <Stack
                  spacing="6rem"
                  w="100%"
                  justify="space-between"
                  direction="row"
                >
                  <Text
                    fontFamily="inter"
                    fontSize=".9rem"
                    fontWeight="medium"
                    opacity=".7"
                  >
                    Is the resident a Registered Voter?
                  </Text>
                  <RadioGroup
                    defaultValue="No"
                    onChange={(e) => setRegisteredVoter(() => e === "Yes")}
                  >
                    <Stack direction="row" spacing="2rem">
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Stack w="100%" justify="space-between" direction="row">
                  <Text
                    fontFamily="inter"
                    fontSize=".9rem"
                    fontWeight="medium"
                    opacity=".7"
                  >
                    Is the resident a PWD?
                  </Text>
                  <RadioGroup
                    defaultValue="No"
                    onChange={(e) => setIsPWD(() => e === "Yes")}
                  >
                    <Stack direction="row" spacing="2rem">
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Stack w="100%" justify="space-between" direction="row">
                  <Text
                    fontFamily="inter"
                    fontSize=".9rem"
                    fontWeight="medium"
                    opacity=".7"
                  >
                    Is the resident illiterate?
                  </Text>
                  <RadioGroup
                    defaultValue="No"
                    onChange={(e) => setIsIlliterate(() => e === "Yes")}
                  >
                    <Stack direction="row" spacing="2rem">
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Stack w="100%" justify="space-between" direction="row">
                  <Text
                    fontFamily="inter"
                    fontSize=".9rem"
                    fontWeight="medium"
                    opacity=".7"
                  >
                    Is the resident part of 4P's?
                  </Text>
                  <RadioGroup
                    defaultValue="No"
                    onChange={(e) => setIs4ps(() => e === "Yes")}
                  >
                    <Stack direction="row" spacing="2rem">
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
              </VStack>
            </HStack>
          </VStack>
          <Divider paddingBlock="1rem" />
          <ModalFooter paddingBlock="1rem" paddingInline="0">
            <Button
              p="1.5rem"
              bg="#FF6A55"
              color="white"
              onClick={handleSubmit}
              _hover={{
                opacity: 0.9,
              }}
              isLoading={isSubmitting}
              loadingText="Adding..."
            >
              Add Resident
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddNewResident;
