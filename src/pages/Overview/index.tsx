import { Container, Stack, Tooltip, Typography } from "@mui/material";
import { BigNumber, ethers } from "ethers";

import {
  useGrapeContract,
  useGrapeMIMSWContract,
  useGrapeMIMTJContract,
  useVintageMIMContract,
  useWineryContract,
  useXGrapeContract,
  useRaisinContract,
  useRaisinTokenContract,
  useMIMContract,
} from "hooks/useContract";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useWeb3 } from "state/web3";
import multicall from "utils/multicall";
import { unixToDate } from "utils/unixToDate";
import WINERY_ABI from "abi/winery.json";
import WINERYPROGRESSION_ABI from "abi/wineryProgression.json";
import {
  WINERY_ADDRESS,
  WINERYPROGRESSION_ADDRESS,
  RAISIN_ADDRESS,
} from "config/address";
import { NETWORKS } from "config/network";
import _ from "lodash";
import { vintageWineAccruedCalculation } from "utils/winery";
import Loading from "components/Loading";
import StyledButton from "components/StyledButton";
import { setUserNFTState } from "state/user/actions";
import { useNFTState } from "state/user/hooks";
import ERC20 from "abi/types/ERC20";
import useApprove, { ApprovalState } from "hooks/useApprove";
import { useTokenBalance } from "state/user/hooks";
import useFirebase from "hooks/useFirebase";

import ResetFatigueDialog from "./resetFatigueDialog";
import ClaimDialog from "./claimDialog";
import MintRaisinDialog from "./mintDialog";

const Overview = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { account, provider, chainId } = useWeb3();
  // Get Contract
  const grapeContract = useGrapeContract();
  const raisinContract = useRaisinContract();
  const raisinTokenContract = useRaisinTokenContract();
  const grapeMIMTJContract = useGrapeMIMTJContract();
  const grapeMIMSWContract = useGrapeMIMSWContract();
  const xGrapeContract = useXGrapeContract();
  const vintageMIMContract = useVintageMIMContract();
  const MIMContract = useMIMContract();
  const wineryContract = useWineryContract();
  const firebase = useFirebase();

  const raisinToken = useMemo(() => {
    if (provider && raisinTokenContract) {
      const signer = provider.getSigner();
      return new ERC20(raisinTokenContract.address, signer, "Grape");
    }
  }, [provider, raisinTokenContract]);

  const [approveStatus, approve] = useApprove(
    raisinToken!,
    WINERY_ADDRESS[chainId!]
  );

  const grapeMIMTJToken = useMemo(() => {
    if (provider && grapeMIMTJContract) {
      const signer = provider.getSigner();
      return new ERC20(grapeMIMTJContract.address, signer, "JoePair");
    }
  }, [provider, grapeMIMTJContract]);
  const [grapeMIMTJApproveStatus, grapeMIMTJApprove] = useApprove(
    grapeMIMTJToken!,
    RAISIN_ADDRESS[chainId!]
  );

  const grapeMIMSWToken = useMemo(() => {
    if (provider && grapeMIMSWContract) {
      const signer = provider.getSigner();
      return new ERC20(grapeMIMSWContract.address, signer, "SiclePair");
    }
  }, [provider, grapeMIMSWContract]);
  const [grapeMIMSWApproveStatus, grapeMIMSWApprove] = useApprove(
    grapeMIMSWToken!,
    RAISIN_ADDRESS[chainId!]
  );

  const xGrapeToken = useMemo(() => {
    if (provider && xGrapeContract) {
      const signer = provider.getSigner();
      return new ERC20(xGrapeContract.address, signer, "xGRAPE");
    }
  }, [provider, xGrapeContract]);
  const [xGrapeApproveStatus, xGrapeApprove] = useApprove(
    xGrapeToken!,
    RAISIN_ADDRESS[chainId!]
  );

  const vintageMIMToken = useMemo(() => {
    if (provider && vintageMIMContract) {
      const signer = provider.getSigner();
      return new ERC20(vintageMIMContract.address, signer, "SiclePair");
    }
  }, [provider, vintageMIMContract]);
  const [vintageMIMApproveStatus, vintageMIMApprove] = useApprove(
    vintageMIMToken!,
    RAISIN_ADDRESS[chainId!]
  );

  const MIMToken = useMemo(() => {
    if (provider && MIMContract) {
      const signer = provider.getSigner();
      return new ERC20(MIMContract.address, signer, "SiclePair");
    }
  }, [provider, MIMContract]);
  const [MIMApproveStatus, MIMApprove] = useApprove(
    MIMToken!,
    RAISIN_ADDRESS[chainId!]
  );

  const { fatigueAccrued, timeUntilFatigues, vintageWineAccrued } =
    useNFTState();

  const [vpm, setvpm] = useState(0);
  const [ppm, setPPM] = useState(0);
  const [maxStorage, setMaxStorage] = useState(500);
  const [raisinResetCost, setRaisinResetCost] = useState(0);
  const [fatiguePerMinuteWithModifier, setFatiguePerMinuteWithModifier] =
    useState(0);
  const [claimBurn, setClaimBurn] = useState(10);
  const [claimContribution, setClaimContribution] = useState(10);
  const [claimBurnModifier, setClaimBurnModifier] = useState(0);
  const [claimContributionModifier, setClaimContributionModifier] = useState(0);

  const currentUnixTime = Math.round(new Date().getTime() / 1000);
  const [openResetFatigueDialog, setOpenResetFatigueDialog] = useState(false);
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  const [openMintDialog, setOpenMintDialog] = useState(false);

  const [userStakedList, setUserStakedList] = useState([]);

  const {
    grapeMIMTJBalance,
    grapeMIMSWBalance,
    xGrapeBalance,
    vintageMIMBalance,
    MIMTokenBalance,
  } = useTokenBalance();

  // Get staked NFT
  useEffect(() => {
    if (account && wineryContract) {
      const getNFTState = async () => {
        let res;
        res = await wineryContract.batchedStakesOfOwner(account, 0, 10000);
        setUserStakedList(res);
      };
      getNFTState();
    }
  }, [account, wineryContract]);

  useEffect(() => {
    if (account && chainId && wineryContract && !_.isEmpty(userStakedList)) {
      const getInfo = async () => {
        // Multicall

        const web3Provider: string = NETWORKS.filter(
          (item) => item.chainId === chainId
        )[0]?.defaultProvider[0];

        const [
          ppm,
          raisinResetCost,
          _startTime,
          _timeUntilFatigues,
          _wineryFatigue,
          _wineryVintageWine,
          _masterVintnerNumber,
          _fatiguePerMinuteWithModifier,
          _maxFatigue,
          _yieldPPS,
          _CLAIM_VINTAGEWINE_CONTRIBUTION_PERCENTAGE,
          _CLAIM_VINTAGEWINE_BURN_PERCENTAGE,
        ] = await multicall(
          WINERY_ABI,
          [
            {
              address: WINERY_ADDRESS[chainId],
              name: "getTotalPPM",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "grapeResetCost",
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "startTimeStamp",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "getTimeUntilFatigued",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "wineryFatigue",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "wineryVintageWine",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "getMasterVintnerNumber",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "getFatiguePerMinuteWithModifier",
              params: [account],
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "MAX_FATIGUE",
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "yieldPPS",
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "CLAIM_VINTAGEWINE_CONTRIBUTION_PERCENTAGE",
            },
            {
              address: WINERY_ADDRESS[chainId],
              name: "CLAIM_VINTAGEWINE_BURN_PERCENTAGE",
            },
          ],
          web3Provider,
          chainId
        );

        const [_maxStorage, _skillCellarModifier, _burnCellarModifier] =
          await multicall(
            WINERYPROGRESSION_ABI,
            [
              {
                address: WINERYPROGRESSION_ADDRESS[chainId],
                name: "getVintageWineStorage",
                params: [account],
              },
              {
                address: WINERYPROGRESSION_ADDRESS[chainId],
                name: "getCellarSkillModifier",
                params: [account],
              },
              {
                address: WINERYPROGRESSION_ADDRESS[chainId],
                name: "getBurnSkillModifier",
                params: [account],
              },
            ],
            web3Provider,
            chainId
          );

        setClaimContribution(_CLAIM_VINTAGEWINE_CONTRIBUTION_PERCENTAGE);
        setClaimBurn(_CLAIM_VINTAGEWINE_BURN_PERCENTAGE);
        setClaimContributionModifier(_skillCellarModifier);
        setClaimBurnModifier(_burnCellarModifier);

        // setppm(Number(ppm));
        setFatiguePerMinuteWithModifier(_fatiguePerMinuteWithModifier);
        setMaxStorage(Number(_maxStorage) / Math.pow(10, 18));
        setPPM(Number(ppm));
        setRaisinResetCost(Number(raisinResetCost / Math.pow(10, 18)));

        await calcualteVintageWinePerMin(
          Number(ppm),
          Number(_wineryFatigue),
          _wineryVintageWine / Math.pow(10, 18),
          Number(_timeUntilFatigues),
          Number(_masterVintnerNumber),
          Number(_startTime),
          Number(_fatiguePerMinuteWithModifier),
          Number(_maxFatigue),
          Number(_yieldPPS)
        );
      };

      getInfo();
      const interval = setInterval(getInfo, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [account, chainId, wineryContract, userStakedList]);

  const calcualteVintageWinePerMin = async (
    ppm: number,
    wineryFatigue: number,
    wineryVintageWine: number,
    timeUntilFatigued: number,
    masterVintnerNumber: number,
    startTimeStamp: number,
    fatiguePerMinuteWithModifier: number,
    maxFatigue: number,
    yieldPPS: number
  ) => {
    if (chainId && wineryContract && !_.isEmpty(userStakedList)) {
      const web3Provider = NETWORKS.filter(
        (item) => item.chainId === chainId
      )[0]?.defaultProvider[0];

      let [masterVintnerSkillModifier, maxVintageWine] = await multicall(
        WINERYPROGRESSION_ABI,
        [
          {
            address: WINERYPROGRESSION_ADDRESS[chainId],
            name: "getMasterVintnerSkillModifier",
            params: [account, masterVintnerNumber],
          },
          {
            address: WINERYPROGRESSION_ADDRESS[chainId],
            name: "getVintageWineStorage",
            params: [account],
          },
        ],
        web3Provider,
        chainId
      );

      masterVintnerSkillModifier = Number(masterVintnerSkillModifier);

      maxVintageWine = maxVintageWine / Math.pow(10, 18);

      const fatigueLastUpdate = wineryFatigue;
      if (fatigueLastUpdate === 100000000000000) {
        return 0;
      }

      let endTimestamp;
      if (currentUnixTime >= Number(timeUntilFatigued)) {
        endTimestamp = timeUntilFatigued;
      } else {
        endTimestamp = currentUnixTime;
      }

      const newVintageWineAmount = vintageWineAccruedCalculation(
        wineryVintageWine,
        // endTimestamp - startTimeStamp,
        60, // delta
        ppm,
        masterVintnerSkillModifier,
        fatigueLastUpdate,
        fatiguePerMinuteWithModifier,
        yieldPPS
      );
      setvpm(newVintageWineAmount / Math.pow(10, 18));

      const fatiguePerDay =
        ((fatiguePerMinuteWithModifier * 60 * 24) / maxFatigue) * 100;

      console.log(
        "Check refresh for vpm = ",
        newVintageWineAmount / Math.pow(10, 18)
      );
      console.log("Fatigue per Day " + Number(fatiguePerDay));
      firebase?.checkRefreshStats(
        newVintageWineAmount / Math.pow(10, 18),
        Number(fatiguePerDay),
        account!
      );

      dispatch(
        setUserNFTState({
          vintageWinePerMinute: newVintageWineAmount / Math.pow(10, 18),
        })
      );

      // If amount above storage value, return storage value
      if (newVintageWineAmount / Math.pow(10, 18) > maxVintageWine) {
        return maxVintageWine;
      }
      return newVintageWineAmount;
    }
  };

  const resetFatigue = async () => {
    if (account && chainId && grapeContract && wineryContract) {
      try {
        setLoading(true);
        let tx = await wineryContract.resetFatigue();
        await tx.wait();
        console.log('1')
        localStorage.setItem("refreshFirecloudStats", "true");
        window.location.reload();
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const mintRaisin = async (amount: number, mintToken: number) => {
    if (account && chainId && raisinContract) {
      try {
        setLoading(true);
        let tx = await raisinContract.mint(
          ethers.utils.parseEther(amount.toString()),
          mintToken
        );
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.error(err);
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  const claimVintageWine = async () => {
    if (account && chainId && grapeContract && wineryContract) {
      try {
        setLoading(true);
        let tx = await wineryContract.claimVintageWine();
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  return (
    <Container sx={{ my: 3, p: "0 !important", maxWidth: "unset !important" }}>
      <Stack
        flexDirection="column"
        spacing={2}
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(00 00 00/0.7),rgb(00 00 00/0.7),rgb(00 00 00/0.7))",
          p: 3,
          borderRadius: "1px",
          boxShadow: 2,
          textAlign: "center",
          border: "1px solid rgb(0 0 0)",
          WebkitBoxShadow: "5px 5px 5px #000",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
          spacing={3}
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {approveStatus !== ApprovalState.APPROVED ? (
            <StyledButton onClick={approve}>Approve Recharge</StyledButton>
          ) : (
            <StyledButton onClick={() => setOpenResetFatigueDialog(true)}>
              Recharge Vintners
            </StyledButton>
          )}

          <StyledButton onClick={() => setOpenMintDialog(true)}>
            Mint Raisin
          </StyledButton>

          <StyledButton onClick={() => setOpenClaimDialog(true)}>
            Claim Vintage
          </StyledButton>
        </Stack>
        <Typography color="primary.light" variant="body2" component="p">
          Vintage Per Minute
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {vpm.toFixed(2)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Current Fatigue
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {fatigueAccrued.toFixed(2)}%
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Max Fatigue in
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {fatiguePerMinuteWithModifier === 0
            ? "0m"
            : unixToDate(timeUntilFatigues)}
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Cost to Recharge with RAISIN
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {ppm * raisinResetCost} RAISIN
        </Typography>
        <Typography color="primary.light" variant="body2" component="p">
          Earned Vintage
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {vintageWineAccrued.toFixed(2)}/{Math.round(maxStorage)}
        </Typography>
      </Stack>
      <Loading isLoading={isLoading} />

      <ResetFatigueDialog
        open={openResetFatigueDialog}
        setOpen={setOpenResetFatigueDialog}
        raisinCost={ppm * raisinResetCost}
        resetFatigue={resetFatigue}
      />

      <ClaimDialog
        open={openClaimDialog}
        setOpen={setOpenClaimDialog}
        vintageToClaim={vintageWineAccrued!}
        claimContribution={claimContribution}
        claimBurn={claimBurn}
        claimContributionModifier={claimContributionModifier}
        claimBurnModifier={claimBurnModifier}
        claim={claimVintageWine}
      />

      <MintRaisinDialog
        open={openMintDialog}
        balanceGrapeMIMTJ={grapeMIMTJBalance}
        balanceGrapeMIMSW={grapeMIMSWBalance}
        balanceXGrape={xGrapeBalance}
        balanceVintageMIM={vintageMIMBalance}
        balanceMIM={MIMTokenBalance}
        approvedGrapeMIMTJ={grapeMIMTJApproveStatus}
        approvedGrapeMIMSW={grapeMIMSWApproveStatus}
        approvedXGrape={xGrapeApproveStatus}
        approvedVintageMIM={vintageMIMApproveStatus}
        approvedMIM={MIMApproveStatus}
        approveGrapeMIMTJ={grapeMIMTJApprove}
        approveGrapeMIMSW={grapeMIMSWApprove}
        approveXGrape={xGrapeApprove}
        approveVintageMIM={vintageMIMApprove}
        approveMIM={MIMApprove}
        setOpen={setOpenMintDialog}
        mint={mintRaisin}
      />
    </Container>
  );
};

export default Overview;
