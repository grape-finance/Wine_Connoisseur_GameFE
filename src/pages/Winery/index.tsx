import {
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useVintnerContract, useWineryContract } from "hooks/useContract";
import { useWeb3 } from "state/web3";
import _ from "lodash";
import Loading from "components/Loading";
import NFTItem from "components/NFTItem";
import { NFT_URI, WINERY_ADDRESS } from "config/address";
import StyledButton from "components/StyledButton";

const Winery = () => {
  const [isloading, setLoading] = useState(false);
  const { account, chainId } = useWeb3();
  const [tabValue, setTab] = useState(0); // True - show stakedAmount NFT , False - show unstakedAmount NFT
  const [checked, setChecked] = useState(false);

  const vintnerContract = useVintnerContract();
  const wineryContract = useWineryContract();

  const [userStakedList, setUserStakedList] = useState([]);
  const [userRestingList, setUserRestingList] = useState([]);
  const [userUnstakedList, setUserUnstakedList] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState<Number[]>([]);

  const [vintnerApproved, setVintnerApproved] = useState(0);

  // Get staked & resting NFT
  useEffect(() => {
    if (account && wineryContract) {
      const getNFTState = async () => {
        let res;
        res = await wineryContract.batchedStakesOfOwner(account, 0, 10000);
        const stakeNFTs = res.filter((item: any) => !item.isResting);
        const restingNFTs = res.filter((item: any) => item.isResting);

        setUserStakedList(stakeNFTs);
        setUserRestingList(restingNFTs);
        // res = await vintnerContract.balanceOf(account);
        // setUserUnstakedAmount(Number(res));
      };
      getNFTState();
    }
  }, [account, wineryContract]);

  // Get unstaked NFT
  const userNFTs = gql`
  query {
    users(where: { id: "${account?.toLowerCase()}" }) {
      vintnerTokens {
        id
        # contentURI
      }
      # upgradeTokens {
      #   contentURI
      # }
      }
    }
  `;
  const { loading, data: unstakedNFTs } = useQuery(userNFTs);
  useEffect(() => {
    if (!_.isEmpty(unstakedNFTs)) {
      setUserUnstakedList(unstakedNFTs.users[0]?.vintnerTokens);
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
    } else if (tabValue === 1 && !_.isEmpty(userRestingList)) {
      // Select all staked NFTs
      setSelectedNFTs(userRestingList);
    } else if (tabValue === 2 && !_.isEmpty(userUnstakedList)) {
      // Select all staked NFTs
      setSelectedNFTs(userUnstakedList);
    }
  }, [checked, tabValue, userStakedList, userRestingList, userUnstakedList]);

  // Select NFT
  const handleClick = (id: any) => {
    let items = [...selectedNFTs];
    if (items.includes(id)) {
      items = items.filter((x) => x !== id);
    } else {
      items.push(id);
    }
    setSelectedNFTs(items);
  };

  useEffect(() => {
    if (chainId && vintnerContract) {
      const checkApproved = async () => {
        const approved = await vintnerContract.isApprovedForAll(
          account,
          WINERY_ADDRESS[chainId]
        );
        setVintnerApproved(approved);
      };
      checkApproved();
    }
  }, [account, chainId, vintnerContract]);

  const approveVintner = async () => {
    if (chainId && vintnerContract) {
      let tx = await vintnerContract.setApprovalForAll(
        WINERY_ADDRESS[chainId],
        true
      );
      setLoading(true);
      let receipt = await tx.wait();
      if (receipt.status) {
        setLoading(false);
        window.location.reload();
      }
      setLoading(false);
    }
  };

  const stakeNFT = async () => {
    if (
      account &&
      chainId &&
      vintnerContract &&
      wineryContract &&
      tabValue === 2
    ) {
      try {
        if (selectedNFTs.length === 0) {
          alert('Select at least 1 Vintner to Stake')
          return;
        }

        const selectedIDs: number[] = [];
        selectedNFTs.forEach((item: any) => selectedIDs.push(Number(item?.id)));

        const tx = await wineryContract.stakeMany(selectedIDs, []);
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  const UnstakeNFT = async () => {
    if (wineryContract && tabValue === 0) {

      if (selectedNFTs.length === 0) {
        alert('Select at least 1 Vintner to Unstake')
        return;
      }

      const selectedIDs: number[] = [];

      selectedNFTs.forEach((item: any) =>
        selectedIDs.push(Number(item?.vintnerId))
      );

      try {
        const tx = await wineryContract.unstakeVintnersAndUpgrades(
          selectedIDs,
          []
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
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  const RestakeNFT = async () => {
    if (wineryContract && tabValue === 1) {

      if (selectedNFTs.length === 0) {
        alert('Select at least 1 Vintner to Restake')
        return;
      }
      
      const selectedIDs: number[] = [];
      selectedNFTs.forEach((item: any) =>
        selectedIDs.push(Number(item?.vintnerId))
      );
      try {
        const tx = await wineryContract.reStakeRestedVintners(selectedIDs);
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  const withdrawNFT = async () => {
    if (wineryContract && tabValue === 1) {
      if (selectedNFTs.length === 0) {
        alert('Select at least 1 Vintner to Withdraw')
        return;
      }
      const selectedIDs: number[] = [];

      selectedNFTs.forEach((item: any) =>
        selectedIDs.push(Number(item?.vintnerId))
      );
      try {
        setLoading(true);
        const tx = await wineryContract.withdrawVintners(selectedIDs);

        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err: any) {
        const msg = err?.data?.message!;
        if (msg) {
          alert(msg.replace("execution reverted: ", ""));
        }
        setLoading(false);
      }
    }
  };

  // Render NFT list
  const showNFTs = () => {
    if (tabValue === 0) {
      if (_.isEmpty(userStakedList))
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
              No Vintners Staked
            </Typography>
            ;
          </Box>
        );
      // Show staked NFTs
      console.log("userStakedList", userStakedList);
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
              <NFTItem
                image={`${NFT_URI}/${+item?.vintnerId!}.png`}
                selected={selectedNFTs.includes(item)}
              />
            </Box>
          ))}
        </Box>
      );
    } else if (tabValue === 1) {
      if (_.isEmpty(userRestingList))
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
              No Vintners Resting
            </Typography>
            ;
          </Box>
        );
      // Show Resting NFTs
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userRestingList?.map((item: any, index) => (
            <Box
              onClick={() => handleClick(item)}
              style={{ padding: "10px" }}
              key={index}
            >
              <NFTItem
                isResting
                endTime={Number(item?.endTimestamp)}
                image={`${NFT_URI}/${item?.vintnerId}.png`}
                selected={selectedNFTs.includes(item)}
              />
            </Box>
          ))}
        </Box>
      );
    } else if (tabValue === 2) {
      if (_.isEmpty(userUnstakedList))
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
              No Vintners Unstaked
            </Typography>
            ;
          </Box>
        );
      // Show unstaked NFTs
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
                image={`${NFT_URI}/${item?.id}.png`}
                selected={selectedNFTs.includes(item)}
              />
            </Box>
          ))}
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
            sx={{ mt: 2, borderBottom: "1px solid #fed7aa", flexWrap: "wrap" }}
          >
            <Box
              onClick={() => setTab(0)}
              sx={{
                cursor: "pointer",
                pb: 1,
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
                  RESTING
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => setTab(2)}
              sx={{
                cursor: "pointer",
                pb: 1,
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
                  UNSTAKED
                </Typography>
              </Box>
            </Box>
          </Stack>
          {/* Control NFTs */}
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
            {tabValue === 2 ? (
              // Unstaked
              <>
                {!vintnerApproved ? (
                  <StyledButton onClick={() => approveVintner()}>
                    Approve
                  </StyledButton>
                ) : (
                  <StyledButton onClick={() => stakeNFT()}>Stake</StyledButton>
                )}
              </>
            ) : tabValue === 1 ? (
              <Stack
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                }}
                spacing={3}
              >
                <StyledButton onClick={() => RestakeNFT()}>
                  Restake
                </StyledButton>
                <StyledButton onClick={() => withdrawNFT()}>
                  Withdraw
                </StyledButton>
              </Stack>
            ) : (
              <StyledButton onClick={() => UnstakeNFT()}>Unstake</StyledButton>
            )}
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={checkAll} />}
              label={<Typography color="primary.light">Select All</Typography>}
            />
          </Stack>
          {/* Show NFTs */}
          {showNFTs()}
        </Box>
      </Container>
      <Loading isLoading={loading || isloading} />
    </>
  );
};
export default Winery;
