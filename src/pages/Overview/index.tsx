import { Container, Stack, Typography } from "@mui/material";
import { useGrapeContract, useWineryContract } from "hooks/useContract";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useWeb3 } from "state/web3";
import multicall from "utils/multicall";
import { unixToDate } from "utils/unixToDate";
import WINERY_ABI from "abi/winery.json";
import WINERYPROGRESSION_ABI from "abi/wineryProgression.json";
import { WINERY_ADDRESS, WINERYPROGRESSION_ADDRESS } from "config/address";
import { NETWORKS } from "config/network";
import _ from "lodash";
import { vintageWineAccruedCalculation } from "utils/winery";
import Loading from "components/Loading";
import StyledButton from "components/StyledButton";
import { setUserNFTState } from "state/user/actions";
import { useNFTState } from "state/user/hooks";
import ERC20 from "abi/types/ERC20";
import useApprove, { ApprovalState } from "hooks/useApprove";
import useFirebase from "hooks/useFirebase";

const Overview = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { account, provider, chainId } = useWeb3();
  // Get Contract
  const grapeContract = useGrapeContract();
  const wineryContract = useWineryContract();
  const firebase = useFirebase();

  const grapeToken = useMemo(() => {
    if (provider && grapeContract) {
      const signer = provider.getSigner();
      return new ERC20(grapeContract.address, signer, "Grape");
    }
  }, [provider, grapeContract]);
  const [approveStatus, approve] = useApprove(
    grapeToken!,
    WINERY_ADDRESS[chainId!]
  );

  const { fatigueAccrued, timeUntilFatigues, vintageWineAccrued } =
    useNFTState();

  const [vpm, setvpm] = useState(0);
  const [fatiguePerMinuteWithModifier, setFatiguePerMinuteWithModifier] =
    useState(0);
  const currentUnixTime = Math.round(new Date().getTime() / 1000);

  const [userStakedList, setUserStakedList] = useState([]);
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
          _startTime,
          _timeUntilFatigues,
          _wineryFatigue,
          _wineryVintageWine,
          _masterVintnerNumber,
          _fatiguePerMinuteWithModifier,
          _yieldPPS,
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
              name: "yieldPPS",
            },
          ],
          web3Provider,
          chainId
        );
        // setppm(Number(ppm));
        setFatiguePerMinuteWithModifier(_fatiguePerMinuteWithModifier);

        await calcualteVintageWinePerMin(
          Number(ppm),
          Number(_wineryFatigue),
          _wineryVintageWine / Math.pow(10, 18),
          Number(_timeUntilFatigues),
          Number(_masterVintnerNumber),
          Number(_startTime),
          Number(_fatiguePerMinuteWithModifier),
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
    yieldPPS: number
  ) => {
    if (chainId && wineryContract && !_.isEmpty(userStakedList)) {
      // console.log("ppm", ppm);
      // console.log("wineryFatigue", wineryFatigue);
      // console.log("wineryVintageWine", wineryVintageWine);
      // console.log("timeUntilFatigue", timeUntilFatigued);
      // console.log("masterVinterNumber", masterVintnerNumber);
      // console.log("startTimeStamp", startTimeStamp);
      // console.log("fatiguePerMinuteWithModifier", fatiguePerMinuteWithModifier);
      // console.log("yieldPPS", yieldPPS);
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
      dispatch(
        setUserNFTState({
          vintageWinePerMinute: newVintageWineAmount / Math.pow(10, 18),
        })
      );

      if (newVintageWineAmount / Math.pow(10, 18) > maxVintageWine) {
        return maxVintageWine;
      }
      firebase?.setField(
        "vpm",
        newVintageWineAmount / Math.pow(10, 18),
        account!
      );
      return newVintageWineAmount;
    }
  };

  const resetFatigue = async () => {
    if (account && chainId && grapeContract && wineryContract) {
      try {
        // let tx = await grapeContract.approve(
        //   WINERY_ADDRESS[chainId],
        //   ethers.utils.parseEther((0.1 * ppm).toString())
        // );
        // setLoading(true);
        // await tx.wait();
        let tx = await wineryContract.resetFatigue();
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log("err", err);
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
            <StyledButton onClick={approve}>Approve</StyledButton>
          ) : (
            <StyledButton onClick={() => resetFatigue()}>Rest</StyledButton>
          )}

          <StyledButton onClick={() => claimVintageWine()}>Claim</StyledButton>
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
          Earned Vintage
        </Typography>
        <Typography color="rgb(251 146 60)" variant="body2" component="p">
          {vintageWineAccrued.toFixed(2)}
        </Typography>
      </Stack>
      <Loading isLoading={isLoading} />
    </Container>
  );
};

export default Overview;
