import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Skills = () => {
  return (
    <Container sx={{ my: 3 }}>
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
        <Typography>skills</Typography>
      </Box>
    </Container>
  );
};

export default Skills;
