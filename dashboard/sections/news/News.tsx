import {
  Box,
  Button,
  Center,
  Flex,
  Highlight,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  Query,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";
import LinesEllipsis from "react-lines-ellipsis";
import { db } from "../../../app-service/firebase-config";
import useObserver from "../../../hooks/useObserver";
import AddNewsModal from "../../components/AddNewsModal";
import DeleteNewsModal from "./components/DeleteNewsModal";
import NewsDetailsModal from "./components/NewsDetailsModal";
import UpdateNewsModal from "./components/UpdateNewsModal";

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

function ManageNews() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onClose: onUpdateModalClose,
    onOpen: onUpdateModalOpen,
  } = useDisclosure();

  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onOpen: onAddModalOpen,
  } = useDisclosure();

  const [selectedNewsToUpdate, setSelectedNewsToUpdate] =
    useState<NewsModel | null>();
  const [selectedNews, setSelectedNews] = useState<NewsModel>();
  const [selectedID, setSelectedID] = useState<string>("");

  const getNews = (): Promise<NewsModel[]> => {
    const collectionRef: CollectionReference = collection(db, "news");
    const q: Query = query(collectionRef, orderBy("date_posted", "desc"));
    return new Promise((resolve) => {
      const data: NewsModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            newsData: doc.data() as NewsData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: news,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "news");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      setSelectedNewsToUpdate(null);
    }
  }, [isUpdateModalOpen]);

  const { ref } = useObserver("news");

  return (
    <Box p="2rem" ref={ref}>
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Posted News
      </Text>
      <Box paddingBlockEnd="1.5rem">
        <Button
          fontFamily="inter"
          _hover={{ opacity: 0.9 }}
          bg="#FF6A55"
          color="white"
          onClick={onAddModalOpen}
        >
          Add News
        </Button>
      </Box>
      <Wrap justify="start" p=".5rem" spacing=".8rem">
        {!isFetching
          ? news?.map((item) => {
              return (
                <Flex
                  p="1rem"
                  bg="#FCFCFC"
                  borderRadius=".5rem"
                  // boxShadow="2px 2px 16px rgba(0, 0, 0, .1)"
                  key={item.id}
                  gap="1rem"
                >
                  <Center
                    w="6rem"
                    bg="#FF9E90"
                    paddingBlock="1rem"
                    paddingInline=".4rem"
                    borderRadius=".3rem"
                  >
                    <Box fontSize="3rem" color="palette.primary">
                      <HiOutlineNewspaper />
                    </Box>
                  </Center>
                  <VStack w="22rem" align="start" justify="space-between">
                    <VStack align="start">
                      <Text
                        color="#554E76"
                        fontFamily="inter"
                        fontSize="1.1rem"
                        fontWeight="semibold"
                      >
                        {item.newsData.title}
                      </Text>
                      <Text fontWeight="light" fontSize=".9rem">
                        <LinesEllipsis
                          text={item.newsData.details}
                          maxLine="1"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                        />
                      </Text>
                    </VStack>
                    <HStack w="100%" justify="space-between">
                      <Center borderRadius=".3rem" paddingBlock=".6rem">
                        <Text
                          fontSize=".7rem"
                          fontFamily="inter"
                          fontWeight="medium"
                          color="#FF6A55"
                        >
                          <Highlight
                            query="Posted"
                            styles={{ color: "#626466" }}
                          >
                            {`Posted ${moment(
                              item.newsData.date_posted.toDate()
                            ).fromNow()}`}
                          </Highlight>
                        </Text>
                      </Center>
                      <HStack spacing="1rem">
                        <HStack
                          fontFamily="inter"
                          color="palette.tertiary"
                          cursor="pointer"
                          fontSize=".8rem"
                          fontWeight="normal"
                          opacity=".8"
                          onClick={() => {
                            setSelectedNews(item);
                            onOpen();
                          }}
                        >
                          <Box>
                            <BiDetail />
                          </Box>
                          <Text>More Details</Text>
                        </HStack>
                      </HStack>
                      <Popover placement="right-end">
                        <PopoverTrigger>
                          <Button fontSize=".8rem" fontFamily="inter">
                            Manage
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader border="none">
                            <Text fontFamily="inter">
                              What do you want to do?
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <HStack justify="start">
                              <Button
                                fontSize=".8rem"
                                fontFamily="inter"
                                bg="green.200"
                                color="green.800"
                                _hover={{ opacity: 0.9 }}
                                onClick={() => {
                                  setSelectedNewsToUpdate(item);
                                  onUpdateModalOpen();
                                }}
                              >
                                Update
                              </Button>
                              <Button
                                fontSize=".8rem"
                                fontFamily="inter"
                                bg="red.200"
                                color="red.800"
                                _hover={{ opacity: 0.9 }}
                                onClick={() => {
                                  setSelectedID(item.id);
                                  onDeleteModalOpen();
                                }}
                              >
                                Delete
                              </Button>
                            </HStack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                  </VStack>
                </Flex>
              );
            })
          : null}
      </Wrap>
      {selectedNews ? (
        <NewsDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          newsDetails={selectedNews}
        />
      ) : null}
      {selectedID ? (
        <DeleteNewsModal
          eventID={selectedID}
          onClose={onDeleteModalClose}
          isOpen={isDeleteModalOpen}
        />
      ) : null}
      {selectedNewsToUpdate ? (
        <UpdateNewsModal
          newsDetails={selectedNewsToUpdate}
          onClose={onUpdateModalClose}
          isOpen={isUpdateModalOpen}
        />
      ) : null}
      <AddNewsModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </Box>
  );
}

export default ManageNews;
