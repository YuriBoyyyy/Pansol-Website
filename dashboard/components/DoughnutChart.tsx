import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { Doughnut } from "react-chartjs-2";
import { db } from "../../app-service/firebase-config";
import getVaccinatedPercentage from "../utils/getPercentage";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const getTotalVaccinated = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "Vaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalUnvaccinated = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "Unvaccinated")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const getTotalFirstDose = async () => {
    const collectionRef = collection(db, "residents");
    const q = query(
      collectionRef,
      where("vaccination_status", "==", "First-dose")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const { data: vaccinatedResidentCount } = useQuery({
    queryKey: ["vaccinated-residents-count"],
    queryFn: getTotalVaccinated,
  });
  const { data: unvaccinatedResidentCount } = useQuery({
    queryKey: ["unvaccinated-residents-count"],
    queryFn: getTotalUnvaccinated,
  });
  const { data: firstDoseResidentCount } = useQuery({
    queryKey: ["first-dose-residents-count"],
    queryFn: getTotalFirstDose,
  });

  const data = {
    labels: ["Vaccinated", "First Dose", "Unvaccinated"],
    datasets: [
      {
        label: "Status Count",
        data: [
          vaccinatedResidentCount,
          firstDoseResidentCount,
          unvaccinatedResidentCount,
        ],
        backgroundColor: ["#FF6A55", "#FFA69A", "#D9D9D9"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Center position="relative" w="60%" margin="auto">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        fontSize="2xl"
      >
        <VStack spacing={0}>
          <Text fontWeight="bold" fontFamily="inter" fontSize="2rem">
            {vaccinatedResidentCount !== undefined &&
            unvaccinatedResidentCount !== undefined &&
            firstDoseResidentCount !== undefined
              ? getVaccinatedPercentage(
                  vaccinatedResidentCount,
                  unvaccinatedResidentCount,
                  firstDoseResidentCount
                )
              : 0}
            %
          </Text>
          <Text
            color="#FF6A55"
            fontFamily="inter"
            fontSize=".8rem"
            fontWeight="semibold"
          >
            Vaccinated
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}

export default DoughnutChart;
