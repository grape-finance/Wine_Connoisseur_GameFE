import { AppBar, Box, Button, Stack, Link, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faDiscord,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroVideo from "assets/home3.mp4";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    overflow: 'hidden',
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    paddingBottom: "20px",
  },
});

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <section className={classes.root}>
      <ReactPlayer
        url={heroVideo}
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
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
            <Link href="https://twitter.com/grape_finance">
              <FontAwesomeIcon className="icon-1" icon={faTwitter} />
            </Link>
            <Link href="https://discord.gg/grapefinance">
              <FontAwesomeIcon className="icon-1" icon={faDiscord} />
            </Link>
            <Link href="https://vinium-finance.gitbook.io/winemaker-game/">
              <FontAwesomeIcon className="icon-2" icon={faBook} />
            </Link>
          </Stack>
        </Box>
      </AppBar>
      <div className={classes.overlay}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              color="primary.light"
              sx={{
                filter: "drop-shadow(0 25px 25px rgb(0 0 0/0.15))",
                textAlign: "center",
              }}
              variant="h1"
              component="h1"
            >
              
              <Typography color="#fff" variant="h1" component="span">
                {" "}
                Winemaker
              </Typography>
            </Typography>
            <Typography
              sx={{ textAlign: "center" }}
              color="primary.light"
              variant="h5"
              component="h5"
            >
              Stake Vintners, earn $Vintage & become a master winemaker!
            </Typography>
            <Button
              onClick={() => navigate("/app/Overview")}
              sx={{
                p: 2,
                borderRadius: "1px",
                transition: "0.3s",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "fontWeightBold",
                border: "5px solid",
                boxShadow: '5px 5px 5px #000',
                borderColor: "#000",
                color: "primary.light",
                mb: 16,
                width: { xs: "80%", md: "30%" },
                "&:hover": {
                  border: "5px solid",
                  borderColor: "#000",
                  background: '#006636',
                },
              }}
              variant="contained"
            >
              Start Game
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  );
};

export default Home;

// const Home = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "flex-end",
//           justifyContent: "center",
//           width: "100%",
//           height: "100vh",
//           backgroundImage: `url(${background})`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//         }}
//       >
//         <AppBar
//           position="absolute"
//           sx={{
//             width: "100%",
//             height: 76,
//             background: "#04030300",
//             border: "none",
//             boxShadow: "unset",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             sx={{
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               justifyContent: { xs: "center", md: "center", lg: "flex-start" },
//               alignItems: "flex-end",
//             }}
//           >
//             <Stack
//               direction="row"
//               spacing={2.3}
//               sx={{ pl: { xs: "unset", md: "unset", lg: 10 } }}
//             >
//               <Link href="#">
//                 <FontAwesomeIcon className="icon-1" icon={faTwitter} />
//               </Link>
//               <Link href="#">
//                 <FontAwesomeIcon className="icon-1" icon={faDiscord} />
//               </Link>
//               <Link href="#">
//                 <FontAwesomeIcon className="icon-1" icon={faMedium} />
//               </Link>
//               <Link href="#">
//                 <FontAwesomeIcon className="icon-2" icon={faBook} />
//               </Link>
//             </Stack>
//           </Box>
//         </AppBar>
//         <main>
//           {/* <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-end",
//             justifyContent: "center",
//             width: "100%",
//             height: "100vh",
//             backgroundImage: `url(${background})`,
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//           }}
//         > */}
//           <Box
//             sx={{
//               width: "100%",
//               height: "70vh",
//               alignItems: "center",
//               justifyContent: "space-between",
//               flexDirection: "column",
//               display: "flex",
//               mb: 6,
//             }}
//           >
//             <Box>
//               <Typography
//                 color="primary.light"
//                 sx={{
//                   filter: "drop-shadow(0 25px 25px rgb(0 0 0/0.15))",
//                   textAlign: "center",
//                 }}
//                 variant="h1"
//                 component="h1"
//               >
//                 welcome to{" "}
//                 <Typography color="primary.main" variant="h1" component="span">
//                   {" "}
//                   The Winery
//                 </Typography>
//                 .{" "}
//               </Typography>
//               <Typography
//                 sx={{ textAlign: "center" }}
//                 color="primary.light"
//                 variant="h5"
//                 component="h5"
//               >
//                 Build Winery, brew Vintner, then relax!
//               </Typography>
//             </Box>

//             <Button
//               onClick={() => navigate("/app")}
//               sx={{
//                 p: 2,
//                 borderRadius: "1rem",
//                 transition: "0.3s",
//                 textTransform: "none",
//                 fontSize: "16px",
//                 fontWeight: "fontWeightBold",
//                 border: "1px solid",
//                 borderColor: "primary.dark",
//                 color: "primary.light",
//                 mb: 16,
//                 "&:hover": {
//                   border: "1px solid",
//                   borderColor: "primary.main",
//                 },
//               }}
//               variant="contained"
//             >
//               Click here to Open Winery
//             </Button>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 mb: { xs: "unset", md: "unset", lg: 3 },
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "fontWeightMedium" }}
//                 component="h5"
//                 color="primary.light"
//               >
//                 Built on Avalanche
//               </Typography>
//             </Box>
//           </Box>
//           {/* </Box> */}
//         </main>
//       </Box>
//     </>
//   );
// };

// export default Home;
