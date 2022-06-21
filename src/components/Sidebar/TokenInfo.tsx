import { Box, Stack, Typography } from "@mui/material";
import { useTokenPrice } from "state/token/hooks";

const TokenInfo = () => {
  const { grapePrice, vintageWinePrice } = useTokenPrice();
  return (
    <>
      <Typography
        sx={{
          fontWeight: "fontWeightBold",
          textAlign: "center",
          mb: 1.5,
        }}
        color="primary.light"
        variant="h5"
        component="h5"
      >
        Token Price
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(28 25 23/0.95),rgb(41 37 36/0.95),rgb(28 25 23/0.7))",
          p: 3,
          borderRadius: "1.5rem",
          boxShadow: 2,
          border: "1px solid rgb(68 64 60)",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{
                fontWeight: "fontWeightLight",
              }}
              color="primary.light"
              variant="h5"
              component="h5"
            >
              Grape:
            </Typography>
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
              }}
              color="primary.light"
              variant="h5"
              component="h5"
            >
              $ {grapePrice?.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{
                fontWeight: "fontWeightLight",
              }}
              color="primary.light"
              variant="h5"
              component="h5"
            >
              Vintagewine:
            </Typography>
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
              }}
              color="primary.light"
              variant="h5"
              component="h5"
            >
              $ {vintageWinePrice?.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
export default TokenInfo;
