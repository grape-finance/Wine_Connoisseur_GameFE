import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CardMedia,
  Container,
  Grid,
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
import BuySkillsDialog from "./buySkillsDialog";
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
  let a = "0";
  // Get Skills variables
  const [level, setLevel] = useState(0);
  const [skillPoint, setSkillPoint] = useState(0);
  const [skillLearned, setSkillLearned] = useState<ISkillLearned>();
  const [grapeDeposited, setGrapeDeposited] = useState(0);
  const [grapeDepositInCurrentLevel, setGrapeDepositInCurrentLevel] =
    useState(0);
  const [grapeToNextLevel, setGrapeToNextLevel] = useState(0);
  const [maxGrapeAmount, setMaxGrapeAmount] = useState(0);

  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [openBuySkillsModal, setOpenBuySkillsModal] = useState(false);
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

  const depositGrape = async (amount: number) => {
    if (+amount <= 0) alert("Grape token should be >0");
    else if (maxGrapeAmount - grapeDeposited < +amount)
      alert("You reached out the Max amount");
    else if (account && chainId && grapeContract && wineryProgressionContract) {
      try {
        const tx = await wineryProgressionContract.depositGrape(
          BigNumber.from(+amount).mul(BigNumber.from(10).pow(18))
        );
        setLoading(true);
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
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
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
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  const showSkills = () => {
    if (skillLearned) {
      return Object.keys(skills as ISkills).map((item, i) => {
        if (item == "burn") {
          a = "quality";
        } else if (item == "mastervintner") {
          a = "mastery";
        } else if (item == "vintageWineStorage") {
          a = "storage";
        } else {
          a = item;
        }
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
              {a} skill:
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
    <Container sx={{ my: 3, p: "0 !important", maxWidth: "unset !important" }}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(00 00 00/0.8),rgb(00 00 00/0.8),rgb(00 00 00/0.8))",
          p: 3,
          borderRadius: "1px",
          boxShadow: 2,
          border: "1px solid rgb(0 0 0)",
          WebkitBoxShadow: "5px 5px 5px #000",
        }}
      >
        <Stack spacing={3}>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Typography
                color="rgb(251 146 60)"
                sx={{
                  mt: 2,
                  "&:hover": { color: "rgb(251 146 60)" },
                }}
                component="h6"
                variant="h6"
              >
                Grape in Wallet: {trim(grapeBalance, 2)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color="rgb(251 146 60)"
                sx={{
                  mt: 2,
                  "&:hover": { color: "rgb(251 146 60)" },
                }}
                component="h6"
                variant="h6"
              >
                Total Deposited Grape: {grapeDeposited}
              </Typography>
            </Grid>
          </Grid>

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

            {approveStatus !== ApprovalState.APPROVED ? (
              <StyledButton onClick={approve}>Approve</StyledButton>
            ) : (
              <>
                <StyledButton onClick={() => setOpenBuySkillsModal(true)}>
                  Buy Levels
                </StyledButton>
                <StyledButton onClick={() => resetSkill()}>Reset</StyledButton>
              </>
            )}
          </Stack>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <Typography
              color="rgb(251 146 60)"
              sx={{
                "&:hover": { color: "rgb(251 146 60)" },
              }}
              component="h6"
              variant="h6"
            >
              Level: {level}
            </Typography>
            <Typography
              color="rgb(251 146 60)"
              sx={{
                "&:hover": { color: "rgb(251 146 60)" },
              }}
              component="h6"
              variant="h6"
            >
              Skill point to use: {skillPoint}
            </Typography>
            <Typography
              color="rgb(251 146 60)"
              sx={{
                "&:hover": { color: "rgb(251 146 60)" },
              }}
              component="h6"
              variant="h6"
            >
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

      <BuySkillsDialog
        open={openBuySkillsModal}
        setOpen={setOpenBuySkillsModal}
        grapeBalance={trim(grapeBalance, 2)}
        depositGrape={depositGrape}
      />

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
