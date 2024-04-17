import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import {
  ProjectData,
  ProjectModel,
} from "../../../utils/interfaces/AppInterfaces";
import Empty from "../../../assets/empty.json";

interface ComProps {
  isOpen: boolean;
  onClose: () => void;
  samahan: string | undefined;
}

function ProjectListModal(props: ComProps) {
  const { isOpen, onClose, samahan } = props;
  const navigate = useNavigate();

  const getProjects = (): Promise<ProjectModel[]> => {
    const format = samahan?.replace(/\s+/g, " ");
    const collectionRef: CollectionReference = collection(db, "projects");
    const q = query(
      collectionRef,
      where("projectBy", "==", format),
      orderBy("date_posted", "desc")
    );
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
    data: projectDetails,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["samahan-projects", samahan],
    queryFn: getProjects,
    enabled: !!samahan,
  });

  console.log(projectDetails);

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "projects");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

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
        <ModalHeader>{`${samahan} Projects`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom="1rem">
          <VStack w="100%">
            {projectDetails && projectDetails?.length < 1 ? (
              <VStack spacing="1rem">
                <Lottie
                  loop
                  animationData={Empty}
                  play
                  style={{ width: 250, height: 250, opacity: 0.5 }}
                />
                <Text fontFamily="inter" opacity=".6">
                  No Projects Yet
                </Text>
              </VStack>
            ) : (
              projectDetails?.map((project: ProjectModel) => {
                return (
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    key={project.id}
                  >
                    <Text fontWeight="medium">{project.projectData.title}</Text>
                    <Button
                      onClick={() =>
                        navigate(`/samahan-projects/${project.id}`)
                      }
                    >
                      More details
                    </Button>
                  </HStack>
                );
              })
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProjectListModal;
