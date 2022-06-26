import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const tabsData = [
  { title: "Overview" },
  { title: "Winery" },
  { title: "Tools" },
  { title: "Skills" },
  { title: "Cellar" },
];
type IProps = {
  currentTab: string;
  setCurrentTab: (val: string) => void;
};

const Tabs: React.FC<IProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        background:
          "linear-gradient(to bottom,rgb(28 25 23/0.95),rgb(41 37 36/0.95),rgb(28 25 23/0.7))",
        p: { xs: 1, md: 2, lg: 2 },
        borderRadius: "1.5rem",
        boxShadow: 2,
        border: "1px solid rgb(68 64 60)",
      }}
    >
      <Stack
        direction="row"
        justifyContent={{
          xs: "flex-start",
          md: "flex-start",
          lg: "space-between",
        }}
        sx={{ px: { xs: "unset", md: "unset", lg: 4 }, flexWrap: "wrap" }}
        spacing={{ xs: 1, md: 4, lg: 4 }}
      >
        {tabsData?.map((data, i) => (
          <Box
            key={`tabsData${i + 2}`}
            onClick={() => setCurrentTab(data.title)}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              flexWrap: "wrap",
              gap: 2,
              p: { xs: 1, md: 1, lg: "unset" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                ...(data.title === currentTab && {
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  marginBottom: "-2px",
                }),
                "&:hover": {
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  marginBottom: "-2px",
                },
              }}
            >
              <Typography
                sx={{
                  ...(data.title === currentTab && {
                    color: "primary.main",
                  }),
                  fontWeight: "fontWeightMedium",
                }}
                color="primary.light"
                variant="h5"
                component="h5"
              >
                {data.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Tabs;
