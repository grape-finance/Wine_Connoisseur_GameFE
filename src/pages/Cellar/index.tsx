import { Alert, Container, Snackbar, Stack, Typography } from "@mui/material";
import { useCellarContract } from "hooks/useContract";
import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useWeb3 } from "state/web3";
import Loading from "components/Loading";
import NETWORKS from "config/network";
import { CELLAR_ADDRESS } from "config/address";
import multicall from "utils/multicall";
import { unixToDate } from "utils/unixToDate";
import CELLAR_ABI from "abi/cellar.json";
import StakeDialog from "./stakeDialog";
import UnstakeDialog from "./unstakeDialog";
import StyledButton from "components/StyledButton";

const Cellar = () => {
  const [isLoading, setLoading] = useState(false);
  const { account, chainId } = useWeb3();
  const cellarContract = useCellarContract();
  const currentUnixTime = Math.round(new Date().getTime() / 1000);

  // const [frozenVintageWine, setFrozenVintageWine] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [vintageBalance, setVintageBalance] = useState(0);
  const [userUnlockAmounts, setUserUnlockAmounts] = useState(BigNumber.from(0));
  const [cellarVintageWineBal, setCellarVintageWineBal] = useState(
    BigNumber.from(0)
  );
  const [userUnlockTimestamps, setUserUnlockTimestamps] = useState(
    BigNumber.from(0)
  );
  const [userCellarAmounts, setUserCellarAmounts] = useState(BigNumber.from(0));

  const [openStakeModal, setOpenStakeModal] = React.useState(false);
  const [openUnstakeModal, setOpenUnstakeModal] = React.useState(false);

  const [snack, setSnack] = useState({ open: false, message: "" });
  const vertical = "top";
  const horizontal = "right";

  const handleClose = () => {
    setSnack({ open: false, message: "" });
  };

  useEffect(() => {
    if (account && chainId && cellarContract) {
      const getInfo = async () => {
        const web3Provider: string = NETWORKS.filter(
          (item) => item.chainId === chainId
        )[0]?.defaultProvider[0];
        const [
          _userCellarBalance,
          _vintageWineBal,
          // _frozenVintageWine,
          _userUnlockAmounts,
          _userUnlockTimestamps,
          _totalSupply,
          _vintageBalance,
        ] = await multicall(
          CELLAR_ABI,
          [
            {
              address: CELLAR_ADDRESS[chainId],
              name: "balanceOf",
              params: [account],
            },
            {
              address: CELLAR_ADDRESS[chainId],
              name: "vintageWineBalance",
            },
            // {
            //   address: CELLAR_ADDRESS[chainId],
            //   name: "frozenVintageWine",
            // },
            {
              address: CELLAR_ADDRESS[chainId],
              name: "unlockAmounts",
              params: [account],
            },
            {
              address: CELLAR_ADDRESS[chainId],
              name: "unlockTimestamps",
              params: [account],
            },
            {
              address: CELLAR_ADDRESS[chainId],
              name: "totalSupply",
            },
            {
              address: CELLAR_ADDRESS[chainId],
              name: "vintageWineBalance",
            },
          ],
          web3Provider,
          chainId
        );

        setUserCellarAmounts(_userCellarBalance[0]);
        setCellarVintageWineBal(_vintageWineBal[0]);
        // setFrozenVintageWine(_frozenVintageWine);
        setUserUnlockAmounts(_userUnlockAmounts[0]);
        setUserUnlockTimestamps(_userUnlockTimestamps[0]);
        setTotalSupply(_totalSupply);
        setVintageBalance(_vintageBalance);
      };
      getInfo();
      const interval = setInterval(getInfo, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [account, chainId, cellarContract]);

  const stakeVintageWine = async (amount: number) => {
    if (account && chainId && cellarContract) {
      try {
        setLoading(true);
        let tx = await cellarContract.stake(
          ethers.utils.parseEther(amount.toString())
        );

        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          setSnack({
            open: true,
            message: msg.replace("execution reverted: ", ""),
          });
        }
        setLoading(false);
      }
    }
  };

  const quickUnstake = async (shareAmount: string) => {
    if (account && chainId && cellarContract) {
      try {
        setLoading(true);
        let tx = await cellarContract.quickUnstake(
          ethers.utils.parseEther(shareAmount)
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          setSnack({
            open: true,
            message: msg.replace("execution reverted: ", ""),
          });
        }
        setLoading(false);
      }
    }
  };

  const prepareDelayedUnstake = async (share: string) => {
    if (account && chainId && cellarContract) {
      try {
        setLoading(true);
        let tx = await cellarContract.prepareDelayedUnstake(
          ethers.utils.parseEther(share)
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          setSnack({
            open: true,
            message: msg.replace("execution reverted: ", ""),
          });
        }
        setLoading(false);
      }
    }
  };

  const claimDelayedUnstake = async () => {
    if (account && chainId && cellarContract) {
      // if (currentUnixTime > +userUnlockTimestamps)
      //   alert("VINTAGE not yet unlocked");
      // else {
      try {
        setLoading(true);
        let tx = await cellarContract.claimDelayedUnstake(
          // ethers.utils.parseUnits(userUnlockAmounts.toString())
          userUnlockAmounts
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
      // }
    }
  };

  return (
    <Container sx={{ my: 3, p: "0 !important", maxWidth: "unset !important" }}>
      <Snackbar
        style={{ marginTop: "80px" }}
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={snack.open}
        onClose={handleClose}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
      <Stack
        flexDirection="column"
        spacing={2}
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(00 00 00/0.8),rgb(00 00 00/0.8),rgb(00 00 00/0.8))",
          p: 3,
          borderRadius: "1px",
          boxShadow: 2,
          textAlign: "center",
          border: "1px solid rgb(0 0 0)",
          WebkitBoxShadow: "5px 5px 5px #000",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          justifyContent="space-between"
          sx={{
            marginX: "20px",
          }}
          spacing={3}
        >
          <StyledButton onClick={() => setOpenStakeModal(true)}>
            Stake
          </StyledButton>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={3}
          >
            {+userUnlockTimestamps - currentUnixTime <= 0 && (
              <StyledButton onClick={() => claimDelayedUnstake()}>
                Claim
              </StyledButton>
            )}
            <StyledButton onClick={() => setOpenUnstakeModal(true)}>
              Unstake
            </StyledButton>
          </Stack>
        </Stack>

        <Typography color="primary.light" variant="body2" component="p">
          Total Staked Vintage
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {(+ethers.utils.formatEther(cellarVintageWineBal)).toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Your sVintage Balance
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {(+ethers.utils.formatEther(userCellarAmounts)).toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Your Delayed Unstake Pending
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {(+ethers.utils.formatEther(userUnlockAmounts)).toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Delay Withdrawable in
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {+userUnlockTimestamps === 0
            ? "0m"
            : unixToDate(+userUnlockTimestamps - currentUnixTime)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          sVintage to Vintage
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {(Number(vintageBalance) / Number(totalSupply)).toFixed(2)}
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p" style={{paddingTop:'40px'}}>
          <a href="https://grapefinance.app/dashboard#farms" rel="noopener noreferrer" target='_blank'>Stake your sVintage in the Vineyard to earn WINE</a>
        </Typography>
      </Stack>
      <Loading isLoading={isLoading} />
      <StakeDialog
        open={openStakeModal}
        setOpen={setOpenStakeModal}
        stakeVintageWine={stakeVintageWine}
      />
      <UnstakeDialog
        open={openUnstakeModal}
        setOpen={setOpenUnstakeModal}
        userCellarAmounts={userCellarAmounts}
        quickUnstake={quickUnstake}
        prepareDelayedUnstake={prepareDelayedUnstake}
      />
    </Container>
  );
};

export default Cellar;
