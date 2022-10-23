import { Stack, CardMedia, Grid } from "@mui/material";
import logo from "assets/logo.png";

import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  ListItem,
} from "@material-ui/core";
import clsx from "clsx";

// import scrollDetector from "scroll-detector";
// import { useState } from "react";
import ConnectWalletButton from "components/ConnectWalletButton";
import headerIcon from "assets/logo.png";
import {
  buyGrapeAddress,
  buyVintageWineAddress,
  buyVintnerNFTAddress,
} from "config/address";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    padding: 0,
    width: "100%",
    maxHeight: "80px",
    top: 0,
    background: "transparent",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;",
    backdropFilter: "blur(5px)",
    border: "none",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    color: "#FCFCFC",
    backgroundColor: "transparent",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    width: 240,
    backgroundColor: "#12141D",
  },

  toolbar: {
    width: "100%",
  },

  closeDrawerIcon: {
    color: "#ffedd5",
    marginTop: "20px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1300px)");
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {matches ? (
            <>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={headerIcon}
                      style={{
                        width: "100%",
                        height: "60px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/")}
                    />
                    <a href="https://twitter.com/grape_finance">
                      <FontAwesomeIcon className="icon-1" icon={faTwitter} />
                    </a>
                    <a href="https://discord.gg/grapefinance">
                      <FontAwesomeIcon className="icon-1" icon={faDiscord} />
                    </a>
                    <a href="https://winemaker-docs.grapefinance.app">
                      <FontAwesomeIcon className="icon-2" icon={faBook} />
                    </a>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2.3}>
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={"https://app.chainbet.gg/"}
                    >
                      <button className="menu-button">Vintage Casino</button>
                    </a>

                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={"https://brewmaster.on.fleek.co/"}
                    >
                      <button className="menu-button">Brew Master</button>
                    </a>

                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={buyGrapeAddress}
                    >
                      <button className="menu-button">Buy xGRAPE</button>
                    </a>
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={buyVintageWineAddress}
                    >
                      <button className="menu-button">Buy VINTAGE</button>
                    </a>
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={buyVintnerNFTAddress}
                    >
                      <button className="menu-button">Buy VINTNERS</button>
                    </a>

                    <ConnectWalletButton />
                  </Stack>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems="stretch"
              >
                <Grid item>
                  <Grid container alignItems={"center"} spacing={1}>
                    <Grid item>
                      <IconButton
                        style={{ color: "#ffedd5" }}
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(open)}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Link to="/">
                        <img alt="logo" width={120} src={logo} />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <ConnectWalletButton />
                </Grid>
              </Grid>

              <Drawer
                className={classes.drawer}
                onEscapeKeyDown={handleDrawerClose}
                onBackdropClick={handleDrawerClose}
                variant="temporary"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div>
                  <IconButton
                    onClick={handleDrawerClose}
                    className={classes.closeDrawerIcon}
                  >
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </div>

                <Grid
                  container
                  direction={"column"}
                  alignItems="flex-start"
                  spacing={1}
                  style={{ marginLeft: "10px" }}
                >
                  <Grid item>
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={"https://app.chainbet.gg/"}
                    >
                      <button className="menu-button">Vintage Casino</button>
                    </a>
                  </Grid>
                  <Grid item>
                    {" "}
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={"https://brewmaster.on.fleek.co/"}
                    >
                      <button className="menu-button">Brew Master</button>
                    </a>
                  </Grid>
                  <Grid item>
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={buyGrapeAddress}
                    >
                      <button className="menu-button">Buy xGRAPE</button>
                    </a>
                  </Grid>
                  <Grid item>
                    {" "}
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={buyVintageWineAddress}
                    >
                      <button className="menu-button">Buy VINTAGE</button>
                    </a>
                  </Grid>
                  <Grid item>
                    {" "}
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={buyVintnerNFTAddress}
                    >
                      <button className="menu-button">Buy VINTNERS</button>
                    </a>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={4} style={{ marginTop: "20px" }}>
                      <Grid item>
                        <a href="https://twitter.com/grape_finance">
                          <FontAwesomeIcon
                            className="icon-1"
                            icon={faTwitter}
                          />
                        </a>
                      </Grid>
                      <Grid item>
                        <a href="https://discord.gg/grapefinance">
                          <FontAwesomeIcon
                            className="icon-1"
                            icon={faDiscord}
                          />
                        </a>
                      </Grid>
                      <Grid item>
                        <a href="https://winemaker-docs.grapefinance.app">
                          <FontAwesomeIcon className="icon-2" icon={faBook} />
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
