/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Box,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import LinesEllipsis from "react-lines-ellipsis";
import { useNavigate } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import { ProjectModel } from "../../../utils/interfaces/AppInterfaces";

interface ProjectProps {
  projectData: ProjectModel;
}

function ProjectPost(props: ProjectProps) {
  const { projectData } = props;
  const navigate = useNavigate();

  const getCommentsCount = async (): Promise<number> => {
    const collectionRef = collection(db, "comments");
    const q = query(collectionRef, where("project_id", "==", projectData.id));
    const snap = await getCountFromServer(q);
    return snap.data().count;
  };

  const { data: commentCount } = useQuery({
    queryKey: ["project-comments-count", projectData.id],
    queryFn: getCommentsCount,
  });

  return (
    <Stack
      margin="auto"
      direction={{ base: "column", lg: "row" }}
      w={{ base: "100%", "2xl": "80%" }}
      borderRadius=".5rem"
      bg="#F6F5FF"
      p="1rem"
      maxH={{ base: "100%", lg: "20rem" }}
      spacing="1.5rem"
      cursor="pointer"
      onClick={() => navigate(projectData.id)}
      boxShadow="2px 2px 16px rgba(0, 0, 0, .1)"
      _hover={{ bg: "#FAF9FE" }}
      transition="all .3s ease"
    >
      <Box flex={1}>
        <Image
          boxShadow="2px 2px 16px rgba(0, 0, 0, .2)"
          borderRadius=".3rem"
          w="100%"
          h="100%"
          objectFit="cover"
          src={projectData.projectData.images[0]}
        />
      </Box>
      <VStack
        spacing={{ base: "1rem", xl: "1.5rem" }}
        align="start"
        justify="center"
        flex={1.5}
      >
        <HStack spacing="1rem">
          <HStack>
            <Avatar size="sm" name="Pansol" />
            <Text fontFamily="inter" fontSize=".9rem" fontWeight="medium">
              Pansol, Lopez
            </Text>
          </HStack>
          <Text
            fontFamily="inter"
            fontSize=".7rem"
            fontWeight="medium"
            bg="palette.tertiary"
            color="palette.accent"
            p=".2rem .8rem"
            w="fit-content"
            marginLeft="2rem"
            borderRadius="5rem"
          >
            {projectData.projectData.projectBy}
          </Text>
        </HStack>
        <Text fontFamily="inter" fontSize="1.3rem" fontWeight="bold">
          {projectData.projectData.title}
        </Text>
        <Text fontSize="1rem">
          <LinesEllipsis
            text={projectData.projectData.description}
            maxLine="4"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Text>
        <HStack spacing="1rem" fontSize=".8rem">
          <HStack>
            <Box>
              <BiCommentDetail />
            </Box>
            <Text>{commentCount}</Text>
          </HStack>
          <Text fontFamily="inter" fontSize=".8rem" fontWeight="medium">
            {`Posted ${moment(
              projectData.projectData.date_posted.toDate()
            ).fromNow()}`}
          </Text>
          <Text
            fontFamily="inter"
            fontWeight="semibold"
            bg={
              projectData.projectData.status === "Finished"
                ? "green.200"
                : projectData.projectData.status === "Ongoing"
                ? "orange.200"
                : "red.200"
            }
            color={
              projectData.projectData.status === "Finished"
                ? "green.600"
                : projectData.projectData.status === "Ongoing"
                ? "orange.600"
                : "red.600"
            }
            p=" .1rem .5rem"
            borderRadius=".5rem"
          >
            {projectData.projectData.status}
          </Text>
        </HStack>
      </VStack>
    </Stack>
  );
}

export default ProjectPost;
