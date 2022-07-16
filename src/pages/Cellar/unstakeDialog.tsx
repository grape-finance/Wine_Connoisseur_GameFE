import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { trim } from "utils/trim";
import NumberInput from "components/NuberInput";
import { BigNumber, ethers } from "ethers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        color: "primary.light",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  userCellarAmounts: BigNumber;
  quickUnstake: (arg: string) => void;
  prepareDelayedUnstake: (arg: string) => void;
}

export default function UnstakeDialog({
  open,
  setOpen,
  userCellarAmounts,
  quickUnstake,
  prepareDelayedUnstake,
}: IProps) {
  const [tabValue, setTab] = React.useState(0);
  const [vintageWineInput, setVintageWineInput] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const unstake = () => {
    if (+ethers.utils.formatEther(userCellarAmounts) < +vintageWineInput)
      alert("You don't have enough token to unstake");
    else {
      if (tabValue === 0) {
        // Quick unstake

        quickUnstake(vintageWineInput);
      }
      // Delayed unstake
      else prepareDelayedUnstake(vintageWineInput);
      setOpen(false);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            background:
              "linear-gradient(to bottom,rgb(28 25 23/0.95),rgb(41 37 36/0.95),rgb(28 25 23/0.7))",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography color="primary.light" variant="h3" component="p">
            Unstake
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack
            direction={"row"}
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 0, md: 5, lg: 10 }}
            sx={{ borderBottom: "1px solid #fed7aa", flexWrap: "wrap" }}
          >
            <Box
              onClick={() => setTab(0)}
              sx={{
                cursor: "pointer",
                pb: 1,
                // "&:hover": {
                //   borderBottom: "1px solid",
                //   borderColor: "secondary.main",
                // },
              }}
            >
              <Box
                sx={{
                  borderRadius: ".8rem",
                  p: 1.5,
                  ...(tabValue === 0 && {
                    backgroundColor: "rgb(254 215 170)",
                  }),

                  "&:hover": {
                    backgroundColor: "rgb(253 186 116)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "fontWeightBold",
                    textAlign: "center",
                  }}
                  color={tabValue === 0 ? "rgb(28 25 23)" : "primary.light"}
                  variant="h5"
                  component="h5"
                >
                  Quick
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => setTab(1)}
              sx={{
                cursor: "pointer",
                pb: 1,
                // "&:hover": {
                //   borderBottom: "1px solid",
                //   borderColor: "secondary.main",
                // },
              }}
            >
              <Box
                sx={{
                  borderRadius: ".8rem",
                  p: 1.5,
                  ...(tabValue === 1 && {
                    backgroundColor: "rgb(254 215 170)",
                  }),
                  "&:hover": {
                    backgroundColor: "rgb(253 186 116)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "fontWeightBold",
                    textAlign: "center",
                  }}
                  color={tabValue === 1 ? "rgb(28 25 23)" : "primary.light"}
                  variant="h5"
                  component="h5"
                >
                  Lazy
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Typography
            color="primary.light"
            variant="h4"
            component="p"
            marginTop={"10px"}
          >
            Available Amount :{" "}
            {trim(+ethers.utils.formatEther(userCellarAmounts), 2)} VintageWine
          </Typography>
          <Typography
            color="primary.light"
            variant="h5"
            component="p"
            marginTop={"10px"}
          >
            {tabValue === 0
              ? "When you unstake quickly, you get your $RONI back instantly. However, you lose half of it (25% spoiled, and 25% stays in)"
              : "Delayed unstaking takes 2 days to defrost your $RONI fully and 10% of it will spill."}
          </Typography>
        </DialogContent>
        <DialogContent>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <NumberInput
              value={vintageWineInput}
              setValue={setVintageWineInput}
              max={+ethers.utils.formatEther(userCellarAmounts)}
            />
            <Button
              onClick={() => unstake()}
              sx={{
                width: { xs: "100%", md: "25%" },
                borderRadius: "1rem",
                transition: "0.3s",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "fontWeightBold",
                border: "1px solid",
                borderColor: "primary.dark",
                color: "primary.light",

                "&:hover": {
                  border: "1px solid",
                  borderColor: "primary.main",
                },
              }}
              variant="contained"
            >
              Unstake
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
