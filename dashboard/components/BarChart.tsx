import { Box, HStack, Select } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import SectionTitle from "./SectionTitle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Population Overview",
    },
  },
  scales: {
    x: {
      grid: {
        offset: true,
      },
    },
  },
  borderRadius: 8,
};

const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

export const data = {
  labels,
  datasets: [
    {
      label: "Year",
      data: labels.map((_, index) => index),
      backgroundColor: labels.map(
        (_, index) => `rgba(255, 106, 85, 0.${index + 1})`
      ),
    },
  ],
};

function BarChart() {
  return (
    <Box>
      <HStack>
        <SectionTitle title="Population Overview" justify="start" />
        <Select
          placeholder="2017-2023"
          fontSize=".9rem"
          w="10rem"
          _focusVisible={{ borderColor: "#FFC0B8" }}
        >
          <option value="option1">2011-2017</option>
          <option value="option2">2005-2011</option>
        </Select>
      </HStack>
      <Bar options={options} data={data} />
    </Box>
  );
}

export default BarChart;
