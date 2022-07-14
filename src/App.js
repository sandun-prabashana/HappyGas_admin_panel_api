import "./App.css";
import { useRoutes } from "react-router";
import routes from "./routes";
import Login from "./pages/Login";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";

function App() {
   const routing = useRoutes(routes(getAuthState()));
   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         {routing}
      </ThemeProvider>
   );
}

export default App;

function getAuthState() {
   let authStatus = sessionStorage.getItem('authStatus')
   let userType = sessionStorage.getItem('userType')
   return {authStatus: authStatus === 'true', userType: userType};
}
