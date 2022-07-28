import { setUserTokenBalance, setUserNFTState } from "./actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGrapeContract,
  useUpgradeContract,
  useUSDCVintageWineLPContract,
  useVintageWineContract,
  useVintnerContract,
  useWineryContract,
} from "hooks/useContract";
import { useWeb3 } from "state/web3";
import { SupportedChainId, WINERY_ADDRESS } from "config/address";
import { NETWORKS } from "config/network";
import _ from "lodash";
import multicall from "utils/multicall";
import WINERY_ABI from "abi/winery.json";
import { BigNumber, ethers } from "ethers";

export default function Updater(): null {
  const dispatch = useDispatch();

  const { account, chainId } = useWeb3();
  const grapeTokenContract = useGrapeContract();
  const vintageWineTokenContract = useVintageWineContract();
  const USDCVintageWineLPContract = useUSDCVintageWineLPContract();
  const vintnerContract = useVintnerContract();
  const upgradeContract = useUpgradeContract();
  const wineryContract = useWineryContract();

  useEffect(() => {
    if (
      account &&
      grapeTokenContract &&
      vintageWineTokenContract &&
      USDCVintageWineLPContract &&
      vintnerContract &&
      upgradeContract &&
      wineryContract &&
      (chainId === SupportedChainId.MAINNET 
        // || chainId === SupportedChainId.TESTNET
        )
    ) {
      try {
        // Get user token balance of Grape and VintageWine and USDC-VintageWine LP
        const getBalance = async () => {
          // get User Info
          const grapeTokenBalance = await grapeTokenContract.balanceOf(account);
          const vintageWineTokenBalance =
            await vintageWineTokenContract.balanceOf(account);
          const USDCVintageWineLPBalance =
            await USDCVintageWineLPContract.balanceOf(account);

          const vintnerBalance = await vintnerContract.balanceOf(account);
          const upgradeBalance = await upgradeContract.balanceOf(account);
          const vintnerStakedBalance =
            await wineryContract.ownedVintnerStakesBalance(account);
          const upgradeStakedBalance =
            await wineryContract.ownedUpgradeStakesBalance(account);

          if (grapeTokenBalance !== "" && vintageWineTokenBalance !== "")
            dispatch(
              setUserTokenBalance({
                grapeTokenBalance: +ethers.utils.formatEther(grapeTokenBalance),
                vintageWineTokenBalance: +ethers.utils.formatEther(
                  vintageWineTokenBalance
                ),
                USDCVintageWineLPBalance: +ethers.utils.formatEther(
                  USDCVintageWineLPBalance
                ),

                vintnerBalance: +vintnerBalance,
                upgradeBalance: +upgradeBalance,
                vintnerStakedBalance: +vintnerStakedBalance,
                upgradeStakedBalance: +upgradeStakedBalance,
              })
            );
        };
        getBalance();
        // Get user NFT Info
        const getUserNFTInfo = async () => {
          const userStakedWineryNFTList =
            await wineryContract.batchedStakesOfOwner(account, 0, 10000);

          if (!_.isEmpty(userStakedWineryNFTList)) {
            const web3Provider: string = NETWORKS.filter(
              (item) => item.chainId === chainId
            )[0]?.defaultProvider[0];

            const [
              _fatigueAccrued,
              _timeUntilFatigues,
              _vintageWineAccrued,
              _startTime,
            ] = await multicall(
              WINERY_ABI,
              [
                {
                  address: WINERY_ADDRESS[chainId],
                  name: "getFatigueAccrued",
                  params: [account],
                },

                {
                  address: WINERY_ADDRESS[chainId],
                  name: "getTimeUntilFatigued",
                  params: [account],
                },
                {
                  address: WINERY_ADDRESS[chainId],
                  name: "getVintageWineAccrued",
                  params: [account],
                },
                {
                  address: WINERY_ADDRESS[chainId],
                  name: "startTimeStamp",
                  params: [account],
                },
              ],
              web3Provider,
              chainId
            );

            dispatch(
              setUserNFTState({
                fatigueAccrued: +_fatigueAccrued[0] / Math.pow(10, 12),
                timeUntilFatigues: Number(
                  _timeUntilFatigues[0].sub(_startTime[0])
                ),
                vintageWineAccrued: +ethers.utils.formatEther(
                  _vintageWineAccrued[0]
                ),
              })
            );
          }
        };
        getUserNFTInfo();
      } catch (err) {
        console.log("err", err);
      }
    }
  }, [
    account,
    chainId,
    dispatch,
    grapeTokenContract,
    vintageWineTokenContract,
    USDCVintageWineLPContract,
    vintnerContract,
    upgradeContract,
    wineryContract,
  ]);

  return null;
}
