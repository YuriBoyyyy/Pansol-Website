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
} from "@chakra-ui/react";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { BiDownload } from "react-icons/bi";
import { db, storage } from "../../app-service/firebase-config";
import AddDocument from "../../utils/firebase-functions/AddDocument";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddNewsModal(props: ComProps) {
  const { isOpen, onClose } = props;
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const fileTypes = ["JPG", "PNG"];
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
    console.log(file);
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

    let data = {
      title,
      details,
      banner: "",
      date_posted: Timestamp.fromDate(new Date()),
    };

    const storagePromises: Promise<unknown>[] = [];

    if (file) {
      const storageRef = ref(storage, `news/${file?.name}`);
      const uploadPromise = uploadBytes(storageRef, file as Blob)
        .then((res) => {
          return getDownloadURL(res.ref).then((url) => {
            console.log(url);
            data = {
              ...data,
              banner: url,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
      storagePromises.push(uploadPromise);
    }

    Promise.all(storagePromises).then(() => {
      AddDocument("news", data)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          setTitle("");
          setDetails("");
          setFile(null);
          onClose();
          toast({
            title: "News Posted!",
            description: "The community can now see the details of the news.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
          setTitle("");
          setFile(null);
          setDetails("");
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    });

    const mails: string[] = [];
    const collectionRef = collection(db, "subscribed-mails");
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      const { email } = doc.data();
      mails.push(email);
    });

    const mailCollectionRef = collection(db, "mail");
    mails.forEach(async (mail) => {
      await addDoc(mailCollectionRef, {
        message: {
          html: "Pansol posted new news. Check it out! https://pansol-website.vercel.app/news ",
          subject: "Hot News",
        },
        to: mail,
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
        <ModalHeader>Post Latest News</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <Input
              p="1.6rem"
              placeholder="News Title"
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
                  {file ? (
                    <VStack opacity=".5">
                      <Image
                        w="2rem"
                        src={URL.createObjectURL(file)}
                        borderRadius=".5rem"
                      />
                      <Text textAlign="center" fontSize=".8rem">
                        {file.name}
                      </Text>
                    </VStack>
                  ) : (
                    <>
                      <Text
                        textAlign="center"
                        color="#8A8899"
                        fontFamily="inter"
                      >
                        Drag and drop files here, or click to browse
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
            Post News
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddNewsModal;
