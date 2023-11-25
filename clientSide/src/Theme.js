import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    warning: {
      main: "#ff9800",
    },
    secondary: { main: "#ff9800" },
    Success: {main:"#2e7d32"}
    // Other palette properties...
  },
  components: {
    // Name of the component
  },
  // Other theme properties...
});

export default theme;
