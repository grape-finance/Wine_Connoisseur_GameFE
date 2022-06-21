import { Box, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

interface IProps {
  image?: string;
  selected: boolean;
}

const useStyles = makeStyles({
  box: {
    "&:hover": { borderColor: "#007AFF" },
  },
});

const NFTItem = (props: IProps) => {
  const classes = useStyles();
  const { image, selected } = props;
  return (
    <Box
      className={classes.box}
      style={{
        border: "2px solid",

        borderColor: selected ? "#007AFF" : "black",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        style={{ width: "150px", height: "150px", padding: "20px" }}
      />
    </Box>
  );
};

export default NFTItem;
