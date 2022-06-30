import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
   palette: {
      background: {
         default: "#009387",
         paper: colors.common.white,
      },
      primary: {
         contrastText: "#ffffff",
         main: "#00ad9e",
      },
      text: {
         primary: "#172b4d",
         secondary: "#6b778c",
      },
   },
   shadows,
   typography,
});

export default theme;
