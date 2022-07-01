import { getDefaultProvider } from "ethers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBlockNumber } from "state/application/hooks";
import { AppDispatch, AppState } from "store";
import { checkedTransaction, finalizeTransaction } from "./actions";
import { useWeb3 } from "state/web3";
// import { getDefaultProvider } from "utils/provider";

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: {}; lastCheckedBlockNumber?: number }
): boolean {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}

export default function Updater(): null {
  const { chainId } = useWeb3();
  const { ethereum } = window;

  const lastBlockNumber = useBlockNumber();

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState["transactions"]>(
    (state) => state.transactions
  );

  // show popup on confirm
  // const addPopup = useAddPopup();

  useEffect(() => {
    if (!chainId || !ethereum || !lastBlockNumber) {
      return;
    }
    const transactions = chainId ? state[chainId] ?? {} : {};

    const provider = getDefaultProvider();
    Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach((hash) => {
        provider
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              );
            } else {
              dispatch(
                checkedTransaction({
                  chainId,
                  hash,
                  blockNumber: lastBlockNumber,
                })
              );
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [state, chainId, ethereum, lastBlockNumber, dispatch]);

  return null;
}
