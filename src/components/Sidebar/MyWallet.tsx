import { Box, CardMedia, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import sideImage1 from "assets/side/image-1.png";
import raisinImage from "assets/side/raisin.png";
import sideImage2 from "assets/side/image-2.png";
import sideImage3 from "assets/side/1.jpg";
import sideImage4 from "assets/side/41.png";
import {
  buyGrapeAddress,
  buyVintageWineAddress,
  buyVintnerNFTAddress,
  buyToolsNFTAddress,
} from "config/address";
import { useTokenBalance } from "state/user/hooks";

const MyWallet = () => {
  const {
    grapeBalance,
    raisinBalance,
    vintageWineBalance,
    vintnerBalance,
    upgradeBalance,
  } = useTokenBalance();
  const walletData = [
    {
      image: sideImage1,
      value: grapeBalance.toFixed(2),
      link: buyGrapeAddress,
    },
    {
      image: raisinImage,
      value: raisinBalance.toFixed(2),
      link: "#",
    },
    {
      image: sideImage2,
      value: vintageWineBalance.toFixed(2),
      link: buyVintageWineAddress,
    },
    {
      image: sideImage4,
      value: vintnerBalance,
      link: buyVintnerNFTAddress,
    },
    {
      image: sideImage3,
      value: upgradeBalance,
      link: buyToolsNFTAddress,
    },
  ];
  const onClick = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <>
      <Typography
        sx={{
          fontWeight: "fontWeightBold",
          textAlign: "center",
          mb: 2,
          mt: 2,
        }}
        color="primary.light"
        variant="h5"
        component="h5"
      >
        My Wallet
      </Typography>
      <Stack alignItems="center" spacing={1}>
        {walletData.map((data, i) => (
          <Box
            key={`myWallet${i}`}
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",

              background:
                "linear-gradient(to bottom,rgb(00 00 00/0.8),rgb(00 00 00/0.8),rgb(00 00 00/0.8))",
              p: 2,
              borderRadius: "1px",
              boxShadow: 2,
              justifyContent: "flex-start",
              border: "1px solid rgb(0 0 0)",
              WebkitBoxShadow: "5px 5px 5px #000",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <CardMedia
                component="image"
                image={data.image}
                style={{ width: "24px", height: "24px", borderRadius: "100%" }}
              />
              <Typography
                sx={{
                  fontWeight: "fontWeightBold",
                  textAlign: "center",
                }}
                color="primary.light"
                variant="h6"
                component="h6"
              >
                {data.value}
              </Typography>

              <FontAwesomeIcon
                className="icon-3"
                icon={faCirclePlus}
                onClick={() => onClick(data.link)}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  );
};
export default MyWallet;
