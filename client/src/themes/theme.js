import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans"',
    fontSize: 12,
    body1: {
      fontWeight: 500,
    },
    h1: {
      // could customize the h1 variant as well
    },
    h2: {
      fontSize: 26,
      fontWeight: 500,
    },
    h3: {
      color: "#fff",
      fontSize: 26,
    },
    h5: {
      color: "#B0B0B0",
      fontSize: 14,
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    online: { main: "#1CED84" },
    icon: { main: "#95A7C4" },
  },
});
