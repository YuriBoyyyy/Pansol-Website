import {
  Box,
  Button,
  Grid,
  HStack,
  Select,
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
  DocumentData,
  DocumentSnapshot,
  endBefore,
  getCountFromServer,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { db } from "../../../app-service/firebase-config";
import { Residents, ResidentsModel } from "../../interfaces/appInterface";
import SearchFilter from "./components/SearchFilter";

function RegisteredVoters() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [searchBy, setSearchBy] = useState("Last Name");
  const [prevData, setPrevData] = useState<ResidentsModel>();
  const [direction, setDirection] = useState<string>("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>();

  const getVoters = async (): Promise<ResidentsModel[]> => {
    const collectionRef = collection(db, "residents");
    let q: Query = query(collectionRef);
    if (prevData && direction) {
      if (direction === "next") {
        q = query(
          collectionRef,
          where("registered_voter", "==", true),
          orderBy("name.last_name", order),
          limit(20),
          startAfter(prevData.residentData.name.last_name)
        );
      } else if (direction === "prev") {
        q = query(
          collectionRef,
          where("registered_voter", "==", true),
          orderBy("name.last_name", order),
          limitToLast(20),
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
            where("registered_voter", "==", true),
            orderBy("name.first_name", order)
          );
          break;
        case "First Name":
          console.log("2");
          q = query(
            collectionRef,
            where("name.first_name", "==", keyword),
            where("registered_voter", "==", true),
            orderBy("name.last_name", order)
          );
          break;
        case "Middle Name":
          console.log("3");
          q = query(
            collectionRef,
            where("name.middle_name", "==", keyword),
            where("registered_voter", "==", true),
            orderBy("name.last_name", order)
          );
          break;
      }
    } else {
      q = query(
        collectionRef,
        where("registered_voter", "==", true),
        orderBy("name.last_name", order)
      );
    }

    const snapshot = await getCountFromServer(q);
    setCount(snapshot.data().count);
    q = query(q, limit(20));

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
    data: votersData,
    isFetched,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["voters", order, prevData, searchFilter],
    queryFn: getVoters,
    keepPreviousData: true,
  });

  const getTotalVotersCount = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("registered_voter", "==", true));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const { data: votersCount } = useQuery({
    queryKey: ["voter-count"],
    queryFn: getTotalVotersCount,
  });

  return (
    <Grid w="100%">
      {/* <Button onClick={handlePrint}>Print</Button> */}
      <TableContainer
        // ref={tableRef}
        marginTop="2rem"
        p="2rem"
      >
        <HStack w="100%" justifyContent="space-between">
          <HStack paddingBottom="1rem" spacing="1.5rem">
            <SearchFilter
              searchBy={searchBy}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
            <HStack gap="1rem">
              <Text
                fontFamily="inter"
                fontSize=".9rem"
                fontWeight="medium"
                opacity=".7"
              >
                Search By
              </Text>
              <Select
                focusBorderColor="#FFC0B8"
                opacity=".6"
                w="12.5rem"
                borderColor="rgba(0, 0, 0, .2)"
                value={searchBy}
                fontSize=".9rem"
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="Last Name">Last Name</option>
                <option value="First Name">First Name</option>
                <option value="Middle Name">Middle Name</option>
              </Select>
            </HStack>
            <Box
              color="#FF6A55"
              fontSize="2rem"
              onClick={() => {
                if (order === "asc") {
                  setOrder("desc");
                } else {
                  setOrder("asc");
                }
              }}
            >
              {order === "asc" ? (
                <AiOutlineSortAscending />
              ) : (
                <AiOutlineSortDescending />
              )}
            </Box>
          </HStack>
          <HStack spacing="1.5rem">
            <Text
              fontWeight="medium"
              fontFamily="inter"
              fontSize=".8rem"
              color="#FF6A55"
            >
              {`Total Entries: ${count}`}
            </Text>
          </HStack>
        </HStack>
        <Table
          variant="simple"
          fontFamily="inter"
          w="100%"
          size="sm"
          bg="#FCFCFC"
          borderRadius=".5rem"
        >
          <TableCaption>Pansol 2023</TableCaption>
          <Thead>
            <Tr>
              <Th p="1rem">Name</Th>
              <Th>Age</Th>
              <Th>Sex</Th>
              <Th>PWD</Th>
              <Th>Illiterate</Th>
              <Th>Precinct</Th>
            </Tr>
          </Thead>
          <Tbody>
            {votersData?.map((voter) => {
              return (
                <Tr key={voter.id}>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {`${voter.residentData.name.last_name}, ${voter.residentData.name.first_name} ${voter.residentData.name.middle_name}`}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {voter.residentData.age}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {voter.residentData.gender}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {voter.residentData.pwd ? "Yes" : "No"}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {voter.residentData.illiterate ? "Yes" : "No"}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {voter.residentData.precinct || "Unset"}
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
              <Th>PWD</Th>
              <Th>Illiterate</Th>
              <Th>Precinct</Th>
            </Tr>
          </Tfoot>
        </Table>
        <HStack w="100%" spacing="1rem" justify="end">
          <Button
            fontFamily="inter"
            color="palette.primary"
            bg="#FF6A55"
            _hover={{ opacity: ".9" }}
            opacity={page === 1 ? 0.5 : 1}
            cursor={page === 1 ? "not-allowed" : "pointer"}
            onClick={() => {
              if (votersData && page > 1) {
                setPrevData(votersData[0]);
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
            bg="#FF6A55"
            _hover={{ opacity: ".9" }}
            onClick={() => {
              if (votersData) {
                setPrevData(votersData[votersData.length - 1]);
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

export default RegisteredVoters;
