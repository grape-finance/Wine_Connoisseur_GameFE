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
              variant="h6"
              component="h6"
            >
              Grape:
            </Typography>
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
              }}
              color="primary.light"
              variant="h6"
              component="h6"
            >
              $ {grapePrice?.toFixed(3)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{
                fontWeight: "fontWeightLight",
              }}
              color="primary.light"
              variant="h6"
              component="h6"
            >
              Vintage:
            </Typography>
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
              }}
              color="primary.light"
              variant="h6"
              component="h6"
            >
              $ {vintageWinePrice?.toFixed(6)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
export default TokenInfo;
