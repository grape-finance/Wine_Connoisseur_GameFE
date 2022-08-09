import { Box, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface IProps {
  image: string;
  ppm?: number;
  selected?: boolean;
  isResting?: boolean;
  endTime?: number;
}

const useStyles = makeStyles({
  box: {
    "&:hover": { borderColor: "rgb(251 146 60)" },
  },
});

const NFTItem = (props: IProps) => {
  const classes = useStyles();
  const { image, selected, isResting, endTime, ppm } = props;
  const currentUnixTime = Math.round(new Date().getTime() / 1000);

  function timeDiffCalc(dateFuture: number, dateNow: number) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow);
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    return `${hours}h ${minutes}m left`;
  }

  return (
    <Box
      className={classes.box}
      style={{
        border: "5px solid",
        borderColor: selected ? "rgb(251 146 60)" : "grey",
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
            {timeDiffCalc(endTime, currentUnixTime)}
          </Typography>
        )}
        <div style={{textAlign: 'center', padding: '5px', marginLeft: 'auto', marginRight: 'auto'}}>
          <CardMedia
            component="img"
            image={image}
            sx={{
              width: { xs: "80px", md: "150px" },
              height: { xs: "80px", md: "150px" },
              padding: { xs: "10px", md: "20px" },
              textAlign: "center",
              border: ppm === 3 ? "2px solid #fed7aa" : "none",
            }}
          />
        </div>
      </>
    </Box>
  );
};

export default NFTItem;
