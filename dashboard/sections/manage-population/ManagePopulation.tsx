import {
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
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
import { useEffect, useRef, useState } from "react";
import { db } from "../../../app-service/firebase-config";
import Filters from "./components/Filters";
import DeleteConfirmation from "./components/DeleteConfirmation";
import UpdateRecord from "./components/UpdateRecord";
import { Residents, ResidentsModel } from "../../interfaces/appInterface";
import { usePopulation } from "../../../context/ManagePopulationContext";
import getAgeRangeQuery, {
  getExactAgeQuery,
  getGenderQuery,
  getGreaterThanAgeQuery,
  getLessThanAgeQuery,
  getPurokQuery,
  getReligionQuery,
  getStatusQuery,
  getVaccinationStatusQuery,
} from "./utils/getQuery";
import useObserver from "../../../hooks/useObserver";
import FullProfileModal from "./components/FullProfileModal";

function ManagePopulation() {
  const population = usePopulation();
  const [selectedProfile, setSelectedProfile] = useState<ResidentsModel>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [deleteDocRef, setDeleteDocRef] = useState<string>("");
  const [valuesToUpdate, setValuesToUpdate] = useState<ResidentsModel>();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [searchBy, setSearchBy] = useState("Last Name");
  const [prevData, setPrevData] = useState<ResidentsModel>();
  const [direction, setDirection] = useState<string>("");
  const [count, setCount] = useState<number>();
  const [page, setPage] = useState(1);

  const {
    isOpen: isDeleteConfirmationModalOpen,
    onClose: onDeleteConfirmationClose,
    onOpen: onDeleteConfirmationOpen,
  } = useDisclosure();

  const {
    isOpen: isUpdateRecordModalOpen,
    onClose: onUpdateRecordClose,
    onOpen: onUpdateRecordOpen,
  } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onClose: onProfileClose,
    onOpen: onProfileOpen,
  } = useDisclosure();

  // GET RESIDENT RECORDS
  const getResidents = async (): Promise<ResidentsModel[]> => {
    let q: Query;
    switch (population?.selectedFieldName) {
      case "age":
        if (population.selectedAgeFilterType === "Range") {
          q = getAgeRangeQuery(
            population.lowerRange,
            population.higherRange,
            order
          );
        } else if (population.selectedAgeFilterType === "Exact") {
          q = getExactAgeQuery(population.exactAge);
        } else if (population.selectedAgeFilterType === "Greater than") {
          q = getGreaterThanAgeQuery(population.ageGreaterThan, order);
        } else {
          q = getLessThanAgeQuery(population.ageLessThan, order);
        }
        break;
      case "gender":
        q = getGenderQuery(population.selectedSex);
        break;
      case "status":
        q = getStatusQuery(population.status);
        break;
      case "religion":
        q = getReligionQuery(population.selectedReligion);
        break;
      case "purok":
        q = getPurokQuery(population.selectedPurok);
        break;
      case "vaccination_status":
        q = getVaccinationStatusQuery(population.vaccinationStatus);
        break;
      default:
        q = query(collection(db, "residents"));
    }

    let anotherQ: Query = q;

    if (prevData && direction) {
      if (direction === "next") {
        anotherQ = query(
          q,
          orderBy("name.last_name", order),
          limit(15),
          startAfter(prevData.residentData.name.last_name)
        );
      } else if (direction === "prev") {
        anotherQ = query(
          q,
          orderBy("name.last_name", order),
          limitToLast(15),
          endBefore(prevData.residentData.name.last_name)
        );
      }
    } else if (searchFilter) {
      const keyword =
        searchFilter.charAt(0).toUpperCase() + searchFilter.slice(1);
      switch (searchBy) {
        case "Last Name":
          console.log("1");
          anotherQ = query(
            q,
            where("name.last_name", ">=", keyword),
            where("name.last_name", "<", `${keyword}\uf8ff`),
            orderBy("name.last_name", order)
          );
          break;
        case "First Name":
          console.log("2");
          anotherQ = query(
            q,
            where("name.first_name", ">=", keyword),
            where("name.first_name", "<", `${keyword}\uf8ff`),
            orderBy("name.first_name", order)
          );
          break;
        case "Middle Name":
          anotherQ = query(
            q,
            where("name.middle_name", ">=", keyword),
            where("name.middle_name", "<", `${keyword}\uf8ff`),
            orderBy("name.middle_name", order)
          );
          break;
      }
    } else {
      anotherQ = query(q, orderBy("name.last_name", order));
    }

    const snapshot = await getCountFromServer(anotherQ);
    setCount(snapshot.data().count);
    anotherQ = query(anotherQ, limit(15));

    return new Promise((resolve) => {
      const data: ResidentsModel[] = [];
      onSnapshot(anotherQ, (snapshot) => {
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
    isFetched,
    isLoading,
    isRefetching,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["residents", order, prevData, searchFilter],
    queryFn: getResidents,
    keepPreviousData: true,
  });

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, "residents");
    const unSub = onSnapshot(collectionRef, () => {
      refetch();
    });
    return () => {
      unSub();
    };
  }, [refetch]);

  useEffect(() => {
    if (!isUpdateRecordModalOpen) {
      setValuesToUpdate(undefined);
    }
  }, [isUpdateRecordModalOpen]);

  const { ref } = useObserver("manage-population");

  const tableRef: React.MutableRefObject<null> = useRef(null);

  // const handlePrintCurrentFilter = (): void => {
  //   //  const printContents: string | undefined =
  //   //     tableRef?.current?.innerHTML ?? "";
  //   //   const originalContents: string = document.body.innerHTML;
  //   //   document.body.innerHTML = printContents || "";
  //   //   window.print();
  //   //   document.body.innerHTML = originalContents;
  // };

  return (
    <Grid ref={ref} w="100%">
      {/* <Button onClick={handlePrint}>Print</Button> */}
      <TableContainer ref={tableRef} marginTop="2rem" p="2rem">
        <Filters
          order={order}
          searchFilter={searchFilter}
          setOrder={setOrder}
          setSearchFilter={setSearchFilter}
          refetch={refetch}
          isFetching={isRefetching}
          setSearchBy={setSearchBy}
          searchBy={searchBy}
          count={count}
          // handlePrintCurrentFilter={handlePrintCurrentFilter}
        />
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
              <Th>Civil Status</Th>
              {/* <Th>Occupation</Th> */}
              <Th>Religion</Th>
              <Th>Purok</Th>
              <Th>Vaccination Status</Th>
              <Th>Action</Th>
              <Th>More Info</Th>
            </Tr>
          </Thead>
          <Tbody>
            {residentData?.map((resident) => {
              return (
                <Tr key={resident.id}>
                  <Td>
                    <Skeleton isLoaded={isFetched || !isRefetching}>
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
                  {/* <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.occupation}
                    </Skeleton>
                  </Td> */}
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.religion}
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      {resident.residentData.purok}
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
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      <HStack>
                        <Button
                          transition="all .3s ease"
                          fontSize=".8rem"
                          bg="green.500"
                          color="white"
                          _hover={{ bg: "green.400" }}
                          onClick={() => {
                            onUpdateRecordOpen();
                            setValuesToUpdate(resident);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          transition="all .3s ease"
                          bg="red.500"
                          color="white"
                          fontSize=".8rem"
                          _hover={{ bg: "red.400" }}
                          onClick={() => {
                            onDeleteConfirmationOpen();
                            setDeleteDocRef(resident.id);
                          }}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton isLoaded={isFetched}>
                      <Button
                        onClick={() => {
                          setSelectedProfile(resident);
                          onProfileOpen();
                        }}
                        fontSize=".8rem"
                      >
                        Full Profile
                      </Button>
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
              {/* <Th>Occupation</Th> */}
              <Th>Religion</Th>
              <Th>Purok</Th>
              <Th>Vaccination Status</Th>
              <Th>Action</Th>
              <Th>More Info</Th>
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
            bg="#FF6A55"
            _hover={{ opacity: ".9" }}
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
      {deleteDocRef ? (
        <DeleteConfirmation
          docRef={deleteDocRef}
          isOpen={isDeleteConfirmationModalOpen}
          onClose={onDeleteConfirmationClose}
        />
      ) : null}
      {valuesToUpdate ? (
        <UpdateRecord
          isOpen={isUpdateRecordModalOpen}
          onClose={onUpdateRecordClose}
          residentDataToUpdate={valuesToUpdate}
        />
      ) : null}
      {selectedProfile ? (
        <FullProfileModal
          isOpen={isProfileOpen}
          onClose={onProfileClose}
          residentData={selectedProfile}
        />
      ) : null}
    </Grid>
  );
}

export default ManagePopulation;
