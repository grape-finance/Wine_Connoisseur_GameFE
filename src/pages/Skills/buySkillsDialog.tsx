import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import NumberInput from "components/NuberInput";

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
  raisinBalance: string;
  depositGrape: (arg: number) => void;
}

export default function BuySkillsDialog({
  open,
  setOpen,
  raisinBalance,
  depositGrape,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const [raisinAmount, setRaisinAmount] = React.useState("");

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            background:
              "linear-gradient(to bottom,rgb(00 00 00/0.8),rgb(00 00 00/0.8),rgb(00 00 00/0.8))",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography color="primary.light" variant="h3" component="p">
            Buy Levels
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography color="primary.light" variant="h4" component="p">
            You can level up using Raisin. Leveling up gets you a Skill point to
            use in your Skill tree. Depositing more Raisin than enough for 1
            level goes towards your next level. <br />
            Resetting your Skill tree doesn't refund the spent Raisin, only Skill
            points.
          </Typography>
        </DialogContent>
        <DialogContent>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <NumberInput
              value={raisinAmount}
              setValue={setRaisinAmount}
              max={Number(raisinBalance)}
            />

            <Button
              onClick={() => {
                depositGrape(+raisinAmount);
                setOpen(false);
              }}
              sx={{
                width: { xs: "100%", md: "25%" },
                borderRadius: "1px",
                transition: "0.3s",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "fontWeightBold",
                border: "3px solid #000",
                color: "primary.light",
                boxShadow: "5px 5px 5px #000",

                "&:hover": {
                  border: "3px solid #000",
                  background: "#006636",
                },
              }}
              variant="contained"
            >
              Purchase
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
