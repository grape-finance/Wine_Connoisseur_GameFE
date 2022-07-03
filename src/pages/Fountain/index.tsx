import { Container, Stack, Typography } from "@mui/material";
import ERC20 from "abi/types/ERC20";
import Loading from "components/Loading";
import StyledButton from "components/StyledButton";
import { USDC_VINTAGEWINE_LP_ADDRESS } from "config/address";
import { BigNumber, ethers } from "ethers";
import useApprove, { ApprovalState } from "hooks/useApprove";
import {
  useUSDCVintageWineLPContract,
  useVintageWineFountainContract,
} from "hooks/useContract";
import { IUserInfoLP } from "interface/IUserInfoLP";
import React, { useEffect, useMemo, useState } from "react";
import { useTokenBalance } from "state/user/hooks";
import { useWeb3 } from "state/web3";
import { trim } from "utils/trim";
import LPStakeDialog from "./LPstakeDialog";
import LPUnstakeDialog from "./LPunstakeDialog";

const Fountain = () => {
  const { account, provider, chainId } = useWeb3();
  const [isLoading, setLoading] = useState(false);
  // Get Contract
  const LPContract = useUSDCVintageWineLPContract();
  const fountainContract = useVintageWineFountainContract();
  const LPToken = useMemo(() => {
    if (provider && LPContract) {
      const signer = provider.getSigner();
      return new ERC20(LPContract.address, signer, "Grape");
    }
  }, [provider, LPContract]);
  const [approveStatus, approve] = useApprove(
    LPToken!,
    USDC_VINTAGEWINE_LP_ADDRESS[chainId!]
  );

  // get User Info
  const { USDCVintageWineLPBalance } = useTokenBalance();
  const [LPStakedBalance, setLPStakedBalance] = useState(0);
  const [pendingReward, setPendingReward] = useState(0);
  const [rewardPerDay, setRewardPerDay] = useState(0);

  useEffect(() => {
    if (account && fountainContract) {
      const getUserInfo = async () => {
        const _userInfo: IUserInfoLP = await fountainContract.userInfo(account);
        const stakedBalance = Number(
          ethers.utils.formatEther(_userInfo.amount)
        );
        setLPStakedBalance(stakedBalance);
        const _pendingReward = await fountainContract.pendingRewards(account);
        setPendingReward(Number(ethers.utils.formatEther(_pendingReward)));
        const _getRewardPerSecond = await fountainContract.getRewardPerSecond();
        const _accRewardTokenPerShare =
          await fountainContract.accRewardTokenPerShare();

        let _LPSupply: BigNumber = await fountainContract.depositedBalance();
        _LPSupply = _LPSupply._hex === "0x00" ? BigNumber.from(1) : _LPSupply; // // To prevent to devied by zerio

        const _tokenReward = BigNumber.from(3600 * 24).mul(_getRewardPerSecond);
        const _accRewardToken =
          // _accRewardTokenPerShare.add(
          _tokenReward.mul(BigNumber.from(10).pow(12)).div(_LPSupply);
        // );
        const _rewardPerDay = _userInfo.amount
          .mul(_accRewardToken)
          .div(BigNumber.from(10).pow(12))
          .sub(_userInfo.rewardDebt);
        console.log(_accRewardTokenPerShare, _getRewardPerSecond, _LPSupply);
        setRewardPerDay(Number(ethers.utils.formatEther(_rewardPerDay)));
      };
      getUserInfo();
    }
  }, [account, fountainContract, setLPStakedBalance]);

  // Stake & Unstake & Claim
  const [openStakeModal, setOpenStakeModal] = React.useState(false);
  const [openUnstakeModal, setOpenUnstakeModal] = React.useState(false);

  const stakeLP = async (amount: number) => {
    if (account && chainId && fountainContract) {
      try {
        setLoading(true);
        let tx = await fountainContract.deposit(
          ethers.utils.parseEther(amount.toString())
        );

        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err", err);
        alert(err?.data.message);
        setLoading(false);
      }
    }
  };

  const unstakeLP = async (amount: number) => {
    if (account && chainId && fountainContract) {
      try {
        setLoading(true);
        let tx = await fountainContract.withdraw(
          ethers.utils.parseEther(amount.toString())
        );

        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err", err);
        alert(err?.data.message);
        setLoading(false);
      }
    }
  };

  const claimLP = async () => {
    if (account && chainId && fountainContract) {
      try {
        setLoading(true);
        let tx = await fountainContract.withdraw(BigNumber.from(1));

        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err", err);
        alert(err?.data.message);
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
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={3}
          >
            {approveStatus !== ApprovalState.APPROVED ? (
              <StyledButton onClick={approve}>Approve</StyledButton>
            ) : (
              <>
                <StyledButton onClick={() => setOpenStakeModal(true)}>
                  Stake
                </StyledButton>
                <StyledButton onClick={() => setOpenUnstakeModal(true)}>
                  Unstake
                </StyledButton>
              </>
            )}
          </Stack>
          <StyledButton onClick={() => claimLP()}>Claim</StyledButton>
        </Stack>

        <Typography color="primary.light" variant="body2" component="p">
          Your USDC-VintageWine LP :
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {trim(USDCVintageWineLPBalance, 2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Staked USDC-VintageWine LP :
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {trim(LPStakedBalance, 2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Grape Earned:
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {trim(pendingReward, 2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Daily Earning:
        </Typography>
        <Typography color="rgb(249 115 22)" variant="body2" component="p">
          {trim(rewardPerDay, 2)}
        </Typography>
      </Stack>
      <Loading isLoading={isLoading} />
      <LPStakeDialog
        open={openStakeModal}
        setOpen={setOpenStakeModal}
        stakeLP={stakeLP}
      />
      <LPUnstakeDialog
        open={openUnstakeModal}
        setOpen={setOpenUnstakeModal}
        LPStakedBalance={LPStakedBalance}
        unstakeLP={unstakeLP}
      />
    </Container>
  );
};

export default Fountain;
