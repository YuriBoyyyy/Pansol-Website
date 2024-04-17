import { Box } from "@chakra-ui/react";

interface SizeProps {
  width: string;
  height: string;
}

function HomeWave(props: SizeProps) {
  const { width, height } = props;

  return (
    <Box
      w={width}
      h={height}
      border="0"
      fill="palette.secondary"
      pos="absolute"
      bottom={{ base: "0", md: "3rem", xl: "7rem" }}
    >
      <svg viewBox="0 0 1275 252" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 202.5C100.5 210.667 341.1 221.2 489.5 196C538.739 187.639 576.678 174.821 605.555 170.106C519.66 181.721 404.936 193.959 336 196.5C250.571 199.649 76.3861 189.231 0 180V202.5Z"
          fill="url(#paint0_linear_320_428)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1280 252L1208.53 228C1138.13 204 995.2 156 853.333 150C711.467 144 568.533 180 426.667 192C284.8 204 141.867 192 71.4667 186L2.42232e-05 180L8.48705e-06 0.000111901L71.4667 0.000105653C141.867 9.94988e-05 284.8 8.70031e-05 426.667 7.46008e-05C568.533 6.21984e-05 711.467 4.97028e-05 853.333 3.73004e-05C995.2 2.4898e-05 1138.13 1.24024e-05 1208.53 6.24781e-06L1280 0L1280 252Z"
        />
        <defs>
          <linearGradient
            id="paint0_linear_320_428"
            x1="602"
            y1="165"
            x2="-5.71063e-06"
            y2="197"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDD16E" />
            <stop offset="1" stopColor="#FDD16E" stopOpacity="0.12" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default HomeWave;
