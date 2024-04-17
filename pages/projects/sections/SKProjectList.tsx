import { Skeleton, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../../app-service/firebase-config";
import SectionTitle from "../../../components/others/SectionTitle";
import {
  ProjectData,
  ProjectModel,
} from "../../../utils/interfaces/AppInterfaces";
import ProjectPost from "../components/ProjectPost";

function SKProjectList() {
  const getProjects = (): Promise<ProjectModel[]> => {
    const collectionRef: CollectionReference = collection(db, "projects");
    const q = query(
      collectionRef,
      where("projectBy", "==", "SK"),
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

  return (
    <>
      <SectionTitle
        title="SK Projects"
        description="Here are some of the efforts made by the SK"
      />
      <Stack spacing="1.5rem" justify="center" paddingTop="5rem" align="center">
        {projectDetails?.map((project) => {
          return (
            <Skeleton w="100%" isLoaded={!isFetching} key={project.id}>
              <ProjectPost projectData={project} />
            </Skeleton>
          );
        })}
      </Stack>
    </>
  );
}

export default SKProjectList;
