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
import { Outlet } from "react-router-dom";
import { db } from "../../../app-service/firebase-config";
import {
  ProjectData,
  ProjectModel,
} from "../../../utils/interfaces/AppInterfaces";
import AddProjectsModal from "../../components/AddProjectsModal";
import DeleteProjectModal from "./components/DeleteProjectModal";
import UpdateProjectModal from "./components/UpdateProjectModal";

function ManageProjects() {
  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onOpen: onAddModalOpen,
  } = useDisclosure();
  return (
    <Box p="2rem">
      <Text
        fontSize="1.5rem"
        paddingBlockEnd="2rem"
        fontWeight="semibold"
        fontFamily="inter"
      >
        Posted Projects
      </Text>
      <Box paddingBlockEnd="1.5rem">
        <Button
          fontFamily="inter"
          _hover={{ opacity: 0.9 }}
          bg="#FF6A55"
          color="white"
          onClick={onAddModalOpen}
        >
          Add Project
        </Button>
      </Box>
      <Outlet />
      <AddProjectsModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </Box>
  );
}

export default ManageProjects;
