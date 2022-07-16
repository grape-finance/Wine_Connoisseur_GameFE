import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CardMedia,
  Container,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useGrapeContract,
  useWineryProgressionContract,
} from "hooks/useContract";
import Loading from "components/Loading";
import { useWeb3 } from "state/web3";
import { BigNumber, ethers } from "ethers";
import { WINERYPROGRESSION_ADDRESS } from "config/address";
import StyledButton from "components/StyledButton";
import { skills } from "config/skills";
import LockImg from "assets/image/skills/lock.svg";
import SkillDialog from "./skillDialog";
import ERC20 from "abi/types/ERC20";
import useApprove, { ApprovalState } from "hooks/useApprove";
import { useTokenBalance } from "state/user/hooks";
import { ISkillLearned, ISkills } from "interface/ISkill";
import { trim } from "utils/trim";
import NETWORKS from "config/network";
import multicall from "utils/multicall";
import WINERYPROGRESSION_ABI from "abi/wineryProgression.json";
import NumberInput from "components/NuberInput";

const Skills = () => {
  const { account, provider, chainId } = useWeb3();
  const [isLoading, setLoading] = useState(false);
  // Get user info
  const { grapeBalance } = useTokenBalance();
  // Getcontract
  const wineryProgressionContract = useWineryProgressionContract();
  const grapeContract = useGrapeContract();
  const grapeToken = useMemo(() => {
    if (provider && grapeContract) {
      const signer = provider.getSigner();
      return new ERC20(grapeContract.address, signer, "Grape");
    }
  }, [provider, grapeContract]);
  const [approveStatus, approve] = useApprove(
    grapeToken!,
    WINERYPROGRESSION_ADDRESS[chainId!]
  );
  // Get Skills variables
  const [grapeInput, setGrapeInput] = useState("");
  const [level, setLevel] = useState(0);
  const [skillPoint, setSkillPoint] = useState(0);
  const [skillLearned, setSkillLearned] = useState<ISkillLearned>();
  const [grapeDeposited, setGrapeDeposited] = useState(0);
  const [grapeDepositInCurrentLevel, setGrapeDepositInCurrentLevel] =
    useState(0);
  const [grapeToNextLevel, setGrapeToNextLevel] = useState(0);
  const [maxGrapeAmount, setMaxGrapeAmount] = useState(0);

  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [upgradeSkillType, setUpgradeSkillType] = useState(0);
  const [upgradeSkillPoint, setUpgradeSkillPoint] = useState(0);
  const [upgradeSkillDefinition, setUpgradeSkillDefinition] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      if (account && chainId && wineryProgressionContract) {
        const web3Provider: string = NETWORKS.filter(
          (item) => item.chainId === chainId
        )[0]?.defaultProvider[0];
        const [
          _level,
          _skillPoints,
          _skillLearned,
          _grapeDeposited,
          _grapeToNextLevel,
          _getGrapeDeposited,
          _maxGrapeAmount,
        ] = await multicall(
          WINERYPROGRESSION_ABI,
          [
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "getLevel",
              params: [account],
            },
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "getSkillPoints",
              params: [account],
            },
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "getSkillsLearned",
              params: [account],
            },
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "grapeDeposited",
              params: [account],
            },
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "getGrapeToNextLevel",
              params: [account],
            },
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "getGrapeDeposited",
              params: [account],
            },
            {
              address: WINERYPROGRESSION_ADDRESS[chainId],
              name: "maxGrapeAmount",
              params: [],
            },
          ],
          web3Provider,
          chainId
        );

        setLevel(+_level[0]);
        setSkillPoint(+_skillPoints[0]);
        setSkillLearned(_skillLearned as ISkillLearned);
        setGrapeDeposited(+ethers.utils.formatEther(_grapeDeposited[0]));
        setGrapeToNextLevel(+ethers.utils.formatEther(_grapeToNextLevel[0]));
        setGrapeDepositInCurrentLevel(
          +ethers.utils.formatEther(_getGrapeDeposited[0])
        );
        setMaxGrapeAmount(+ethers.utils.formatEther(_maxGrapeAmount[0]));
      }
    };
    getInfo();
  }, [account, chainId, wineryProgressionContract]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setGrapeInput(Number(event.target.value));
  // };

  const deposit = async () => {
    if (+grapeInput <= 0) alert("Grape token should be >0");
    else if (maxGrapeAmount - grapeDeposited < +grapeInput)
      alert("You reached out the Max amount");
    else if (account && chainId && grapeContract && wineryProgressionContract) {
      try {
        const tx = await wineryProgressionContract.depositGrape(
          BigNumber.from(+grapeInput).mul(BigNumber.from(10).pow(18))
        );
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err?data.message", err);
        alert(err?.data?.message!);
        setLoading(false);
      }
    }
  };

  const upgradeSkill = async () => {
    if (wineryProgressionContract) {
      try {
        let tx = await wineryProgressionContract.spendSkillPoints(
          upgradeSkillType,
          upgradeSkillPoint
        );
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err?data.message", err);
        alert(err?.data?.message!);
        setLoading(false);
      }
    }
  };

  const resetSkill = async () => {
    // alert(upgradeSkillType);
    // alert(upgradeSkillPoint);
    if (wineryProgressionContract) {
      try {
        let tx = await wineryProgressionContract.resetSkills();
        setLoading(true);
        await tx.wait();
        setLoading(false);
        window.location.reload();
      } catch (err: any) {
        console.log("err?data.message", err);
        alert(err?.data?.message!);
        setLoading(false);
      }
    }
  };

  const showSkills = () => {
    if (skillLearned) {
      return Object.keys(skills as ISkills).map((item, i) => {
        const subSkills = skills[item as keyof ISkills];
        return (
          <Stack
            key={i}
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" color="primary.light">
              {item} skill :
            </Typography>
            {subSkills.map((subItem, index) => {
              const skillPoint = Number(
                skillLearned[item as keyof ISkillLearned]
              );
              return (
                <Tooltip
                  title={
                    <>
                      <Typography variant="h5">{subItem.name}</Typography>
                      <Typography variant="subtitle1">
                        {subItem.definition}
                      </Typography>
                    </>
                  }
                  key={index}
                >
                  <Box
                    sx={{ position: "relative", width: "70px", height: "70px" }}
                  >
                    <CardMedia
                      component="img"
                      image={subItem.image}
                      style={{
                        position: "absolute",
                        width: "70px",
                        height: "70px",
                        cursor: "pointer",
                        filter: skillPoint < index ? "grayscale(100%)" : "none",
                      }}
                    />
                    {skillPoint === index && (
                      <Box
                        sx={{ position: "absolute" }}
                        onClick={() => {
                          setOpenSkillModal(true);
                          setUpgradeSkillType(i);
                          setUpgradeSkillPoint(skillPoint + 1);
                          setUpgradeSkillDefinition(subItem.definition);
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={LockImg}
                          sx={{
                            m: 0,
                            width: "70px",
                            height: "70px",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Tooltip>
              );
            })}
            ;
          </Stack>
        );
      });
    }
  };

  return (
    <Container sx={{ my: 3 }}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(28 25 23/0.95),rgb(41 37 36/0.95),rgb(28 25 23/0.7))",
          p: 3,
          borderRadius: "1.5rem",
          boxShadow: 2,
          border: "1px solid rgb(68 64 60)",
        }}
      >
        <Stack spacing={3}>
          <Typography
            color="primary.light"
            sx={{
              mt: 2,
              "&:hover": { color: "rgb(251 146 60)" },
            }}
            component="h6"
            variant="h6"
          >
            Your Grape Amount : {trim(grapeBalance, 2)}, Deposited Amount :{" "}
            {grapeDeposited}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ width: { sm: "100%", md: "40%" } }}>
              <LinearProgress
                variant="determinate"
                value={(grapeDepositInCurrentLevel / grapeToNextLevel) * 100}
                sx={{ height: 50, borderRadius: "10px" }}
              />
            </Box>
            <NumberInput
              value={grapeInput}
              setValue={setGrapeInput}
              max={maxGrapeAmount - grapeDeposited}
            />

            {approveStatus !== ApprovalState.APPROVED ? (
              <StyledButton onClick={approve}>Approve</StyledButton>
            ) : (
              <>
                <StyledButton onClick={() => deposit()}>Deposit</StyledButton>
                <StyledButton onClick={() => resetSkill()}>
                  Reset Skill
                </StyledButton>
              </>
            )}
          </Stack>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <Typography
              color="primary.light"
              sx={{
                "&:hover": { color: "rgb(251 146 60)" },
              }}
              component="h6"
              variant="h6"
            >
              Level : {level}, &nbsp; &nbsp; Skill point: {skillPoint} , &nbsp;
              &nbsp;
              {(grapeToNextLevel - grapeDepositInCurrentLevel).toFixed(2)} Grape
              to Next Level
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="center" spacing={2} marginTop={5}>
          {showSkills()}
        </Stack>
      </Box>

      <Loading isLoading={isLoading} />
      <SkillDialog
        open={openSkillModal}
        setOpen={setOpenSkillModal}
        skillDefinition={upgradeSkillDefinition}
        upgradeSkillPoint={() => upgradeSkill()}
      />
    </Container>
  );
};

export default Skills;
