import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { useIsFetching } from "state/user/hooks";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Loading from "components/Loading";

function App() {
  const isLoading = useIsFetching();

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box>
        <Routes />
      </Box>
      <Loading isLoading={isLoading} />
    </BrowserRouter>
  );
}

export default App;
