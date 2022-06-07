import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { useFetchingBalance } from "state/user/hooks";
import Navbar from "components/Navbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ConnectWalletButton from "components/ConnectWalletButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Loading from "components/Loading";
import background from "assets/background.jpg";

const drawerWidth = 240;

function App() {
  const isLoading = useFetchingBalance();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "#f5f5f5",
        }}
        className="background"
      >
        <CssBaseline />
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "#211E33",
            boxShadow: "none",
          }}
        >
          <Box p={2} alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <ConnectWalletButton />
          </Box>
        </AppBar>

        <Navbar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 10,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "800px",
          }}
        >
          <Toolbar />
          <Routes />
        </Box>
      </Box>
      <Loading isLoading={isLoading} />
    </BrowserRouter>
  );
}

export default App;
