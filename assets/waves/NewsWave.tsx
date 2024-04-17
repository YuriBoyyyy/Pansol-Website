import { Box } from "@chakra-ui/react";
import React from "react";

function NewsWave() {
  return (
    <Box w="100%">
      <svg
        viewBox="0 0 1280 244"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1280 51.5L1208.53 64.3333C1138.13 77.1667 995.2 102.833 853.333 109.25C711.467 115.667 568.533 102.833 426.667 122.083C284.8 141.333 141.867 192.667 71.4667 218.333L3.05176e-05 244V13L71.4667 13C141.867 13 284.8 13 426.667 13C568.533 13 711.467 13 853.333 13C995.2 13 1138.13 13 1208.53 13H1280V51.5Z"
          fill="url(#paint0_linear_461_407)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1280 38.5L1208.53 51.3333C1138.13 64.1667 995.2 89.8333 853.333 96.25C711.467 102.667 568.533 89.8333 426.667 109.083C284.8 128.333 141.867 179.667 71.4667 205.333L3.05176e-05 231V0L71.4667 0C141.867 0 284.8 0 426.667 0C568.533 0 711.467 0 853.333 0C995.2 0 1138.13 0 1208.53 0H1280V38.5Z"
          fill="#46379E"
        />
        <defs>
          <linearGradient
            id="paint0_linear_461_407"
            x1="884.5"
            y1="129"
            x2="3.25655e-05"
            y2="12.9999"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDD16E" />
            <stop offset="1" stopColor="#46379E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default NewsWave;
