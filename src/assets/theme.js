import { theme } from "@chakra-ui/core";

const vibeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      50: "#e0f2ff",
      100: "#b3d4ff",
      200: "#84b8fa",
      300: "#559bf7",
      400: "#287ff3",
      500: "#1266da",
      600: "#084faa",
      700: "#02387b",
      800: "#00224c",
      900: "#000b1e",
    },
    secondary: {
      50: "#dbfffe",
      100: "#b0fef6",
      200: "#82fcf1",
      300: "#54fbeb",
      400: "#31f9e5",
      500: "#23e0cc",
      600: "#13af9f",
      700: "#037d71",
      800: "#004b44",
      900: "#001b18",
    },
  },
};

export default vibeTheme;
