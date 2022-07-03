import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Winery from "pages/Winery";
import React, { useState } from "react";
import Tabs from "components/Tabs";
import Overview from "pages/Overview";
import Skills from "pages/Skills";
import Tools from "pages/Tools";
import Cellar from "pages/Cellar";
import ReactPlayer from "react-player";
import heroVideo from "assets/back.mp4";
import background1 from "assets/image/winery_bg.png";
import background2 from "assets/image/celler_bg.png";
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

  return (
    <section
      style={{
        width: "100%",
        position: "relative",
        objectFit: "cover",
      }}
      className={classes.root}
    >
      {tab === "Overview" && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
          }}
        >
          <ReactPlayer
            url={heroVideo}
            playing
            loop
            muted
            width="100%"
            height="100%"
          />
        </div>
      )}

      {(tab === "Winery" || tab === "Tools") && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${background1})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      )}

      {(tab === "Skills" || tab === "Cellar" || tab === "Fountain") && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${background2})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      )}

      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
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
          <Grid item container spacing={6} sx={{ mt: 4 }}>
            <Grid item xs={12} md={12} lg={3} sx={{ mt: 5 }}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={12} lg={9} sx={{ mt: 5 }}>
              <Tabs tab={tab!} />
              {tab === "Overview" ? <Overview /> : null}
              {tab === "Winery" ? <Winery /> : null}
              {tab === "Tools" ? <Tools /> : null}
              {tab === "Skills" ? <Skills /> : null}
              {tab === "Cellar" ? <Cellar /> : null}
              {tab === "Fountain" ? <Fountain /> : null}
            </Grid>
          </Grid>
        </Box>
      </div>
    </section>
  );
};

export default Application;
