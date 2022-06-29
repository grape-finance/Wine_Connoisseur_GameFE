import { Box, AppBar, Link, Stack, Button, CardMedia } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

// import scrollDetector from "scroll-detector";
// import { useState } from "react";
import ConnectWalletButton from "components/ConnectWalletButton";
import headerIcon from "assets/logo.png";
import { buyGrapeAddress, buyVintageWineAddress } from "config/address";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  // const [scrolled, setScrolled] = useState(false);
  // scrollDetector.on("scroll:down", () => {
  //   setScrolled(true);
  // });
  // scrollDetector.on("at:top", () => {
  //   setScrolled(false);
  // });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          top: 0,
          height: { xs: 94, md: 94, lg: 84 },
          background: "transparent",
          backdropFilter: "blur(10px)",
          border: "none",
          transition: "all 0.3s",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ px: 10 }}>
            <Box
              sx={{
                display: "flex",
                height: 84,
                justifyContent: {
                  xs: "flex-start",
                  md: "flex-start",
                  lg: "space-between",
                },
                alignItems: "center",
              }}
            >
              <CardMedia
                sx={{
                  pl: { lg: "unset" },
                  display: { lg: "none" },
                }}
                component="img"
                image={headerIcon}
                style={{ width: "200px", height: "40px", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <Stack
                direction="row"
                spacing={2.3}
                sx={{
                  display: { xs: "none", md: "none", lg: "flex" },
                }}
              >
                <CardMedia
                  component="img"
                  image={headerIcon}
                  style={{ width: "200px", height: "40px", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                />
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
              <Stack
                direction="row"
                spacing={2.3}
                // sx={{ pl: { xs: "unset", md: "unset", lg: 10 } }}
              >
                <Button
                  sx={{
                    p: 1.3,
                    borderRadius: "1rem",
                    transition: "0.3s",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "fontWeightBold",
                    border: "1px solid",
                    borderColor: "secondary.dark",
                    // color: "white",
                    display: { xs: "none", md: "none", lg: "block" },
                    "&:hover": {
                      border: "1px solid",
                      borderColor: "secondary.main",
                    },
                  }}
                  color="secondary"
                  variant="contained"
                  target="_blank"
                  href={buyGrapeAddress}
                >
                  Buy $Grape
                </Button>
                <Button
                  sx={{
                    p: 1.3,
                    borderRadius: "1rem",
                    transition: "0.3s",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "fontWeightBold",
                    border: "1px solid",
                    borderColor: "secondary.dark",
                    // color: "white",
                    display: { xs: "none", md: "none", lg: "block" },
                    "&:hover": {
                      border: "1px solid",
                      borderColor: "secondary.main",
                    },
                  }}
                  color="secondary"
                  variant="contained"
                  target="_blank"
                  href={buyVintageWineAddress}
                >
                  Buy $VintageWine
                </Button>
                <ConnectWalletButton />
              </Stack>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </>
  );
};
export default Header;
