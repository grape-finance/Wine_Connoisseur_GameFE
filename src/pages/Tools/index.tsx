import {
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  useGrapeContract,
  useUpgradeContract,
  useVintnerContract,
  useWineryContract,
} from "hooks/useContract";
import { useWeb3 } from "state/web3";
import _ from "lodash";
import Loading from "components/Loading";
import NFTItem from "components/NFTItem";
import { TOOL_URI, UPGRADE_ADDRESS, WINERY_ADDRESS } from "config/address";
import StyledButton from "components/StyledButton";
import toolImg1 from "assets/image/tools/1.png";
import toolImg2 from "assets/image/tools/2.png";
import toolImg3 from "assets/image/tools/3.png";
import toolImg4 from "assets/image/tools/4.png";
import toolImg5 from "assets/image/tools/5.png";
import toolImg6 from "assets/image/tools/6.png";
import { ethers } from "ethers";

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

const Tools = () => {
  const [isloading, setLoading] = useState(false);
  const { account, chainId } = useWeb3();
  const [tabValue, setTab] = useState(0); // True - show stakedAmount NFT , False - show unstakedAmount NFT
  const [checked, setChecked] = useState(false);
  // Get Contract
  const vintnerContract = useVintnerContract();
  const upgradeContract = useUpgradeContract();
  const wineryContract = useWineryContract();
  const grapeContract = useGrapeContract();
  // Approve upgrade contract
  const [upgradeApproved, setUpgradeApproved] = useState(0);
  // Stake and Unstake NFT
  const [userStakedList, setUserStakedList] = useState([]);
  const [userUnstakedList, setUserUnstakedList] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState<Number[]>([]);
  // Mint NFT
  const [selectedNFTForMint, setSelectedNFTForMint] = useState(0);
  const [mintAmountInput, setMintAmountInput] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMintAmountInput(Number(event.target.value));
  };

  const toolImageList = [
    toolImg1,
    toolImg2,
    toolImg3,
    toolImg4,
    toolImg5,
    toolImg6,
  ];

  useEffect(() => {
    if (chainId && vintnerContract) {
      const checkApproved = async () => {
        const approved = await vintnerContract.isApprovedForAll(
          account,
          WINERY_ADDRESS[chainId]
        );
        setUpgradeApproved(approved);
      };
      checkApproved();
    }
  }, [account, chainId, vintnerContract]);

  const approveUpgrade = async () => {
    if (chainId && upgradeContract) {
      let tx = await upgradeContract.setApprovalForAll(
        WINERY_ADDRESS[chainId],
        true
      );
      setLoading(true);
      let receipt = await tx.wait();
      setLoading(false);
    }
  };

  const stakeNFT = async () => {
    if (wineryContract) {
      try {
        const selectedIDs: number[] = [];
        selectedNFTs.forEach((item: any) => selectedIDs.push(Number(item?.id)));
        const tx = await wineryContract.stakeMany([], selectedIDs);
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err: any) {
        console.log("err", err);
        alert(err?.data?.message!);
        setLoading(false);
      }
    }
  };

  const unStakeNFT = async () => {
    if (wineryContract) {
      try {
        const selectedIDs: number[] = [];
        selectedNFTs.forEach((item: any) =>
          selectedIDs.push(Number(item?.toolId))
        );
        const tx = await wineryContract.unstakeVintnersAndUpgrades(
          [],
          selectedIDs
        );
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err: any) {
        console.log("err", err);
        alert(err?.data?.message!);
        setLoading(false);
      }
    }
  };

  const mintNFT = async () => {
    if (account && chainId && grapeContract && upgradeContract) {
      if (mintAmountInput <= 0) alert("You need to mint at least one");
      else {
        try {
          // Calculate the grape token amount to buy NFT
          const level: any = await upgradeContract.levels(selectedNFTForMint);
          const grapeCost =
            (level?.priceGrape / Math.pow(10, 18)) * mintAmountInput;
          let tx = await grapeContract.approve(
            UPGRADE_ADDRESS[chainId],
            ethers.utils.parseEther(grapeCost.toString())
          );
          setLoading(true);
          await tx.wait();
          tx = await upgradeContract.mintUpgrade(
            selectedNFTForMint,
            mintAmountInput
          );
          setLoading(true);
          const receipt = await tx.wait();
          if (receipt.status) {
            setLoading(false);
            window.location.reload();
          }
        } catch (err: any) {
          console.log("err", err);
          alert(err?.data?.message!);
          setLoading(false);
        }
      }
    }
  };

  // Get staked NFT
  useEffect(() => {
    if (account && vintnerContract && upgradeContract && wineryContract) {
      const getNFTState = async () => {
        let res;
        res = await wineryContract.batchedToolsOfOwner(account, 0, 10000);
        setUserStakedList(res);
        // res = await vintnerContract.balanceOf(account);
        // setUserUnstakedAmount(Number(res));
      };
      getNFTState();
    }
  }, [account, upgradeContract, wineryContract, vintnerContract]);

  // Get unstaked NFT
  const userNFTs = gql`
  query {
    users(where: { id: "${account?.toLowerCase()}" }) {
      # vintnerTokens {
      #   id
      #   contentURI
      # }
      upgradeTokens {
        id
        contentURI
      }
      }
    }
  `;
  const { loading, error, data: unstakedNFTs } = useQuery(userNFTs);
  useEffect(() => {
    if (!_.isEmpty(unstakedNFTs)) {
      setUserUnstakedList(unstakedNFTs.users[0]?.upgradeTokens);
    }
  }, [unstakedNFTs]);

  const checkAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // Check all
  useEffect(() => {
    if (!checked) setSelectedNFTs([]);
    else if (tabValue === 0 && !_.isEmpty(userStakedList)) {
      // Select all staked NFTs
      setSelectedNFTs(userStakedList);
    } else if (tabValue === 1 && !_.isEmpty(userUnstakedList)) {
      // Select all staked NFTs
      setSelectedNFTs(userUnstakedList);
    }
  }, [checked, tabValue, userStakedList, userUnstakedList]);

  // Select NFT
  const handleClick = (id: any) => {
    if (tabValue === 0 || tabValue === 1) {
      // Select NFT in Stake and Unstake Tab
      let items = [...selectedNFTs];
      if (items.includes(id)) {
        items = items.filter((x) => x !== id);
      } else {
        items.push(id);
      }
      setSelectedNFTs(items);
    } else {
      // Choose NFT in Mint tab
      setSelectedNFTForMint(id as number);
    }
  };

  // Render NFT list
  const showNFTs = () => {
    if (tabValue === 0 && !_.isEmpty(userStakedList)) {
      // Show staked Value
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userStakedList?.map((item: any, index) => (
            <Box
              onClick={() => handleClick(item)}
              style={{ padding: "10px" }}
              key={index}
            >
              <>
                <NFTItem
                  image={`${TOOL_URI}/${(Number(item.toolPPM) + 1) / 2}.png`}
                  selected={selectedNFTs.includes(item)}
                />
              </>
            </Box>
          ))}
        </Box>
      );
    } else if (tabValue === 1 && !_.isEmpty(userUnstakedList)) {
      // Show staked Value
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userUnstakedList.map((item: any, index: number) => (
            <Box
              onClick={() => handleClick(item)}
              style={{ padding: "10px" }}
              key={index}
            >
              <NFTItem
                image={`${TOOL_URI}/${item?.contentURI?.slice(30, 31)}.png`}
                selected={selectedNFTs.includes(item)}
              />
            </Box>
          ))}
        </Box>
      );
    } else if (tabValue === 2 && !_.isEmpty(userUnstakedList)) {
      // Show staked Value
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {toolImageList.map((item: string, index: number) => (
            <Box
              onClick={() => handleClick(index)}
              style={{ padding: "10px" }}
              key={index}
            >
              <NFTItem image={item} selected={selectedNFTForMint === index} />
            </Box>
          ))}
        </Box>
      );
    }
    return;
  };

  return (
    <>
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
          <Stack
            direction={"row"}
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 0, md: 5, lg: 10 }}
            sx={{
              mt: 2,
              borderBottom: "1px solid #fed7aa",
              flexWrap: "wrap",
            }}
          >
            <Box
              onClick={() => setTab(0)}
              sx={{
                cursor: "pointer",
                pb: 1,
                // "&:hover": {
                //   borderBottom: "1px solid",
                //   borderColor: "secondary.main",
                // },
              }}
            >
              <Box
                sx={{
                  borderRadius: ".8rem",
                  p: 1.5,
                  ...(tabValue === 0 && {
                    backgroundColor: "rgb(254 215 170)",
                  }),

                  "&:hover": {
                    backgroundColor: "rgb(253 186 116)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "fontWeightBold",
                    textAlign: "center",
                  }}
                  color={tabValue === 0 ? "rgb(28 25 23)" : "primary.light"}
                  variant="h5"
                  component="h5"
                >
                  STAKED
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => setTab(1)}
              sx={{
                cursor: "pointer",
                pb: 1,
                // "&:hover": {
                //   borderBottom: "1px solid",
                //   borderColor: "secondary.main",
                // },
              }}
            >
              <Box
                sx={{
                  borderRadius: ".8rem",
                  p: 1.5,
                  ...(tabValue === 1 && {
                    backgroundColor: "rgb(254 215 170)",
                  }),
                  "&:hover": {
                    backgroundColor: "rgb(253 186 116)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "fontWeightBold",
                    textAlign: "center",
                  }}
                  color={tabValue === 1 ? "rgb(28 25 23)" : "primary.light"}
                  variant="h5"
                  component="h5"
                >
                  UNSTAKED
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => setTab(2)}
              sx={{
                cursor: "pointer",
                pb: 1,
                // "&:hover": {
                //   borderBottom: "1px solid",
                //   borderColor: "secondary.main",
                // },
              }}
            >
              <Box
                sx={{
                  borderRadius: ".8rem",
                  p: 1.5,
                  ...(tabValue === 2 && {
                    backgroundColor: "rgb(254 215 170)",
                  }),
                  "&:hover": {
                    backgroundColor: "rgb(253 186 116)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "fontWeightBold",
                    textAlign: "center",
                  }}
                  color={tabValue === 2 ? "rgb(28 25 23)" : "primary.light"}
                  variant="h5"
                  component="h5"
                >
                  MINT NFT
                </Typography>
              </Box>
            </Box>
          </Stack>
          {/* Control NFTs */}
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "column",
              lg: "row",
            }}
            spacing={3}
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {tabValue === 1 ? (
              <>
                {!upgradeApproved ? (
                  <StyledButton onClick={() => approveUpgrade()}>
                    Approve
                  </StyledButton>
                ) : (
                  <StyledButton onClick={() => stakeNFT()}>Stake</StyledButton>
                )}
              </>
            ) : tabValue === 0 ? (
              <StyledButton onClick={() => unStakeNFT()}>Unstake</StyledButton>
            ) : (
              <>
                <StyledTextField
                  sx={{ width: { xs: "100%", md: "30%" } }}
                  InputProps={{ style: { textAlign: "end" } }}
                  value={mintAmountInput}
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                />
                <StyledButton onClick={() => mintNFT()}>MINT</StyledButton>
              </>
            )}
            {tabValue !== 2 && (
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={checkAll} />}
                label={
                  <Typography color="primary.light">Select All</Typography>
                }
              />
            )}
          </Stack>
          {/* Show NFTs */}
          {showNFTs()}
        </Box>
      </Container>
      <Loading isLoading={loading || isloading} />
    </>
  );
};
export default Tools;
