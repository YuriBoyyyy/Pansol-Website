import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { BiDownload } from "react-icons/bi";
import { db, storage } from "../../app-service/firebase-config";
import { ProjectData } from "../../utils/interfaces/AppInterfaces";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddProjectsModal(props: ComProps) {
  const { isOpen, onClose } = props;
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [status, setStatus] = useState<string>("Ongoing");
  const [projectBy, setProjectBy] = useState<string>("Barangay");
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [objectURL, setObjectUrl] = useState<string[]>([]);
  const fileTypes = ["JPG", "PNG"];
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (file: File) => {
    const filesArray = Object.values(file);
    filesArray.forEach((item) => {
      setObjectUrl((prev) => [URL.createObjectURL(item), ...prev]);
    });
    setFiles(filesArray);
  };

  const handlePost = async () => {
    setIsSubmitting(true);
    if (!title || !details) {
      toast({
        title: "Missing Fields",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsSubmitting(false);
      return;
    }

    let data: Partial<ProjectData> = {
      title,
      status,
      projectBy,
      description: details,
      date_posted: Timestamp.fromDate(new Date()),
      images: [""],
    };

    const urlList: string[] = [];
    const storagePromises: Promise<unknown>[] = [];

    if (files.length > 0) {
      files.forEach((item) => {
        const storageRef = ref(storage, `projects/${item?.name}`);
        const uploadPromise = uploadBytes(storageRef, item as Blob)
          .then((res) => {
            console.log(res);
            return getDownloadURL(res.ref).then((url) => {
              urlList.push(url);
            });
          })
          .catch((err) => {
            console.log(err);
          });
        data = {
          ...data,
          images: urlList,
        };
        storagePromises.push(uploadPromise);
      });
    }

    Promise.all(storagePromises).then(() => {
      const collectionRef = collection(db, "projects");
      addDoc(collectionRef, data)
        .then((res) => {
          console.log(res);
          toast({
            title: "Project Posted",
            description: "The community can now see the current project.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setIsSubmitting(false);
          setTitle("");
          setDetails("");
          setProjectBy("Barangay");
          setStatus("Ongoing");
          setFiles([]);
          onClose();
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setTitle("");
          setProjectBy("Barangay");
          setDetails("");
          setStatus("Ongoing");
          setFiles([]);
          setIsSubmitting(false);
        });
    });
  };

  return (
    <Modal
      size="2xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post A New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <HStack w="100%" justifyContent="space-between">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="medium"
                opacity=".7"
              >
                Select Current Project Status
              </Text>
              <Select
                defaultValue="Beach A"
                focusBorderColor="#FF9C8E"
                opacity=".7"
                w="12.5rem"
                value={status}
                fontSize=".9rem"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Paused">Paused</option>
                <option value="Finished">Finished</option>
              </Select>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="medium"
                opacity=".7"
              >
                Project By
              </Text>
              <Select
                focusBorderColor="#FF9C8E"
                opacity=".7"
                fontSize=".9rem"
                w="18rem"
                value={projectBy}
                onChange={(e) => setProjectBy(e.target.value)}
              >
                <option value="Barangay">Barangay</option>
                <option value="SK">SK</option>
                <option value="Samahan ng mga Mangingisda">
                  Samahan ng mga Mangingisda
                </option>
                <option value="Coconut Farmers Association">
                  Coconut Farmers Association
                </option>
                <option value="Pansol Bound Line">Pansol Bound Line</option>
                <option value="Pansol Farmers Association">
                  Pansol Farmers Association
                </option>
                <option value="Pansol Farmers Association">
                  Senior Citizens Association
                </option>
                <option value="4K Kababaihan Kabalikatan Para sa Kapakanan at Kaunlaran ng Bayan">
                  4K Kababaihan Kabalikatan Para sa Kapakanan at Kaunlaran ng
                  Bayan
                </option>
              </Select>
            </HStack>
            <Input
              p="1.6rem"
              placeholder="Project Title"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              p="1.6rem"
              placeholder="Details"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              h="25rem"
              maxH="30rem"
              minH="20rem"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <Center
              flex={1}
              sx={{
                label: {
                  w: "100%",
                  h: "100%",
                },
              }}
              w="100%"
            >
              <FileUploader
                handleChange={handleChange}
                name="file"
                multiple
                types={fileTypes}
                hoverTitle={null}
                dropMessageStyle={{ display: "none" }}
              >
                <VStack
                  borderRadius=".5rem"
                  justify="center"
                  bg="#FAF4F3"
                  w="100%"
                  h="100%"
                  border="1px dashed #8A8899"
                  transition="all .3s ease"
                  _hover={{ bg: "#F9F0EE" }}
                  cursor="pointer"
                  p="2rem"
                >
                  {files.length > 0 ? (
                    <Wrap justify="center" opacity=".5">
                      {files.map((item, index) => {
                        return (
                          <WrapItem key={item.name}>
                            <Image
                              w="2rem"
                              src={objectURL[index]}
                              borderRadius=".5rem"
                            />
                            <Text textAlign="center" fontSize=".8rem">
                              {item.name}
                            </Text>
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                  ) : (
                    <>
                      <Text
                        textAlign="center"
                        color="#8A8899"
                        fontFamily="inter"
                      >
                        Attach Project Pictures Here.
                      </Text>
                      <Box fontSize="3rem" color="#8A8899">
                        <BiDownload />
                      </Box>
                    </>
                  )}
                </VStack>
              </FileUploader>
            </Center>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            _hover={{ opacity: 0.9 }}
            bg="#FF6A55"
            color="white"
            p="1.5rem"
            onClick={handlePost}
            isLoading={isSubmitting}
            loadingText="Posting..."
          >
            Post Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProjectsModal;
