import {
  Doughnut,
  Pie,
  PolarArea,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsPeople } from "react-icons/bs";
import { db } from "../../../app-service/firebase-config";
import { ResidentsModel } from "../../../dashboard/interfaces/appInterface";
import MoreInfo from "./MoreInfo";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

function PolarAreaChart() {
  const getBeachAPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Beach A"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const getBeachBPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Beach B"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const riversideAPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Riverside A"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const riversideBPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Riverside B"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const orientalAPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Oriental A"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const orientalBPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Oriental B"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };
  const centralPopulation = async (): Promise<number> => {
    const collectionRef = collection(db, "residents");
    const q = query(collectionRef, where("purok", "==", "Central"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  const { data: beachACount } = useQuery({
    queryKey: ["beach-a-count"],
    queryFn: getBeachAPopulation,
  });
  const { data: beachBCount } = useQuery({
    queryKey: ["beach-b-count"],
    queryFn: getBeachBPopulation,
  });
  const { data: riversideACount } = useQuery({
    queryKey: ["riverside-a-count"],
    queryFn: riversideAPopulation,
  });
  const { data: riversideBCount } = useQuery({
    queryKey: ["riverside-b-count"],
    queryFn: riversideBPopulation,
  });
  const { data: orientalACount } = useQuery({
    queryKey: ["oriental-a-count"],
    queryFn: orientalAPopulation,
  });
  const { data: orientalBCount } = useQuery({
    queryKey: ["oriental-b-count"],
    queryFn: orientalBPopulation,
  });
  const { data: centralCount } = useQuery({
    queryKey: ["central-count"],
    queryFn: centralPopulation,
  });

  const data = {
    labels: [
      "Beach A",
      "Beach B",
      "Riverside A",
      "Riverside B",
      "Oriental A",
      "Oriental B",
      "Central",
    ],
    datasets: [
      {
        label: "# of Population",
        data: [
          beachACount,
          beachBCount,
          riversideACount,
          riversideBCount,
          orientalACount,
          orientalBCount,
          centralCount,
        ],
        backgroundColor: [
          "rgba(70, 25, 187, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 106, 200, 0.5)",
          "rgba(170, 166, 10, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 119, 94, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [selected, setSelected] = useState<string>("");
  const [selectedBG, setSelectedBG] = useState<string>("");

  type CanvasClickHandler = MouseEventHandler<HTMLCanvasElement>;
  const chartRef = useRef<Chart>(null);
  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current !== null) {
      console.log(getElementsAtEvent(chartRef.current, event));
      const element = getElementsAtEvent(chartRef.current, event);
      setSelectedBG(element[0].element.options.backgroundColor);
      switch (element[0].index) {
        case 0:
          setSelected("Beach A");
          break;
        case 1:
          setSelected("Beach B");
          break;
        case 2:
          setSelected("Riverside A");
          break;
        case 3:
          setSelected("Riverside B");
          break;
        case 4:
          setSelected("Oriental A");
          break;
        case 5:
          setSelected("Oriental B");
          break;
        case 6:
          setSelected("Central");
          break;
      }
    }
  };

  return (
    <Box>
      <Text
        fontWeight="semibold"
        fontFamily="inter"
        textAlign="center"
        paddingBlockEnd="5rem"
      >
        Total Population By Purok
      </Text>
      <Center w="100%" gap="2rem" flexDir={{ base: "column", xl: "row" }}>
        <Center h={{ base: "100%", lg: "45rem" }} w="100%" flex={1}>
          <Pie
            ref={chartRef}
            data={data}
            onClick={onClick as CanvasClickHandler}
          />
          <style>{`
        canvas:hover {
          cursor: pointer;
        }
      `}</style>
        </Center>
        <AnimatePresence>
          {selected ? (
            <MoreInfo
              setSelected={setSelected}
              selected={selected}
              selectedBG={selectedBG}
            />
          ) : null}
        </AnimatePresence>
      </Center>
    </Box>
  );
}

export default PolarAreaChart;
