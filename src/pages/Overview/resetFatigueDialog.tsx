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
  raisinCost: number;
  resetFatigue: () => void;
}

export default function resetFatigueDialog({
  open,
  setOpen,
  raisinCost,
  resetFatigue,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
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
              "linear-gradient(to bottom,rgb(00 00 00/0.8),rgb(00 00 00/0.8),rgb(00 00 00/0.8))",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography color="primary.light" variant="h4" component="p">
            Recharge Vintners
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography color="primary.light" variant="h5" component="p">
            The cost to recharge your Vintners is {raisinCost} Raisin. This will
            bring the fatigue down to 0%.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <Button
              onClick={() => {
                resetFatigue();
                setOpen(false);
              }}
              className="menu-button"
            >
              Recharge Vintners
            </Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
