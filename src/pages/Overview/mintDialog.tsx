import * as React from "react";
import { useState } from "react";
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
import { useRaisinContract } from "hooks/useContract";
import { useTokenPrice } from "state/token/hooks";

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
  balanceMIM: number;
  approvedGrapeMIMTJ: number;
  approvedGrapeMIMSW: number;
  approvedXGrape: number;
  approvedVintageMIM: number;
  approvedMIM: number;
  approveGrapeMIMTJ: () => void;
  approveGrapeMIMSW: () => void;
  approveXGrape: () => void;
  approveVintageMIM: () => void;
  approveMIM: () => void;
  setOpen: (arg: boolean) => void;
  mint: (amount: number, mintToken: number) => void;
}

export default function MintDialog({
  open,
  balanceGrapeMIMTJ,
  balanceGrapeMIMSW,
  balanceXGrape,
  balanceVintageMIM,
  balanceMIM,
  approvedGrapeMIMTJ,
  approvedGrapeMIMSW,
  approvedXGrape,
  approvedVintageMIM,
  approvedMIM,
  approveGrapeMIMTJ,
  approveGrapeMIMSW,
  approveXGrape,
  approveVintageMIM,
  approveMIM,
  setOpen,
  mint,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const raisinContract = useRaisinContract();
  const [convertedAmount, setConvertedAmount] = React.useState(0);
  const [raisinCost, setRaisinCost] = React.useState("");
  const [mintToken, setMintToken] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const { lpPrice, grapeMIMTJPrice, grapeMIMSWPrice, xGrapePrice, mimPrice } =
    useTokenPrice();

  React.useEffect(() => {
    mintConversionRate();
  }, [amount, mintToken]);

  const approve = () => {
    if (mintToken === "Grape-MIM TJ") {
      approveGrapeMIMTJ();
    } else if (mintToken === "Grape-MIM SW") {
      approveGrapeMIMSW();
    } else if (mintToken === "xGrape") {
      approveXGrape();
    } else if (mintToken === "Vintage-MIM") {
      approveVintageMIM();
    } else if (mintToken === "MIM") {
      approveMIM();
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
    } else if (mintToken === "MIM") {
      return balanceMIM;
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
        approvedVintageMIM === ApprovalState.APPROVED) ||
      (mintToken === "MIM" && approvedMIM === ApprovalState.APPROVED)
    ) {
      return "Mint";
    }
    return "Approve";
  };

  const mintConversionRate = async () => {
    let level = -1;
    let costOfMintToken = -1;
    if (mintToken && raisinContract) {
      if (mintToken === "Grape-MIM TJ") {
        level = 1;
        costOfMintToken = grapeMIMTJPrice;
      } else if (mintToken === "Grape-MIM SW") {
        level = 0;
        costOfMintToken = grapeMIMSWPrice;
      } else if (mintToken === "xGrape") {
        level = 2;
        costOfMintToken = xGrapePrice;
      } else if (mintToken === "Vintage-MIM") {
        level = 3;
        costOfMintToken = lpPrice;
      } else if (mintToken === "MIM") {
        level = 4;
        costOfMintToken = mimPrice;
      }

      const conversionRate = await raisinContract.conversion(
        Number(amount),
        level
      );
      const priceOfOneRaisinUsingMintToken = Number(
        (await raisinContract.mintPrices(level)) / 1e18
      );

      console.log("Price of token = " + costOfMintToken);
      console.log("Price of one raisin = " + priceOfOneRaisinUsingMintToken);
      setConvertedAmount(Number(conversionRate));
      setRaisinCost(
        (priceOfOneRaisinUsingMintToken * costOfMintToken).toFixed(4)
      );
    }
    return -1;
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
    } else if (mintToken === "MIM") {
      return 4;
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
        approvedVintageMIM === ApprovalState.APPROVED) ||
      (mintToken === "MIM" && approvedMIM === ApprovalState.APPROVED)
    ) {
      mint(Number(amount), mintTokenTolevel());
      return;
    }
    approve();
  };

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
              <div>Grape-MIM TJ</div>
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
              <div>Grape-MIM SW</div>
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
              <div>xGRAPE</div>
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
              <div>Vintage-MIM</div>
            </div>
            <div
              onClick={() => {
                setMintToken("MIM");
              }}
              className={
                mintToken === "MIM"
                  ? "mint-element mint-active"
                  : "mint-element"
              }
            >
              <div>MIM</div>
            </div>
          </Stack>
          <Typography
            mt={2}
            color="primary.light"
            align="center"
            variant="h6"
            component="p"
          >
            Your {mintToken} Wallet Balance
          </Typography>
          <Typography
            color="primary.light"
            align="center"
            variant="h6"
            component="p"
          >
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
              className="menu-button"
            >
              {getButtonTitle()}{" "}
            </Button>
          </Stack>
          <Typography
            color="primary.light"
            align="center"
            variant="h6"
            component="p"
            mt={2}
          >
            You get {convertedAmount} RAISIN. 1 RAISIN COSTS $
            {raisinCost.length ? raisinCost : "0.00"}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
