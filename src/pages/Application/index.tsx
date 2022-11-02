import { Box, Grid, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Winery from "pages/Winery";
import React from "react";
import Tabs from "components/Tabs";
import Overview from "pages/Overview";
import Skills from "pages/Skills";
import Tools from "pages/Tools";
import Cellar from "pages/Cellar";
import Leaderboard from "pages/Leaderboard";
import ReactPlayer from "react-player";
import heroVideo from "assets/home.mp4";
import overview_bg from "assets/image/overview_bg.jpg";
import winery_bg from "assets/image/winery_bg.png";
import skills_bg from "assets/image/wine.png";
import celler_bg from "assets/image/celler_bg.png";
import fountain_bg from "assets/image/fountain_bg.png";
import tool_bg from "assets/home2.mp4";
import { useParams } from "react-router-dom";
import Fountain from "pages/Fountain";

const useStyles = makeStyles({
  root: {
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const Application = () => {
  const classes = useStyles();
  const { tab } = useParams();
  const matches = useMediaQuery("(min-width:600px)");

  const background = () => {
    console.log("tab = " + tab);
    switch (tab) {
      case "Overview":
        return overview_bg;
      case "Winery":
        return winery_bg;
      case "Tools":
        return overview_bg;
      case "Skills":
        return skills_bg;
      case "Cellar":
        return celler_bg;
      case "Enoteca":
        return fountain_bg;
      case "Leaderboard":
        return winery_bg;
      default:
        return tool_bg;
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${background()})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      ></div>

      {/* Background End */}
      <Header />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <Box
          sx={{
            mt: { xs: "100px", md: "150px" },
            mx: { xs: "30px", md: "100px" },
          }}
        >
          <Grid item container spacing={6}>
            <Grid item xs={12} md={12} lg={3} sx={{ mt: { xs: 5, md: 3 } }}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={12} lg={9} sx={{ mt: 8 }}>
              <Tabs tab={tab!} />
              {tab === "Overview" ? <Overview /> : null}
              {tab === "Winery" ? <Winery /> : null}
              {tab === "Tools" ? <Tools /> : null}
              {tab === "Skills" ? <Skills /> : null}
              {tab === "Cellar" ? <Cellar /> : null}
              {tab === "Enoteca" ? <Fountain /> : null}
              {tab === "Leaderboard" ? <Leaderboard /> : null}
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Application;
