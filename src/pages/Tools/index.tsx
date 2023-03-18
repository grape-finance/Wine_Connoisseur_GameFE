import {
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  useGrapeContract,
  useRaisinTokenContract,
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
import toolImg1 from "assets/image/tools/1.jpg";
import toolImg2 from "assets/image/tools/2.jpg";
import toolImg3 from "assets/image/tools/3.jpg";
import toolImg4 from "assets/image/tools/4.jpg";
import ERC20 from "abi/types/ERC20";
import useApprove, { ApprovalState } from "hooks/useApprove";
import { ILevel } from "interface/ILevel";
import { BigNumber, ethers } from "ethers";
import NumberInput from "components/NuberInput";

const Tools = () => {
  const [isloading, setLoading] = useState(false);
  const { account, provider, chainId } = useWeb3();
  const [tabValue, setTab] = useState(0); // True - show stakedAmount NFT , False - show unstakedAmount NFT
  const [checked, setChecked] = useState(false);
  // Get Contract
  const vintnerContract = useVintnerContract();
  const upgradeContract = useUpgradeContract();
  const wineryContract = useWineryContract();
  const raisinTokenContract = useRaisinTokenContract();
  const raisinToken = useMemo(() => {
    if (provider && raisinTokenContract) {
      const signer = provider.getSigner();
      return new ERC20(raisinTokenContract.address, signer, "Raisin");
    }
  }, [provider, raisinTokenContract]);
  const [approveStatus, approve] = useApprove(
    raisinToken!,
    UPGRADE_ADDRESS[chainId!]
  );
  // Approve upgrade contract
  const [upgradeApproved, setUpgradeApproved] = useState(0);
  // Stake and Unstake NFT
  const [userStakedList, setUserStakedList] = useState([]);
  const [userUnstakedList, setUserUnstakedList] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState<Number[]>([]);
  // Mint NFT
  const [selectedNFTForMint, setSelectedNFTForMint] = useState(0);
  const [mintAmountInput, setMintAmountInput] = useState("1");

  const [snack, setSnack] = useState({ open: false, message: "" });
  const vertical = "top";
  const horizontal = "right";

  const handleClose = () => {
    setSnack({ open: false, message: "" });
  };

  const _toolNFTLists: ILevel[] = [
    {
      name: "Magazine",
      description: "It may be old but winemaking doesnt change much - Tier 1",
      supply: BigNumber.from(0),
      maxSupply: BigNumber.from(500),
      priceVintageWine: ethers.utils.parseUnits("1200"),
      priceGrape: ethers.utils.parseUnits("12"),
      yield: BigNumber.from(2),
      image: toolImg1,
    },
    {
      name: "Pruning Shears",
      description: "Prune those vines for maximum yield - Tier 2",
      supply: BigNumber.from(0),
      maxSupply: BigNumber.from(500),
      priceVintageWine: ethers.utils.parseUnits("1800"),
      priceGrape: ethers.utils.parseUnits("20"),
      yield: BigNumber.from(3),
      image: toolImg2,
    },
    {
      name: "Hydrometer",
      description: "Ensure optimum density for the finest vintage - Tier 3",
      supply: BigNumber.from(0),
      maxSupply: BigNumber.from(250),
      priceVintageWine: ethers.utils.parseUnits("4200"),
      priceGrape: ethers.utils.parseUnits("40"),
      yield: BigNumber.from(5),
      image: toolImg3,
    },
    {
      name: "Floor Corker",
      description: "Cork your Vintage at lightspeed with the sturdy antique floor corker - Tier 4",
      supply: BigNumber.from(0),
      maxSupply: BigNumber.from(75),
      priceVintageWine: ethers.utils.parseUnits("5500"),
      priceGrape: ethers.utils.parseUnits("50"),
      yield: BigNumber.from(6),
      image: toolImg4,
    },
  ];

  const [toolNFTLists, setToolNFTLists] = useState<ILevel[]>(_toolNFTLists);

  useEffect(() => {
    if (upgradeContract) {
      const getLevelInfo = async () => {
        // const currentLevelindex = await upgradeContract.currentLevelIndex();
        let _toolNFTLists: ILevel[] = toolNFTLists;
        for (let i = 0; i <= 3; i++) {
          const level: ILevel = await upgradeContract.levels(i);

          _toolNFTLists[i].supply = level.supply;
          _toolNFTLists[i].maxSupply = level.maxSupply;
          _toolNFTLists[i].priceVintageWine = level.priceVintageWine;
          _toolNFTLists[i].priceGrape = level.priceGrape;
          _toolNFTLists[i].yield = level.yield;
        }
        setToolNFTLists(_toolNFTLists);
      };
      getLevelInfo();
    }
  }, [upgradeContract]);

  // Check is approved
  useEffect(() => {
    if (chainId && upgradeContract) {
      const checkApproved = async () => {
        const approved = await upgradeContract.isApprovedForAll(
          account,
          WINERY_ADDRESS[chainId]
        );
        setUpgradeApproved(approved);
      };
      checkApproved();
    }
  }, [account, chainId, upgradeContract]);

  const approveUpgrade = async () => {
    if (chainId && upgradeContract) {
      let tx = await upgradeContract.setApprovalForAll(
        WINERY_ADDRESS[chainId],
        true
      );
      setLoading(true);
      await tx.wait();
      setLoading(false);
    }
  };

  const stakeNFT = async () => {
    if (wineryContract) {
      try {
        if (selectedNFTs.length === 0) {
          setSnack({
            open: true,
            message: "Select at least 1 Tool to Stake",
          });
          return;
        }
        const selectedIDs: number[] = [];
        selectedNFTs.forEach((item: any) => selectedIDs.push(Number(item?.id)));
        const tx = await wineryContract.stakeMany([], selectedIDs);
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          console.log('3')

          localStorage.setItem("refreshFirecloudStats", "true");
          window.location.reload();
        }
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

  const unStakeNFT = async () => {
    if (wineryContract) {
      try {
        if (selectedNFTs.length === 0) {
          setSnack({
            open: true,
            message: "Select at least 1 Tool to Unstake",
          });
          return;
        }
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
          console.log('4')

          localStorage.setItem("refreshFirecloudStats", "true");
          window.location.reload();
        }
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

  const mintNFT = async () => {
    if (account && chainId && raisinTokenContract && upgradeContract) {
      if (+mintAmountInput <= 0) {
        setSnack({
          open: true,
          message: "You need to mint at least 1",
        });
      } else {
        try {
          const tx = await upgradeContract.mintUpgrade(
            selectedNFTForMint,
            +mintAmountInput
          );

          setLoading(true);
          const receipt = await tx.wait();
          if (receipt.status) {
            setLoading(false);
            window.location.reload();
          }
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
  const { loading, data: unstakedNFTs } = useQuery(userNFTs);
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
    if (tabValue === 0) {
      if (_.isEmpty(userStakedList)) {
        return (
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
                textAlign: "center",
              }}
              color="primary.light"
              variant="h4"
              component="h4"
            >
              No Tools Staked
            </Typography>
            ;
          </Box>
        );
      }
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
          {userStakedList.map((item: any, index) => {
            let tokenURI = (Number(item.toolPPM) + 1) / 2 - 1;
            if(tokenURI === 0.5){
              tokenURI = 0;
            }else if (tokenURI === 2.5){
              tokenURI = 3;
            }
            return (
              <Tooltip
                title={
                  <>
                    <Typography variant="h6">
                      {toolNFTLists[tokenURI].name}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      {toolNFTLists[tokenURI].description}
                    </Typography>
                    <br />

                    <Typography variant="body1">
                      Total Supply: {Number(toolNFTLists[tokenURI].maxSupply)}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Minted Count: {Number(toolNFTLists[tokenURI].supply)}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Cost: <br />{" "}
                      {ethers.utils.formatEther(
                        toolNFTLists[tokenURI].priceGrape
                      )}{" "}
                      Raisin <br />
                      {ethers.utils.formatEther(
                        toolNFTLists[tokenURI].priceVintageWine
                      )}{" "}
                      Vintage
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Vintage multi: {Number(toolNFTLists[tokenURI].yield)}
                    </Typography>
                  </>
                }
                key={index}
              >
                <Box
                  onClick={() => handleClick(item)}
                  style={{ padding: "10px" }}
                  key={index}
                >
                  <>
                    <NFTItem
                      image={`${TOOL_URI}/${tokenURI + 1}.jpg`}
                      selected={selectedNFTs.includes(item)}
                    />
                  </>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      );
    } else if (tabValue === 1) {
      if (_.isEmpty(userUnstakedList)) {
        return (
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "fontWeightBold",
                textAlign: "center",
              }}
              color="primary.light"
              variant="h4"
              component="h4"
            >
              No Tools Unstaked
            </Typography>
            ;
          </Box>
        );
      }
      // Show unstaked Value
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userUnstakedList.map((item: any, index: number) => {
            let tokenURI = Number(item.contentURI.slice(51, 52)) - 1;
            if(tokenURI === 0.5){
              tokenURI = 0;
            }else if(tokenURI === 2.5){
              tokenURI = 3;
            }
            return (
              <Tooltip
                title={
                  <>
                    <Typography variant="h6">
                      {toolNFTLists[tokenURI].name}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      {toolNFTLists[tokenURI].description}
                    </Typography>
                    <br />

                    <Typography variant="body1">
                      Total Supply: {Number(toolNFTLists[tokenURI].maxSupply)}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Minted Count: {Number(toolNFTLists[tokenURI].supply)}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Cost: <br />{" "}
                      {ethers.utils.formatEther(
                        toolNFTLists[tokenURI].priceGrape
                      )}{" "}
                      Raisin <br />
                      {ethers.utils.formatEther(
                        toolNFTLists[tokenURI].priceVintageWine
                      )}{" "}
                      Vintage
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Vintage multi: {Number(toolNFTLists[tokenURI].yield)}
                    </Typography>
                  </>
                }
                key={index}
              >
                <Box
                  onClick={() => handleClick(item)}
                  style={{ padding: "10px" }}
                  key={index}
                >
                  <NFTItem
                    image={`${TOOL_URI}/${tokenURI + 1}.jpg`}
                    selected={selectedNFTs.includes(item)}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      );
    } else if (tabValue === 2) {
      // Show tools for mint
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {Object.keys(toolNFTLists).map((i: any, index: number) => {
            const item = toolNFTLists[i];

            return (
              <Tooltip
                title={
                  <>
                    <Typography variant="h6">{item.name}</Typography>
                    <br />
                    <Typography variant="body1">{item.description}</Typography>
                    <br />

                    <Typography variant="body1">
                      Total Supply: {Number(item.maxSupply)}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Minted Count: {Number(item.supply)}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Cost: <br /> {ethers.utils.formatEther(item.priceGrape)}{" "}
                      Raisin <br />
                      {ethers.utils.formatEther(item.priceVintageWine)} Vintage
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      Vintage Multi: {Number(item.yield)}
                    </Typography>
                  </>
                }
                key={index}
              >
                <Box
                  onClick={() => handleClick(index)}
                  style={{ padding: "10px" }}
                  key={index}
                >
                  <NFTItem
                    image={item.image}
                    selected={selectedNFTForMint === index}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      );
    }
    return;
  };

  return (
    <>
      <Container
        sx={{ my: 3, p: "0 !important", maxWidth: "unset !important" }}
      >
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
                  borderRadius: "1px",
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
                  borderRadius: "1px",
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
                  borderRadius: "1px",
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
                  MINT TOOLS
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
                <NumberInput
                  value={mintAmountInput}
                  setValue={setMintAmountInput}
                />
                {approveStatus !== ApprovalState.APPROVED ? (
                  <StyledButton onClick={approve}>Approve</StyledButton>
                ) : (
                  <StyledButton onClick={() => mintNFT()}>
                    MINT {mintAmountInput}
                  </StyledButton>
                )}
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
