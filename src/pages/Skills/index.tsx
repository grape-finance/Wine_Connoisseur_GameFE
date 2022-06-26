import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  useGrapeContract,
  useWineryProgressionContract,
} from "hooks/useContract";
import Loading from "components/Loading";
import { useWeb3 } from "state/web3";
import { getImpliedNodeFormatForFile } from "typescript";
import { BigNumber, ethers } from "ethers";
import { WINERYPROGRESSION_ADDRESS } from "config/address";
import StyledButton from "components/StyledButton";

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "#000",
  backgroundColor: "rgb(255 237 213)",
  borderRadius: 8,
  textAlign: "end",
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
})) as typeof TextField;

const Skills = () => {
  const { account, chainId } = useWeb3();
  const [isLoading, setLoading] = useState(false);
  const wineryProgressionContract = useWineryProgressionContract();
  const grapeContract = useGrapeContract();
  const [grapeInput, setGrapeInput] = useState(0);
  const [level, setLevel] = useState(0);
  const [grapeDeposited, setGrapeDeposited] = useState(0);
  const [grapeDepositInCurrentLevel, setGrapeDepositInCurrentLevel] =
    useState(0);
  const [grapeToNextLevel, setGrapeToNextLevel] = useState(0);

  useEffect(() => {
    const getInfo = async () => {
      if (account && wineryProgressionContract) {
        let response;
        response = await wineryProgressionContract.getLevel(account);
        setLevel(Number(response));
        response = await wineryProgressionContract.grapeDeposited(account);
        setGrapeDeposited(Number(ethers.utils.formatEther(response)));
        response = await wineryProgressionContract.getGrapeToNextLevel(account);
        setGrapeToNextLevel(Number(ethers.utils.formatEther(response)));
        response = await wineryProgressionContract.getGrapeDeposited(account);
        setGrapeDepositInCurrentLevel(
          Number(ethers.utils.formatEther(response))
        );
      }
    };
    getInfo();
  }, [account, wineryProgressionContract]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrapeInput(Number(event.target.value));
  };

  const deposit = async () => {
    if (grapeInput <= 0) alert("Grape token should be >0");
    else if (account && chainId && grapeContract && wineryProgressionContract) {
      try {
        console.log("ethers.utils.formatEther(grapeInput) :>> ", grapeInput);
        let tx = await grapeContract.approve(
          WINERYPROGRESSION_ADDRESS[chainId],
          BigNumber.from(grapeInput).mul(BigNumber.from(10).pow(18))
        );
        setLoading(true);
        await tx.wait();
        tx = await wineryProgressionContract.depositGrape(
          BigNumber.from(grapeInput).mul(BigNumber.from(10).pow(18))
        );

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
  console.log("grapeInput", grapeInput);
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
            {grapeDeposited} Grape Deposited
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            <StyledTextField
              sx={{ width: { xs: "100%", md: "50%" } }}
              InputProps={{ style: { textAlign: "end" } }}
              value={grapeInput}
              id="outlined-basic"
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
            <StyledButton onClick={() => deposit()}>Deposit Grape</StyledButton>
            <StyledButton onClick={() => deposit()}>Reset Skill</StyledButton>
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
              Level : {level}
            </Typography>

            <Typography
              color="primary.light"
              sx={{
                "&:hover": { color: "rgb(251 146 60)" },
              }}
              component="h6"
              variant="h6"
            >
              GrapeToNextLevel : {grapeToNextLevel - grapeDepositInCurrentLevel}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Loading isLoading={isLoading} />
    </Container>
  );
};

export default Skills;
