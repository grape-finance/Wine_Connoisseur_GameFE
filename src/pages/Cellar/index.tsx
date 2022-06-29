import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
import { useTokenBalance } from "state/user/hooks";
import StakeDialog from "./stakeDialog";
import UnstakeDialog from "./unstakeDialog";
import StyledButton from "components/StyledButton";

const Cellar = () => {
  const [isLoading, setLoading] = useState(false);
  const { account, chainId } = useWeb3();
  const cellarContract = useCellarContract();
  const [cellarVintageWineBal, setCellarVintageWineBal] = useState(0);
  // const [frozenVintageWine, setFrozenVintageWine] = useState(0);
  const [userUnlockAmounts, setUserUnlockAmounts] = useState(0);
  const [userUnlockTimestamps, setUserUnlockTimestamps] = useState(0);
  const { vintageWineBalance } = useTokenBalance();
  const [userCellarAmounts, setUserCellarAmounts] = useState(0);

  const [openStakeModal, setOpenStakeModal] = React.useState(false);
  const [openUnstakeModal, setOpenUnstakeModal] = React.useState(false);

  const currentUnixTime = Math.round(new Date().getTime() / 1000);

  useEffect(() => {
    if (account && chainId && cellarContract) {
      const getInfo = async () => {
        // Multicall

        const web3Provider: string = NETWORKS.filter(
          (item) => item.chainId === chainId
        )[0]?.defaultProvider[0];
        const [
          _userCellarBalance,
          _vintageWineBal,
          // _frozenVintageWine,
          _userUnlockAmounts,
          _userUnlockTimestamps,
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
          ],
          web3Provider,
          chainId
        );
        setUserCellarAmounts(Number(_userCellarBalance) / Math.pow(10, 18));
        setCellarVintageWineBal(Number(_vintageWineBal) / Math.pow(10, 18));
        // setFrozenVintageWine(_frozenVintageWine);
        setUserUnlockAmounts(Number(_userUnlockAmounts) / Math.pow(10, 18));
        setUserUnlockTimestamps(Number(_userUnlockTimestamps));
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
      console.log("amount", amount);
      console.log(
        "ethers.utils.parseEther(amount.toString())",
        ethers.utils.parseEther(amount.toString())
      );
      try {
        setLoading(true);
        let tx = await cellarContract.stake(
          ethers.utils.parseEther(amount.toString())
        );

        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
  };

  const quickUnstake = async (shareAmount: number) => {
    if (account && chainId && cellarContract) {
      // console.log(
      //   "ethers.utils.parseEther(shareAmount.toString())",
      //   BigNumber.from(10 * Math.pow(10, 18))
      // );
      try {
        setLoading(true);
        let tx = await cellarContract.quickUnstake(
          ethers.utils.parseEther(shareAmount.toString())
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
  };

  const prepareDelayedUnstake = async (share: number) => {
    if (account && chainId && cellarContract) {
      try {
        setLoading(true);
        let tx = await cellarContract.prepareDelayedUnstake(
          ethers.utils.parseEther(share.toString())
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
  };

  const claimDelayedUnstake = async () => {
    if (account && chainId && cellarContract) {
      if (currentUnixTime > userUnlockTimestamps)
        alert("VINTAGEWINE not yet unlocked");
      try {
        setLoading(true);
        let tx = await cellarContract.claimDelayedUnstake(
          ethers.utils.parseEther(userUnlockAmounts.toFixed(10))
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
  };

  return (
    <Container sx={{ my: 3 }}>
      <Stack
        flexDirection="column"
        spacing={2}
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(28 25 23/0.95),rgb(41 37 36/0.95),rgb(28 25 23/0.7))",
          p: 3,
          borderRadius: "1.5rem",
          boxShadow: 2,
          textAlign: "center",
          border: "1px solid rgb(68 64 60)",
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
            {userUnlockTimestamps - currentUnixTime <= 0 && (
              <StyledButton onClick={() => claimDelayedUnstake()}>
                Withdraw Delay
              </StyledButton>
            )}
            <StyledButton onClick={() => setOpenUnstakeModal(true)}>
              Unstake
            </StyledButton>
          </Stack>
        </Stack>

        <Typography color="primary.light" variant="body2" component="p">
          Staked Vintage Wine
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {cellarVintageWineBal.toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Your Staked Balance
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {userCellarAmounts.toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Your Pending Balance
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {userUnlockAmounts.toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Withdrawable in
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {unixToDate(userUnlockTimestamps - currentUnixTime)}
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
