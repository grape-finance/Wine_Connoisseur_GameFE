import {
  AppBar,
  Box,
  Button,
  Stack,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faDiscord,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import background from "assets/background.webp";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <AppBar
          position="absolute"
          sx={{
            width: "100%",
            height: 76,
            background: "#04030300",
            border: "none",
            boxShadow: "unset",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "center", lg: "flex-start" },
              alignItems: "flex-end",
            }}
          >
            <Stack
              direction="row"
              spacing={2.3}
              sx={{ pl: { xs: "unset", md: "unset", lg: 10 } }}
            >
              <Link href="#">
                <FontAwesomeIcon className="icon-1" icon={faTwitter} />
              </Link>
              <Link href="#">
                <FontAwesomeIcon className="icon-1" icon={faDiscord} />
              </Link>
              <Link href="#">
                <FontAwesomeIcon className="icon-1" icon={faMedium} />
              </Link>
              <Link href="#">
                <FontAwesomeIcon className="icon-2" icon={faBook} />
              </Link>
            </Stack>
          </Box>
        </AppBar>
        <main>
          {/* <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        > */}
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              display: "flex",
              mb: 6,
            }}
          >
            <Box>
              <Typography
                color="primary.light"
                sx={{
                  filter: "drop-shadow(0 25px 25px rgb(0 0 0/0.15))",
                  textAlign: "center",
                }}
                variant="h1"
                component="h1"
              >
                welcome to{" "}
                <Typography color="primary.main" variant="h1" component="span">
                  {" "}
                  The Winery
                </Typography>
                .{" "}
              </Typography>
              <Typography
                sx={{ textAlign: "center" }}
                color="primary.light"
                variant="h5"
                component="h5"
              >
                Build Winery, brew Vintner, then relax!
              </Typography>
            </Box>

            <Button
              onClick={() => navigate("/app")}
              sx={{
                p: 2,
                borderRadius: "1rem",
                transition: "0.3s",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "fontWeightBold",
                border: "1px solid",
                borderColor: "primary.dark",
                color: "primary.light",
                mb: 16,
                "&:hover": {
                  border: "1px solid",
                  borderColor: "primary.main",
                },
              }}
              variant="contained"
            >
              Click here to Open Winery
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: { xs: "unset", md: "unset", lg: 3 },
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "fontWeightMedium" }}
                component="h5"
                color="primary.light"
              >
                Built on Avalanche
              </Typography>
            </Box>
          </Box>
          {/* </Box> */}
        </main>
      </Box>
    </>
  );
};

export default Home;
