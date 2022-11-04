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
  vintageToClaim: number;
  claimContribution: number;
  claimBurn: number;
  claimContributionModifier: number;
  claimBurnModifier: number;
  claim: () => void;
}

export default function claimDialog({
  open,
  setOpen,
  vintageToClaim,
  claimContribution,
  claimBurn,
  claimContributionModifier,
  claimBurnModifier,
  claim,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const taxes = () => {
    return (
      claimContribution -
      claimContributionModifier +
      (claimBurn - claimBurnModifier)
    );
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
            Claim {vintageToClaim.toFixed(2)} VINTAGE
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography mt={2} color="primary.light" variant="h6" component="p">
            When claiming VINTAGE:
            <br />
            {claimContribution - claimContributionModifier}% goes to the Cellar
            <br />
            {claimBurn - claimBurnModifier}% is burned.
          </Typography>
          <Typography mt={2} color="primary.light" variant="h6" component="p">
            Accumulated VINTAGE: {vintageToClaim.toFixed(2)}
          </Typography>
          <Typography color="primary.light" variant="h6" component="p">
            Cellar Tax + Burn (-{taxes()}%):{" "}
            {(vintageToClaim * (taxes() / 100)).toFixed(2)}
          </Typography>
          <hr />
          <Typography color="primary.light" variant="h6" component="p">
            You get: {(vintageToClaim * ((100 - taxes()) / 100)).toFixed(2)}
          </Typography>

          <Typography mt={5} color="primary.light" component="p">
            Claiming also updates your fatigue % and VPM to current values
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <Button
              className="menu-button"
              onClick={() => {
                claim();
                setOpen(false);
              }}
            >
              Claim
            </Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
