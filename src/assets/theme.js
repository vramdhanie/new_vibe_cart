import { theme } from "@chakra-ui/core";

const vibeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      50: "#e9f3fc",
      100: "#cad9e7",
      200: "#a9c0d4",
      300: "#88a7c3",
      400: "#678db2",
      500: "#4e7499",
      600: "#3c5a78",
      700: "#2b4056",
      800: "#182735",
      900: "#040e16",
    },
    secondary: {
      50: "#dff6ff",
      100: "#bbdff6",
      200: "#93c9e9",
      300: "#6cb3df",
      400: "#449dd4",
      500: "#2b84bb",
      600: "#1d6692",
      700: "#10496a",
      800: "#012d42",
      900: "#00111c",
    },
  },
};

export default vibeTheme;
