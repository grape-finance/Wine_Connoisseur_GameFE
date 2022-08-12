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
          "linear-gradient(to bottom,rgb(00 00 00/0.8),rgb(00 00 00/0.8),rgb(00 00 00/0.8))",
          p: 3,
          borderRadius: "1px",
          boxShadow: 2,
          border: "1px solid rgb(00 00 00)",
          WebkitBoxShadow: '5px 5px 5px #000'
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
              Vintage:
            </Typography>
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
              }}
              color="primary.light"
              variant="h5"
              component="h5"
            >
              $ {vintageWinePrice?.toFixed(3)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
export default TokenInfo;
