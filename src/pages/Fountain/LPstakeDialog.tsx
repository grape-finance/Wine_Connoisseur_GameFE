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
import { alertTitleClasses, Divider, Stack, TextField } from "@mui/material";
import Loading from "components/Loading";
import { useTokenBalance } from "state/user/hooks";
import { trim } from "utils/trim";

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "#000",
  backgroundColor: "rgb(255 237 213)",
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("xs")]: {
    width: "50%",
  },
  borderRadius: 8,
  textAlign: "end",
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
})) as typeof TextField;

interface IProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  stakeLP: (arg: number) => void;
}

export default function LPStakeDialog({ open, setOpen, stakeLP }: IProps) {
  const [LPInput, setLPInput] = React.useState(0);
  const { USDCVintageWineLPBalance } = useTokenBalance();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLPInput(Number(event.target.value));
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
            Stake LP
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography color="primary.light" variant="h4" component="p">
            Available LP Token : {trim(USDCVintageWineLPBalance, 2)}
          </Typography>
          <Divider sx={{ height: "1px", background: "white", my: 1 }} />
          <Typography color="primary.light" variant="h5" component="p">
            Stake your LP token in the New Freezer to earn 10% of all produced
            LP. However, unstaking from the Freezer will take 2 days if you want
            the smallest penalty, and a great penalty if you want to unstake
            immediately.
          </Typography>
        </DialogContent>
        <DialogContent>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <StyledTextField
              InputProps={{ style: { textAlign: "end" } }}
              value={LPInput}
              id="outlined-basic"
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
            <Button
              onClick={() =>
                setLPInput(Number(trim(USDCVintageWineLPBalance, 2)))
              }
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
              Max
            </Button>
            <Button
              onClick={() => {
                stakeLP(LPInput);
                setOpen(false);
              }}
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
              Stake
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
