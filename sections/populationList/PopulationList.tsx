import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  DocumentSnapshot,
  endBefore,
  getCountFromServer,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  Query,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../app-service/firebase-config";
import SectionTitle from "../../components/others/SectionTitle";
import {
  Residents,
  ResidentsModel,
} from "../../dashboard/interfaces/appInterface";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";
import Filters from "./components/Filters";

function PopulationList() {
  const { purok } = useParams();
  const { ref } = useObserver("Purok");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchBy, setSearchBy] = useState("Last Name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const [prevData, setPrevData] = useState<ResidentsModel>();
  const [direction, setDirection] = useState<string>("");
  const [page, setPage] = useState(1);

  const getResidents = async (): Promise<ResidentsModel[]> => {
    const collectionRef = collection(db, "residents");
    let q: Query;
    if (prevData && direction) {
      if (direction === "next") {
        q = query(
          collectionRef,
          where("purok", "==", purok),
          orderBy("name.last_name", order),
          limit(10),
          startAfter(prevData.residentData.name.last_name)
        );
      } else if (direction === "prev") {
        q = query(
          collectionRef,
          where("purok", "==", purok),
          orderBy("name.last_name", order),
          limitToLast(10),
          endBefore(prevData.residentData.name.last_name)
        );
      }
    } else if (searchFilter) {
      const keyword =
        searchFilter.charAt(0).toUpperCase() + searchFilter.slice(1);
      switch (searchBy) {
        case "Last Name":
          console.log("1");
          q = query(
            collectionRef,
            where("name.last_name", "==", keyword),
            where("purok", "==", purok),
            orderBy("name.first_name", order),
            limit(10)
          );
          break;
        case "First Name":
          console.log("2");
          q = query(
            collectionRef,
            where("name.first_name", "==", keyword),
            where("purok", "==", purok),
            orderBy("name.last_name", order),
            limit(10)
          );
          break;
        case "Middle Name":
          console.log("3");
          q = query(
            collectionRef,
            where("name.middle_name", "==", keyword),
            where("purok", "==", purok),
            orderBy("name.last_name", order),
            limit(10)
          );
          break;
      }
    } else {
      q = query(
        collectionRef,
        where("purok", "==", purok),
        orderBy("name.last_name", order),
        limit(10)
      );
    }
    return new Promise((resolve) => {
      const data: ResidentsModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            residentData: doc.data() as Residents,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const {
    data: residentData,
    isFetching,
    isFetched,
    isFetchedAfterMount,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["residents-population-list", purok, order, prevData],
    queryFn: getResidents,
    keepPreviousData: true,
  });

  const getTotalPurokResidentCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", purok));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const { data: purokResidentCount } = useQuery({
    queryKey: ["purok-resident-count"],
    queryFn: getTotalPurokResidentCount,
  });

  return (
    <Grid paddingTop="10rem" ref={ref} w={breakPoints} margin="auto">
      {/* <Button onClick={handlePrint}>Print</Button> */}
      <HStack
        cursor="pointer"
        paddingBottom="1.8rem"
        onClick={() => navigate("../")}
        w="fit-content"
      >
        <Box>
          <TbArrowBackUp />
        </Box>
        <Text fontFamily="inter">Back</Text>
      </HStack>
      <SectionTitle
        title={purok || ""}
        description="Resident record of the purok."
      />
      <TableContainer marginTop="2rem" p="1rem .5rem">
        <Filters
          order={order}
          searchFilter={searchFilter}
          setOrder={setOrder}
          setSearchFilter={setSearchFilter}
          residentDataLength={residentData?.length || 0}
          refetch={refetch}
          isFetching={isFetching}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          purokResidentCount={purokResidentCount}
          //   handlePrintCurrentFilter={handlePrintCurrentFilter}
        />
        <Table
          variant="simple"
          fontFamily="inter"
          w="100%"
          size="sm"
          bg="#F6F5FF"
          borderRadius=".5rem"
        >
          <TableCaption>Pansol 2023</TableCaption>
          <Thead>
            <Tr>
              <Th p="1rem">Name</Th>
              <Th>Age</Th>
              <Th>Sex</Th>
              <Th>Civil Status</Th>
              <Th>Occupation</Th>
              <Th>Religion</Th>
              <Th>Vaccination Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {residentData?.map((resident) => {
              return (
                <Tr key={resident.id}>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {`${resident.residentData.name.last_name}, ${resident.residentData.name.first_name} ${resident.residentData.name.middle_name}`}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.age}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.gender}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.status}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.occupation}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.religion}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      <Text
                        fontSize=".85rem"
                        fontWeight="medium"
                        bg={
                          // eslint-disable-next-line no-nested-ternary
                          resident.residentData.vaccination_status ===
                          "Vaccinated"
                            ? "green.100"
                            : resident.residentData.vaccination_status ===
                              "Unvaccinated"
                            ? "red.100"
                            : "orange.100"
                        }
                        borderRadius=".3rem"
                        w="fit-content"
                        p=".2rem .5rem"
                      >
                        {resident.residentData.vaccination_status}
                      </Text>
                    </Skeleton>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th p="1rem">Name</Th>
              <Th>Age</Th>
              <Th>Sex</Th>
              <Th>Civil Status</Th>
              <Th>Occupation</Th>
              <Th>Religion</Th>
              <Th>Vaccination Status</Th>
            </Tr>
          </Tfoot>
        </Table>
        <HStack w="100%" spacing="1rem" justify="end">
          <Button
            fontFamily="inter"
            color="palette.primary"
            bg="palette.secondary"
            _hover={{ bg: "palette.secondary_hover" }}
            opacity={page === 1 ? 0.5 : 1}
            cursor={page === 1 ? "not-allowed" : "pointer"}
            onClick={() => {
              if (residentData && page > 1) {
                setPrevData(residentData[0]);
                setDirection("prev");
                setPage((prev) => prev - 1);
              }
            }}
          >
            Prev
          </Button>
          {/* <Text
            fontFamily="inter"
            fontWeight="bold"
            fontSize="1.2rem"
            opacity=".8"
          >
            {page}
          </Text> */}
          <Button
            fontFamily="inter"
            color="palette.primary"
            bg="palette.secondary"
            _hover={{ bg: "palette.secondary_hover" }}
            onClick={() => {
              if (residentData) {
                setPrevData(residentData[residentData.length - 1]);
                setDirection("next");
                setPage((prev) => prev + 1);
              }
            }}
          >
            Next
          </Button>
        </HStack>
      </TableContainer>
    </Grid>
  );
}

export default PopulationList;
