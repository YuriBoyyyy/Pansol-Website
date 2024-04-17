import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../app-service/firebase-config";
import { useAuth } from "../../../../context/AuthContext";
import AddDocument from "../../../../utils/firebase-functions/AddDocument";
import { ProjectData } from "../../../../utils/interfaces/AppInterfaces";
import Comments from "../components/Comments";
import ProjectImagesSlider from "../components/ProjectImageSlider";

function ProjectDetails() {
  const firebaseAuth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const getProject = async () => {
    let data: ProjectData | null = null;
    if (id) {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      data = docSnap.data() as ProjectData;
    }
    return data;
  };

  const { data: projectData, isFetching } = useQuery({
    queryKey: ["single-project", id],
    queryFn: getProject,
  });

  const handleComment = async () => {
    setIsSending(true);
    if (!comment) {
      setIsSending(false);
      return;
    }

    const data = {
      comment,
      uid: firebaseAuth?.currentUser?.uid,
      date: Timestamp.fromDate(new Date()),
      project_id: id,
    };

    await AddDocument("comments", data)
      .then((res) => {
        setIsSending(false);
        setComment("");
        console.log(res);
      })
      .catch((err) => {
        setComment("");
        setIsSending(false);
        console.log(err);
      });
  };

  const getCommentsCount = async (): Promise<number> => {
    const collectionRef = collection(db, "comments");
    const q = query(collectionRef, where("project_id", "==", id));
    const snap = await getCountFromServer(q);
    return snap.data().count;
  };

  const { data: commentCount } = useQuery({
    queryKey: ["project-comments-count", id],
    queryFn: getCommentsCount,
  });

  return (
    <Box>
      <HStack
        marginBottom="2rem"
        cursor="pointer"
        onClick={() => navigate("../")}
        paddingTop="1.2rem"
        w="fit-content"
      >
        <Box>
          <TbArrowBackUp />
        </Box>
        <Text fontFamily="inter">Back</Text>
      </HStack>
      <VStack
        spacing={{ base: "1rem", xl: "1.5rem" }}
        align="start"
        h="100%"
        flex={1.5}
      >
        <HStack spacing="2rem">
          <HStack>
            <SkeletonCircle isLoaded={!isFetching}>
              <Avatar size="sm" name="Pansol" />
            </SkeletonCircle>
            <Skeleton startColor="rgba(0, 0, 0, .1)" isLoaded={!isFetching}>
              <Text fontFamily="inter" fontSize=".9rem" fontWeight="medium">
                Pansol, Lopez
              </Text>
            </Skeleton>
          </HStack>
          <Skeleton isLoaded={!isFetching}>
            <HStack spacing="1rem" fontSize=".8rem">
              <HStack>
                <Box>
                  <BiCommentDetail />
                </Box>
                <Text>{commentCount}</Text>
              </HStack>
              <Text fontFamily="inter" fontSize=".8rem" fontWeight="medium">
                {`Posted ${moment(
                  projectData?.date_posted.toDate()
                ).fromNow()}`}
              </Text>
            </HStack>
          </Skeleton>
        </HStack>
        <Skeleton isLoaded={!isFetching}>
          <Text fontFamily="inter" fontSize="1.5rem" fontWeight="bold">
            {projectData?.title}
          </Text>
        </Skeleton>
        <SkeletonText startColor="rgba(0, 0, 0, .1)" isLoaded={!isFetching}>
          <Text fontSize="1rem">{projectData?.description}</Text>
        </SkeletonText>
      </VStack>
      <Skeleton isLoaded={!isFetching}>
        <ProjectImagesSlider images={projectData?.images} />
      </Skeleton>
      <Comments projectID={id} />
      <HStack marginTop="1.5rem" justify="end" spacing="1rem">
        <Input
          w="40rem"
          placeholder="Type a comment..."
          p="1.5rem"
          focusBorderColor="#FF6A55"
          borderColor="#FFC0B8"
          _placeholder={{
            color: "#626466",
            opacity: ".5",
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          p="1.6rem"
          w="8rem"
          color="palette.primary"
          bg="#FF6A55"
          rightIcon={<AiOutlineSend />}
          loadingText="Sending..."
          isLoading={isSending}
          onClick={handleComment}
          transition="all .3s ease"
          _hover={{ bg: "#E84A34" }}
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
}

export default ProjectDetails;
