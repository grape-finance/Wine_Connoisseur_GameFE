import { Container, Stack, Typography } from "@mui/material";
import ERC20 from "abi/types/ERC20";
import Loading from "components/Loading";
import StyledButton from "components/StyledButton";
import { VINTAGEWINE_FOUNTAIN_ADDRESS } from "config/address";
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
import { useTokenPrice } from "state/token/hooks";

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
    VINTAGEWINE_FOUNTAIN_ADDRESS[chainId!]
  );
  const { lpPrice, vintageWinePrice } = useTokenPrice();
  // get User Info
  const { USDCVintageWineLPBalance } = useTokenBalance();
  const [LPStakedBalance, setLPStakedBalance] = useState(0);
  const [pendingReward, setPendingReward] = useState(0);
  const [rewardPerDay, setRewardPerDay] = useState(0);
  const [apr, setapr] = useState(0);

  useEffect(() => {
    if (account && fountainContract) {
      try {
        const getUserInfo = async () => {
          const _userInfo: IUserInfoLP = await fountainContract.userInfo(
            account
          );
          const stakedBalance = +ethers.utils.formatEther(_userInfo.amount);

          setLPStakedBalance(stakedBalance);
          const _pendingReward = await fountainContract.pendingRewards(account);
          setPendingReward(+ethers.utils.formatEther(_pendingReward));
          const _getRewardPerSecond =
            await fountainContract.getRewardPerSecond();
          const _accRewardTokenPerShare =
            await fountainContract.accRewardTokenPerShare();
   
          let _LPSupply: BigNumber = await fountainContract.depositedBalance();
          _LPSupply = _LPSupply._hex === "0x00" ? BigNumber.from(1) : _LPSupply; // To prevent to devied by zero
           
          const _tokenReward = BigNumber.from(3600 * 24).mul(
            _getRewardPerSecond
          );

          const _rewardDayDollars = Number(_tokenReward) * vintageWinePrice;
          const _TVL = lpPrice * Number(_LPSupply);

          setapr(((_rewardDayDollars/_TVL)*100)*365)

          const _accRewardToken = _accRewardTokenPerShare.add(
            _tokenReward.mul(BigNumber.from(10).pow(12)).div(_LPSupply)
          );
          const _rewardPerDay = _userInfo.amount
            .mul(_accRewardToken)
            .div(BigNumber.from(10).pow(12))
            .sub(_userInfo.rewardDebt);
          setRewardPerDay(+ethers.utils.formatEther(_rewardPerDay));
        };
        getUserInfo();
      } catch (err) {
        console.log("err", err);
      }
    }
  }, [account, fountainContract, setLPStakedBalance]);

  // Stake & Unstake & Claim
  const [openStakeModal, setOpenStakeModal] = React.useState(false);
  const [openUnstakeModal, setOpenUnstakeModal] = React.useState(false);

  const stakeLP = async (amount: number) => {
    if (account && chainId && fountainContract) {
      try {
        let tx = await fountainContract.deposit(
          ethers.utils.parseEther(amount.toString())
        );
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err", err);
        //alert(err?.data.message);
        setLoading(false);
      }
    }
  };

  const unstakeLP = async (amount: number) => {
    if (account && chainId && fountainContract) {
      try {
        let tx = await fountainContract.withdraw(
          ethers.utils.parseEther(amount.toString())
        );
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err", err);
        //alert(err?.data.message);
        setLoading(false);
      }
    }
  };

  const claimLP = async () => {
    if (account && chainId && fountainContract) {
      try {
        let tx = await fountainContract.withdraw(BigNumber.from(1));
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err", err);
        //alert(err?.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <Container sx={{ my: 3, p: '0 !important' }}>
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
          WebkitBoxShadow: '5px 5px 5px #000'
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
              <StyledButton onClick={approve}>Stake</StyledButton>
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
          Staking APR:
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {trim(apr, 2)}%
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Your MIM-Vintage LP:
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {trim(USDCVintageWineLPBalance, 2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Staked MIM-Vintage LP:
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {trim(LPStakedBalance, 2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Vintage Earned:
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {trim(pendingReward, 2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Daily Earning:
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {trim(rewardPerDay, 2)}
        </Typography>

        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          <a target={'_blank'} rel="noopener noreferrer" href="https://www.swapsicle.io/add/0x01Af64EF39AEB5612202AA07B3A3829f20c395fd/0x130966628846BFd36ff31a822705796e8cb8C18D">Add liquidity here</a>
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
