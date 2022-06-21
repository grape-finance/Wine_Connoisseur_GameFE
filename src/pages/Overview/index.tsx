import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Overview = () => {
  return (
    <Container sx={{ my: 3 }}>
      <Stack
        flexDirection="column"
        spacing={2}
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(28 25 23/0.95),rgb(41 37 36/0.95),rgb(28 25 23/0.7))",
          p: 3,
          borderRadius: "1.5rem",
          boxShadow: 2,
          textAlign: "center",
          border: "1px solid rgb(68 64 60)",
        }}
      >
        <Typography color="primary.light" variant="body2" component="p">
          Your Income:
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          1
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          VintageWine Per Day:
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          0
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Max fatigue in: date
        </Typography>
      </Stack>
    </Container>
  );
};

export default Overview;
