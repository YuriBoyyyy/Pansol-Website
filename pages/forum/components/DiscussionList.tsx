/* eslint-disable no-nested-ternary */
import { Skeleton, Text, VStack } from "@chakra-ui/react";
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
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { db } from "../../../app-service/firebase-config";
import DiscussionItem from "./DiscussionItem";
import Empty from "../../../assets/empty.json";

interface DiscussionData {
  date_posted: Timestamp;
  discussion_title: string;
  user_id: string;
}

interface DiscussionModel {
  discussionData: DiscussionData;
  id: string;
}

interface ComProps {
  searchFilter: string;
  activeCategory: string;
}

function DiscussionList(props: ComProps) {
  const { searchFilter, activeCategory } = props;
  const [filteredList, setFilteredList] = useState<DiscussionModel[]>([]);

  const getDiscussion = (): Promise<DiscussionModel[]> => {
    const collectionRef: CollectionReference = collection(db, "discussions");
    const q: Query = query(
      collectionRef,
      where("subject", "==", activeCategory),
      orderBy("date_posted", "desc")
    );
    return new Promise((resolve) => {
      const data: DiscussionModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            discussionData: doc.data() as DiscussionData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: discussionDetails,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["discussions", activeCategory],
    queryFn: getDiscussion,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "discussions");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  useEffect(() => {
    if (discussionDetails) {
      const filteredItems = discussionDetails.filter((item) =>
        item.discussionData.discussion_title
          .toLowerCase()
          .includes(searchFilter)
      );
      setFilteredList(filteredItems);
    }
  }, [discussionDetails, searchFilter]);

  return (
    <VStack w="100%" className="forum-discussions">
      {!searchFilter ? (
        discussionDetails && discussionDetails?.length > 0 ? (
          discussionDetails?.map((discussion: DiscussionModel) => (
            <Skeleton key={discussion.id} w="100%" isLoaded={!isFetching}>
              <DiscussionItem discussion={discussion} />
            </Skeleton>
          ))
        ) : (
          <VStack spacing="1rem">
            <Lottie
              loop
              animationData={Empty}
              play
              style={{ width: 250, height: 250, opacity: 0.5 }}
            />
            <Text fontFamily="inter" opacity=".6">
              No topic yet. Create one!
            </Text>
          </VStack>
        )
      ) : (
        filteredList.map((discussion: DiscussionModel) => (
          <DiscussionItem key={discussion.id} discussion={discussion} />
        ))
      )}
      {/* <HStack paddingTop="1rem" justify="end" w="100%">
        <Button
          bg="palette.secondary"
          color="palette.primary"
          _hover={{
            bg: "palette.secondary_hover",
          }}
        >
          Prev
        </Button>
        <Button
          bg="palette.secondary"
          color="palette.primary"
          _hover={{
            bg: "palette.secondary_hover",
          }}
        >
          Next
        </Button>
      </HStack> */}
    </VStack>
  );
}

export default DiscussionList;

// const handleNext = async (lastItem: DiscussionModel) => {
//   const collectionRef: CollectionReference = collection(db, "discussions");
//   const q: Query = query(
//     collectionRef,
//     limit(6),
//     orderBy("date_posted", "desc"),
//     startAfter(lastItem.discussionData.date_posted)
//   );
//   const unSub = onSnapshot(q, (snapshot) => {
//     const data: DiscussionModel[] = [];
//     snapshot.forEach((doc: DocumentSnapshot) => {
//       data.push({
//         discussionData: doc.data() as DiscussionData,
//         id: doc.id,
//       });
//     });
//     setDiscussionDetails(data);
//     setPage(page + 1);
//   });
//   return () => {
//     unSub();
//   };
// };

// const handlePrev = (lastItem: DiscussionModel) => {
//   const collectionRef: CollectionReference = collection(db, "discussions");
//   const q: Query = query(
//     collectionRef,
//     orderBy("date_posted", "desc"),
//     endBefore(lastItem.discussionData.date_posted),
//     limitToLast(6)
//   );
//   const unSub = onSnapshot(q, (snapshot) => {
//     const data: DiscussionModel[] = [];
//     snapshot.forEach((doc: DocumentSnapshot) => {
//       data.push({
//         discussionData: doc.data() as DiscussionData,
//         id: doc.id,
//       });
//     });
//     setDiscussionDetails(data);
//     setPage(page - 1);
//   });
//   return () => {
//     unSub();
//   };
// };
