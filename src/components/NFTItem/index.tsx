import { Box, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { unixToDate } from "utils/unixToDate";

interface IProps {
  image: string;
  selected?: boolean;
  isResting?: boolean;
  endTime?: number;
}

const useStyles = makeStyles({
  box: {
    "&:hover": { borderColor: "#A16207" },
  },
});

const NFTItem = (props: IProps) => {
  const classes = useStyles();
  const { image, selected, isResting, endTime } = props;
  const currentUnixTime = Math.round(new Date().getTime() / 1000);

  return (
    <Box
      className={classes.box}
      style={{
        border: "5px solid",
        borderColor: selected ? "#A16207" : "grey",
        borderRadius: "20px",
      }}
    >
      <>
        {isResting && endTime && (
          <Typography
            variant="h6"
            color="primary.light"
            sx={{ textAlign: "center", pt: 2 }}
          >
            {unixToDate(endTime - currentUnixTime)} left
          </Typography>
        )}
        <CardMedia
          component="img"
          image={image}
          sx={{
            width: { xs: "80px", md: "150px" },
            height: { xs: "80px", md: "150px" },
            padding: { xs: "10px", md: "20px" },
          }}
        />
      </>
    </Box>
  );
};

export default NFTItem;
