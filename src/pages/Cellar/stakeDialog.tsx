import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Divider, Stack } from "@mui/material";
import { useTokenBalance } from "state/user/hooks";
import { trim } from "utils/trim";
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
  stakeVintageWine: (arg: number) => void;
}

export default function StakeDialog({
  open,
  setOpen,
  stakeVintageWine,
}: IProps) {
  const [vintageWineInput, setVintageWineInput] = React.useState("");
  const { vintageWineBalance } = useTokenBalance();

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
          <Typography color="primary.light" variant="h3" component="p">
            Stake
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography color="primary.light" variant="h4" component="p">
            Available Vintage: {trim(vintageWineBalance, 2)}
          </Typography>
          <Divider sx={{ height: "1px", background: "white", my: 1 }} />
          <Typography color="primary.light" variant="h5" component="p">
            Stake your Vintage to sVintage in the Cellar to earn 10% of all
            produced Vintage. However, unstaking from the Cellar will take 2
            days if you want the smallest penalty, immediate unstakes come at a
            great penalty.
            <br />
            Claiming sVintage gives your initial Vintage back + earned Vintage -
            claiming fees.
          </Typography>
        </DialogContent>
        <DialogContent>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <NumberInput
              value={vintageWineInput}
              setValue={setVintageWineInput}
              max={vintageWineBalance}
            />

            <Button
              onClick={() => {
                stakeVintageWine(+vintageWineInput);
                setOpen(false);
              }}
              className="menu-button"
            >
              Stake
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
