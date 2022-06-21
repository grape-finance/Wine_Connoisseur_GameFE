import {
  Box,
  AppBar,
  Link,
  Stack,
  Container,
  Button,
  CardMedia,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import scrollDetector from "scroll-detector";
import { useState } from "react";
import ConnectWalletButton from "components/ConnectWalletButton";
import headerIcon from "assets/logo.png";
import { buyGrapeAddress, buyVintageWineAddress } from "config/address";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  scrollDetector.on("scroll:down", () => {
    setScrolled(true);
  });
  scrollDetector.on("at:top", () => {
    setScrolled(false);
  });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          top: 0,
          height: { xs: 94, md: 94, lg: 84 },
          backgroundColor: {
            xs: "rgb(255 237 213)",
            md: "rgb(255 237 213)",
            lg: "rgb(64 64 64/.5)",
            ...(scrolled && {
              lg: "#262423",
            }),
          },
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
          <Container>
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
              <Box
                sx={{
                  display: { xs: "flex", md: "flex", lg: "none" },
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={headerIcon}
                  style={{ width: "40px", height: "40px" }}
                />
              </Box>
              <Stack
                direction="row"
                spacing={2.3}
                sx={{
                  pl: { xs: "unset", md: "unset", lg: 10 },
                  display: { xs: "none", md: "none", lg: "flex" },
                }}
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
          </Container>
        </Box>
      </AppBar>
    </>
  );
};
export default Header;
