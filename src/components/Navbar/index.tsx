import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CardMedia } from "@mui/material";
import logoImg from "assets/logo.png";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Navbar(props: Props) {
  const { window, mobileOpen, handleDrawerToggle } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const drawer = (
    <div>
      <Box p={1}>
        <CardMedia
          component="img"
          image={logoImg}
          alt="LC"
          sx={{ width: "80px", height: "80px" }}
        />
      </Box>
      <List sx={{ color: "white" }}>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/");
          }}
        >
          <ListItemButton selected={pathname === "/account"}>
            <ListItemIcon>
              <AccountCircle sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Vintner" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "transparent",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "transparent",
            backdropFilter: "blur(10px)",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
