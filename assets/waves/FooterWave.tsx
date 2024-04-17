import { Box } from "@chakra-ui/react";

function FooterWave() {
  return (
    <Box w="100%">
      <svg
        viewBox="0 0 1280 178"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 72.1249L106.667 54.5332C213.333 36.9415 515.167 -9.09162 728.5 8.50006C941.833 26.0917 1099.83 102.317 1206.5 137.5L1280 169V177.5H1173.33C1066.67 177.5 853.333 177.5 640 177.5C426.667 177.5 213.333 177.5 106.667 177.5H0V72.1249Z"
          fill="url(#paint0_linear_386_400)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-0.000976562 60.5957L106.666 42.2057C213.332 23.8158 426.665 -12.9641 639.998 5.42586C853.331 23.8158 1066.67 97.3756 1173.33 134.155L1280 170.935L1280 178.5H1173.33C1066.67 178.5 853.333 178.5 640 178.5C426.667 178.5 213.333 178.5 106.667 178.5H0L-0.000976562 60.5957Z"
          fill="#46379E"
        />
        <defs>
          <linearGradient
            id="paint0_linear_386_400"
            x1="36"
            y1="188.655"
            x2="1228.48"
            y2="174.02"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDD16E" />
            <stop offset="1" stopColor="#FFAE00" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default FooterWave;
