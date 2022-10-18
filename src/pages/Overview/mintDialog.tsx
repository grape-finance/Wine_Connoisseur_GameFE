import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import NumberInput from "components/NuberInput";
import { ApprovalState } from "hooks/useApprove";

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
  balanceGrapeMIMTJ: number;
  balanceGrapeMIMSW: number;
  balanceXGrape: number;
  balanceVintageMIM: number;
  approvedGrapeMIMTJ: number;
  approvedGrapeMIMSW: number;
  approvedXGrape: number;
  approvedVintageMIM: number;
  approveGrapeMIMTJ: () => void;
  approveGrapeMIMSW: () => void;
  approveXGrape: () => void;
  approveVintageMIM: () => void;
  setOpen: (arg: boolean) => void;
  mint: (amount: number, mintToken: number) => void;
}

export default function MintDialog({
  open,
  balanceGrapeMIMTJ,
  balanceGrapeMIMSW,
  balanceXGrape,
  balanceVintageMIM,
  approvedGrapeMIMTJ,
  approvedGrapeMIMSW,
  approvedXGrape,
  approvedVintageMIM,
  approveGrapeMIMTJ,
  approveGrapeMIMSW,
  approveXGrape,
  approveVintageMIM,
  setOpen,
  mint,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const approve = () => {
    if (mintToken === "Grape-MIM TJ") {
      approveGrapeMIMTJ();
    } else if (mintToken === "Grape-MIM SW") {
      approveGrapeMIMSW();
    } else if (mintToken === "xGrape") {
      approveXGrape();
    } else if (mintToken === "Vintage-MIM") {
      approveVintageMIM();
    }
  };

  const getWalletBalance = () => {
    if (mintToken === "Grape-MIM TJ") {
      return balanceGrapeMIMTJ;
    } else if (mintToken === "Grape-MIM SW") {
      return balanceGrapeMIMSW;
    } else if (mintToken === "xGrape") {
      return balanceXGrape;
    } else if (mintToken === "Vintage-MIM") {
      return balanceVintageMIM;
    }
    return 0;
  };

  const getButtonTitle = () => {
    if (
      (mintToken === "Grape-MIM TJ" &&
        approvedGrapeMIMTJ === ApprovalState.APPROVED) ||
      (mintToken === "Grape-MIM SW" &&
        approvedGrapeMIMSW === ApprovalState.APPROVED) ||
      (mintToken === "xGrape" && approvedXGrape === ApprovalState.APPROVED) ||
      (mintToken === "Vintage-MIM" &&
        approvedVintageMIM === ApprovalState.APPROVED)
    ) {
      return "Mint";
    }
    return "Approve";
  };

  const mintResult = () => {
    if (mintToken === "Grape-MIM TJ") {
      return Number(amount) * 10;
    } else if (mintToken === "Grape-MIM SW") {
      return Number(amount) * 10;
    } else if (mintToken === "xGrape") {
      return Number(amount) * 100;
    } else if (mintToken === "Vintage-MIM") {
      return Number(amount) * 10;
    }
    return 0;
  };

  const mintTokenTolevel = () => {
    if (mintToken === "Grape-MIM TJ") {
      return 1;
    } else if (mintToken === "Grape-MIM SW") {
      return 0;
    } else if (mintToken === "xGrape") {
      return 2;
    } else if (mintToken === "Vintage-MIM") {
      return 3;
    }
    return -1;
  };

  const processButtonClick = () => {
    if (
      (mintToken === "Grape-MIM TJ" &&
        approvedGrapeMIMTJ === ApprovalState.APPROVED) ||
      (mintToken === "Grape-MIM SW" &&
        approvedGrapeMIMSW === ApprovalState.APPROVED) ||
      (mintToken === "xGrape" && approvedXGrape === ApprovalState.APPROVED) ||
      (mintToken === "Vintage-MIM" &&
        approvedVintageMIM === ApprovalState.APPROVED)
    ) {
      mint(Number(amount), mintTokenTolevel());
      return;
    }
    approve();
  };

  const [mintToken, setMintToken] = React.useState("");
  const [amount, setAmount] = React.useState("");

  return (
    <div>
      <BootstrapDialog
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            width: "80%",
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
            Mint Raisin
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography mt={2} color="primary.light" component="p">
            RAISIN is a Grape Game token that is minted using a variety of Grape
            Ecosystem LP tokens. RAISIN used in the game is burnt, and LPs used
            to mint are added to POL, split and then used for price support.
          </Typography>
          <Typography mt={2} color="primary.light" variant="h6" component="p">
            Mint Raisin with
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
            spacing={1}
            sx={{
              marginBottom: "20px",
              width: "100%",
              color: "white",
              justifyContent: "space-around",
            }}
          >
            <div
              onClick={() => {
                setMintToken("Grape-MIM TJ");
              }}
              className={
                mintToken === "Grape-MIM TJ"
                  ? "mint-element mint-active"
                  : "mint-element"
              }
            >
              Grape-MIM TJ
            </div>
            <div
              onClick={() => {
                setMintToken("Grape-MIM SW");
              }}
              className={
                mintToken === "Grape-MIM SW"
                  ? "mint-element mint-active"
                  : "mint-element"
              }
            >
              Grape-MIM SW
            </div>
            <div
              onClick={() => {
                setMintToken("xGrape");
              }}
              className={
                mintToken === "xGrape"
                  ? "mint-element mint-active"
                  : "mint-element"
              }
            >
              xGrape
            </div>
            <div
              onClick={() => {
                setMintToken("Vintage-MIM");
              }}
              className={
                mintToken === "Vintage-MIM"
                  ? "mint-element mint-active"
                  : "mint-element"
              }
            >
              Vintage-MIM
            </div>
          </Stack>
          <Typography mt={2} color="primary.light" align="center" variant="h6" component="p">
            Your {mintToken} Wallet Balance
          </Typography>
          <Typography color="primary.light" align="center"  variant="h6" component="p">
            {getWalletBalance()}
          </Typography>
          <Stack direction={"row"} spacing={2} justifyContent="center" mt={3}>
            <NumberInput
              value={amount}
              setValue={setAmount}
              // max={Number(grapeBalance)}
            />

            <Button
              onClick={() => {
                processButtonClick();
                setOpen(false);
              }}
              disabled={
                getWalletBalance() === 0 || getWalletBalance() < +amount
              }
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
                "&:disabled": {
                  border: "3px solid #000",
                  background: "grey",
                },
              }}
              variant="contained"
            >
              {getButtonTitle()}
            </Button>
          </Stack>
          <Typography color="primary.light" align="center" variant="h6" component="p" mt={2}>
            You get {mintResult()} RAISIN
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
