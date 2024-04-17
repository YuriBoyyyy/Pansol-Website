import {
  Box,
  Center,
  Divider,
  Flex,
  Highlight,
  HStack,
  Skeleton,
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
  Query,
  query,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";
import LinesEllipsis from "react-lines-ellipsis";
import { db } from "../../app-service/firebase-config";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import MoreDetailsModal from "./components/MoreNewsDetailsModal";
import NewsHeader from "./components/NewsHeader";

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

function News(): JSX.Element {
  const { ref } = useObserver("News");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedNews, setSelectedNews] = useState<NewsModel>();

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
  return (
    <Box ref={ref}>
      <NewsHeader />
      <Box w={breakPoints} margin="auto">
        <Wrap justify="center" p=".5rem" spacing=".8rem">
          {news?.map((item) => {
            return (
              <Skeleton key={item.id} isLoaded={!isFetching}>
                <Flex
                  p="1rem"
                  bg="#F6F5FF"
                  borderRadius=".5rem"
                  boxShadow="2px 2px 16px rgba(0, 0, 0, .1)"
                  gap="1rem"
                  h="10rem"
                >
                  <Center
                    w="6rem"
                    bg="#6E61BE"
                    paddingBlock="1rem"
                    paddingInline=".4rem"
                    borderRadius=".3rem"
                  >
                    <Box fontSize="3rem" color="palette.primary">
                      <HiOutlineNewspaper />
                    </Box>
                  </Center>
                  <VStack w="16rem" align="start" justify="space-between">
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
                      <Center
                        bg="palette.tertiary"
                        borderRadius=".3rem"
                        p=".6rem"
                      >
                        <Text
                          fontSize=".7rem"
                          fontFamily="inter"
                          fontWeight="medium"
                          color="palette.primary"
                        >
                          <Highlight
                            query="Posted"
                            styles={{ color: "palette.accent" }}
                          >
                            {`Posted ${moment(
                              item.newsData.date_posted.toDate()
                            ).fromNow()}`}
                          </Highlight>
                        </Text>
                      </Center>
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
                  </VStack>
                </Flex>
              </Skeleton>
            );
          })}
        </Wrap>
      </Box>
      {selectedNews ? (
        <MoreDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          newsDetails={selectedNews}
        />
      ) : null}
    </Box>
  );
}

export default News;
