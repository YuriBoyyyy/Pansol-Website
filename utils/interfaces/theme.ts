import { extendTheme } from "@chakra-ui/react";

const colors = {
  palette: {
    primary: "#EFEEFE",
    primary_hover: "#F9F9FF",
    secondary: "#46379E",
    secondary_hover: "#4F3EB5",
    tertiary: "#121138",
    accent: "#FDD16E",
    button_accent_hover: "#FFA216",
    button_accent_bg: "#F59708",
    watermark: "#4839A3",
  },
};

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Poppins', sans-serif`,
};

const styles = {
  global: {
    html: {
      scrollBehavior: "smooth",
      overflowX: "hidden",
      border: "0",
      padding: "0",
    },
    body: {
      overflowX: "hidden",
      bg: "palette.primary",
      color: "palette.tertiary",
    },
    _placeholder: {
      color: "rgba(38, 50, 56, .6)",
      fontSize: ".9rem",
    },
    "::-webkit-scrollbar": {
      width: "10px",
    },
    "::-webkit-scrollbar-track": {
      background: "#F6F5FF",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#B0AFBF",
      borderRadius: "10rem",
    },
  },
};

const theme = extendTheme({ colors, fonts, styles });
export default theme;
