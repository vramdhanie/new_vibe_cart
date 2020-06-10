import { theme } from "@chakra-ui/core";

const vibeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    secondary: {
      900: "#808080",
      800: "#757575",
      700: "#707070",
      400: "#E2E8F0",
    },
  },
};

export default vibeTheme;
