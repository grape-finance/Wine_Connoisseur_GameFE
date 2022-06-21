import { Box, Container, Grid } from "@mui/material";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Winery from "pages/Winery";
import React, { useState } from "react";
import Tabs from "components/Tabs";
import background from "assets/background.png";
import Overview from "pages/Overview";
import Skills from "pages/Skills";
import Tools from "pages/Tools";

const Application = () => {
  const [currentTab, setCurrentTab] = useState("Winery");
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Container sx={{ mb: 6 }}>
          <Grid item container spacing={6} sx={{ mt: 10 }}>
            <Grid item xs={12} md={12} lg={3} sx={{ mt: 6 }}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={12} lg={9} sx={{ mt: 1 }}>
              <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
              {currentTab === "Overview" ? <Overview /> : null}
              {currentTab === "Winery" ? <Winery /> : null}
              {currentTab === "Tools" ? <Tools /> : null}
              {currentTab === "Skills" ? <Skills /> : null}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Application;
