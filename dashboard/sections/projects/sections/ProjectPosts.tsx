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
  Query,
  query,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import LinesEllipsis from "react-lines-ellipsis";
import { useNavigate } from "react-router-dom";
import UpdateProjectModal from "../components/UpdateProjectModal";
import { db } from "../../../../app-service/firebase-config";
import {
  ProjectData,
  ProjectModel,
} from "../../../../utils/interfaces/AppInterfaces";
import DeleteProjectModal from "../components/DeleteProjectModal";

function ProjectPosts() {
  const navigate = useNavigate();
  const [selectedID, setSelectedID] = useState<string>("");
  const [selectedProjectToUpdate, setSelectedProjectToUpdate] =
    useState<ProjectModel | null>();

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

  const getProjects = (): Promise<ProjectModel[]> => {
    const collectionRef: CollectionReference = collection(db, "projects");
    const q: Query = query(collectionRef, orderBy("date_posted", "desc"));
    return new Promise((resolve) => {
      const data: ProjectModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            projectData: doc.data() as ProjectData,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: projects,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "projects");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      setSelectedProjectToUpdate(null);
    }
  }, [isUpdateModalOpen]);

  console.log(projects);
  return (
    <>
      <Wrap justify="start" p=".5rem" spacing=".8rem">
        {!isFetching
          ? projects?.map((item) => {
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
                      <FaProjectDiagram />
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
                        {item.projectData.title}
                      </Text>
                      <Text fontWeight="light" fontSize=".9rem">
                        <LinesEllipsis
                          text={item.projectData.description}
                          maxLine="3"
                          ellipsis="..."
                          trimRight
                          basedOn="words"
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
                              item.projectData.date_posted.toDate()
                            ).fromNow()}`}
                          </Highlight>
                        </Text>
                      </Center>
                      <HStack spacing="1rem" onClick={() => navigate(item.id)}>
                        <HStack
                          fontFamily="inter"
                          color="palette.tertiary"
                          cursor="pointer"
                          fontSize=".8rem"
                          fontWeight="normal"
                          opacity=".8"
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
                                  setSelectedProjectToUpdate(item);
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

      {selectedID ? (
        <DeleteProjectModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          projectID={selectedID}
        />
      ) : null}

      {selectedProjectToUpdate ? (
        <UpdateProjectModal
          isOpen={isUpdateModalOpen}
          onClose={onUpdateModalClose}
          projectDetails={selectedProjectToUpdate}
        />
      ) : null}
    </>
  );
}

export default ProjectPosts;
