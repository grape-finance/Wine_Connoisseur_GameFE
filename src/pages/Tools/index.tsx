import {
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  useUpgradeContract,
  useVintnerContract,
  useWineryContract,
} from "hooks/useContract";
import { useWeb3 } from "state/web3";
import _ from "lodash";
import Loading from "components/Loading";
import NFTItem from "components/NFTItem";
import { TOOL_URI } from "config/address";

// interface IStakedVintnerInfo {
//   vintnerId: number;
//   vintnerPPM: number;
//   isResting: boolean;
//   endTimestamp: number;
// }

const Tools = () => {
  const [isloading, setLoading] = useState(false);
  const { account } = useWeb3();
  const [tabValue, setTab] = useState(0); // True - show stakedAmount NFT , False - show unstakedAmount NFT
  const [checked, setChecked] = useState(false);

  const vintnerContract = useVintnerContract();
  const updateContract = useUpgradeContract();
  const wineryContract = useWineryContract();

  const [userStakedList, setUserStakedList] = useState([]);
  const [userUnstakedList, setUserUnstakedList] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState<Number[]>([]);

  const stakeNFT = async () => {
    if (wineryContract) {
      try {
        const tx = await wineryContract.stakeMany([], selectedNFTs);
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
  };

  const unStakeNFT = async () => {
    alert("Unstake");
    if (wineryContract) {
      try {
        const tx = await wineryContract.unstakeVintnersAndUpgrades(
          [],
          selectedNFTs
        );
        setLoading(true);
        const receipt = await tx.wait();
        if (receipt.status) {
          setLoading(false);
          window.location.reload();
        }
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
  };

  // Get staked NFT
  useEffect(() => {
    if (account && vintnerContract && updateContract && wineryContract) {
      const getNFTState = async () => {
        let res;
        res = await wineryContract.batchedToolsOfOwner(account, 0, 10000);
        console.log("res", res);
        setUserStakedList(res);
        // res = await vintnerContract.balanceOf(account);
        // setUserUnstakedAmount(Number(res));
      };
      getNFTState();
    }
  }, [account, updateContract, wineryContract, vintnerContract]);

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
        # contentURI
      }
      }
    }
  `;
  const { loading, error, data: unstakedNFTs } = useQuery(userNFTs);
  useEffect(() => {
    if (!_.isEmpty(unstakedNFTs)) {
      console.log("unstakedNFTs", unstakedNFTs);
      setUserUnstakedList(unstakedNFTs.users[0]?.upgradeTokens);
    }
  }, [unstakedNFTs]);

  console.log("selectedNFTs", selectedNFTs);

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
    console.log("id", id);
    let items = [...selectedNFTs];
    if (items.includes(id)) {
      items = items.filter((x) => x !== id);
    } else {
      items.push(id);
    }
    setSelectedNFTs(items);
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
          {userStakedList?.map((item, index) => (
            <Box
              onClick={() => handleClick(item)}
              style={{ padding: "10px" }}
              key={index}
            >
              <NFTItem
                image={`${TOOL_URI}/${item}.png`}
                selected={selectedNFTs.includes(item)}
              />
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
                image={`${TOOL_URI}/${item?.id}.png`}
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
            sx={{ mt: 2, borderBottom: "1px solid #fed7aa", flexWrap: "wrap" }}
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
          </Stack>
          {/* Control NFTs */}
          <Box
            style={{
              display: "flex",
              flex: "row",
              marginTop: "20px",
              marginBottom: "20px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {tabValue ? (
              <Button
                onClick={stakeNFT}
                color="primary"
                variant="contained"
                // className={classes.buttonTab}
              >
                &nbsp; Stake &nbsp;
              </Button>
            ) : (
              <Button
                onClick={unStakeNFT}
                color="secondary"
                variant="contained"
                // className={classes.buttonTab}
              >
                Unstake
              </Button>
            )}
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={checkAll} />}
              label={<Typography color="primary.light">Select All</Typography>}
            />
          </Box>
          {/* Show NFTs */}
          {showNFTs()}
        </Box>
      </Container>
      <Loading isLoading={loading || isloading} />
    </>
  );
};
export default Tools;
