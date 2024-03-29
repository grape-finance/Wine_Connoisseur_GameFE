import { Box, Stack, Typography } from "@mui/material";
import { useNFTState } from "state/user/hooks";
import { unixToDate } from "utils/unixToDate";

const MyNFT = () => {
  const {
    fatigueAccrued,
    timeUntilFatigues,
    vintageWineAccrued,
    vintageWinePerMinute,
  } = useNFTState();
  const NFTState = [
    {
      name: "Vintage PM",
      value: vintageWinePerMinute.toFixed(2),
    },
    {
      name: "Max Fatigue",
      value: unixToDate(timeUntilFatigues),
    },
    {
      name: "Current Fatigue",
      value: fatigueAccrued.toFixed(2) + "%",
    },
    {
      name: "Earned Vintage",
      value: vintageWineAccrued.toFixed(2),
    },
  ];

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
        Staked NFT State
      </Typography>
      <Stack alignItems="center" spacing={1} marginBottom={5}>
        {NFTState.map((data, i) => (
          <Box
            key={i}
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
              border: "1px solid rgb(00 00 00)",
              WebkitBoxShadow: '5px 5px 5px #000'
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "fontWeightBold",
                  textAlign: "center",
                }}
                color="primary.light"
                variant="h6"
                component="h6"
              >
                {data.name}: {data.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  );
};
export default MyNFT;
