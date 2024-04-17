import { Box } from "@chakra-ui/react";

function AboutWave() {
  return (
    <Box
      w="100%"
      pos="absolute"
      top={{ base: "-4rem", md: "-6rem", lg: "-10rem" }}
      zIndex={-1}
    >
      <svg
        viewBox="0 0 1283 234"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 60L70 66.8706C124.127 66.8706 225.75 57.6136 330 28C437.251 15.1156 550 15.8913 661 12C778.5 19.3913 854.999 48.0396 962.25 66.8706C1069.5 85.7017 1175.75 72.8173 1229.88 66.8706L1283 59.9329V212.563H1229.88C1175.75 212.563 1069.5 212.563 962.25 212.563C854.999 212.563 748.751 212.563 641.5 212.563C534.249 212.563 428.001 212.563 320.75 212.563C213.499 212.563 107.251 212.563 53.1242 212.563H0L6 60Z"
          fill="url(#paint0_linear_366_431)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 41.705H53.1242C107.251 41.705 213.499 41.705 320.75 28.6851C428.001 15.6651 534.249 -9.37331 641.5 3.64666C748.751 15.6651 854.999 67.745 962.25 86.7742C1069.5 105.803 1175.75 92.7834 1229.88 86.7742L1283 79.7634V234H1229.88C1175.75 234 1069.5 234 962.25 234C854.999 234 748.751 234 641.5 234C534.249 234 428.001 234 320.75 234C213.499 234 107.251 234 53.1242 234H0V41.705Z"
          fill="#46379E"
        />
        <defs>
          <linearGradient
            id="paint0_linear_366_431"
            x1="83.5"
            y1="96.7813"
            x2="1175"
            y2="96.7813"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDD16E" />
            <stop offset="1" stopColor="#FDD16E" stopOpacity="0.44" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default AboutWave;
