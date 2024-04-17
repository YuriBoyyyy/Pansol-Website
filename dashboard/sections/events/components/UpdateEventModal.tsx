import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { BiDownload } from "react-icons/bi";
import { db, storage } from "../../../../app-service/firebase-config";

interface EventData {
  date: string;
  date_posted: Timestamp;
  title: string;
  details: string;
  images: string[];
  banner: string;
}

interface EventModel {
  eventData: EventData;
  id: string;
}

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: EventModel;
}

interface UpdateEventModel {
  title: string;
  date: string;
  details: string;
  images: string[];
}

function UpdateEventsModal(props: ComProps) {
  const { isOpen, onClose, eventData } = props;
  const [title, setTitle] = useState<string>(eventData.eventData.title);
  const [details, setDetails] = useState<string>(eventData.eventData.details);
  const [date, setDate] = useState<string>(eventData.eventData.date);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
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

  const handleUpdate = async () => {
    setIsSubmitting(true);
    if (!title || !details || !date) {
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

    let data = {
      title,
      details,
      date,
      images: [""],
    };

    const urlList: string[] = [];
    const storagePromises: Promise<unknown>[] = [];

    if (files.length > 0) {
      files.forEach((item) => {
        const storageRef = ref(storage, `events/${item?.name}`);
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
      const docRef = doc(db, "events", eventData.id);
      updateDoc(docRef, data)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          onClose();
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
        });
    });
  };
  return (
    <Modal
      size="xl"
      preserveScrollBarGap
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <Input
              p="1.6rem"
              placeholder="Event Title"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              p="1.6rem"
              type="datetime-local"
              placeholder="Event Date"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Textarea
              p="1.6rem"
              placeholder="Details"
              focusBorderColor="#FFC0B8"
              borderColor="rgba(0, 0, 0, .1)"
              h="15rem"
              maxH="20rem"
              minH="10rem"
              _placeholder={{
                color: "#5C596E",
                opacity: ".7",
              }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <Center
              w="100%"
              sx={{
                label: {
                  w: "100%",
                  h: "100%",
                },
              }}
            >
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                multiple
                hoverTitle={null}
                dropMessageStyle={{ display: "none" }}
              >
                <VStack
                  borderRadius=".5rem"
                  justify="center"
                  bg="#FEF6F4"
                  w="100%"
                  h="100%"
                  border="1px dashed #8A8899"
                  transition="all .3s ease"
                  _hover={{ bg: "#FEEEEC" }}
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
                        Attach Event Pictures Here.
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
            onClick={handleUpdate}
            isLoading={isSubmitting}
            loadingText="Updating..."
          >
            Update Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateEventsModal;
