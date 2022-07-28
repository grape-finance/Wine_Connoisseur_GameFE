import "./index.css";
import { Button } from "@mui/material";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import React, { useCallback, useEffect } from "react";
import { useModalOpen, useWalletModalToggle } from "state/application/hooks";
import { ApplicationModal } from "state/application/reducer";
import WalletLink from "walletlink";
import { useWeb3 } from "state/web3";
import Web3Modal from "web3modal";
import { SupportedChainId } from "config/address";

const INFURA_ID = "e67a2556dede4ff2b521a375a1905f8b";

const web3Modal = new Web3Modal({
  disableInjectedProvider: false,
  network: "mainnet",
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      },
    },
    "custom-walletlink": {
      display: {
        logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
        name: "Coinbase",
        description: "Connect to Coinbase Wallet (not Coinbase App)",
      },
      options: {
        appName: "Coinbase", // Your app name
        networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
        chainId: 1,
      },
      package: WalletLink,
      connector: async (_: any, options: any) => {
        const { appName, networkUrl, chainId } = options;
        const walletLink = new WalletLink({ appName });
        const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
        await provider.enable();
        return provider;
      },
    },
  },
  theme: {
    background: "#1E1E1E",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)",
  },
});

export default function ConnectWalletButton() {
  const { chainId, instance, dispatch: web3Dispatch } = useWeb3();

  const toggleWalletModal = useWalletModalToggle();
  const isWalletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const connect = useCallback(async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const chainId = await signer.getChainId();
      if (web3Dispatch) {
        web3Dispatch({
          type: "SET_WEB3",
          instance,
          provider,
          account,
          chainId,
        });
      }
    } catch (err) {
      console.log(err);
    }
    if (isWalletModalOpen) {
      toggleWalletModal();
    }
  }, [web3Dispatch, toggleWalletModal, isWalletModalOpen]);

  const switchRequest = () => {
    if (window.ethereum)
      return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        // params: [{ chainId: SupportedChainId.HEX_MAINNET }],
        params: [{ chainId: SupportedChainId.HEX_MAINNET }],
      });
  };

  const addChainRequest = () => {
    if (window.ethereum)
      // Switch to Mainnet
      // return window.ethereum.request({
      //   method: "wallet_addEthereumChain",
      //   params: [
      //     {
      //       chainId: SupportedChainId.HEX_MAINNET,
      //       chainName: "Avalanche Mainnet",
      //       rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      //       blockExplorerUrls: ["https://snowtrace.io"],
      //       nativeCurrency: {
      //         name: "AVAX",
      //         symbol: "AVAX",
      //         decimals: 18,
      //       },
      //     },
      //   ],
      // });

      // Switch to Mainnet
      return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: SupportedChainId.HEX_MAINNET,
            chainName: "Avalanche Mainnet",
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://snowtrace.io"],
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
              decimals: 18,
            },
          },
        ],
      });
  };

  const swithNetwork = async () => {
    if (window.ethereum) {
      try {
        await switchRequest();
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await addChainRequest();
            await switchRequest();
          } catch (addError) {
            console.log(error);
          }
        }
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (chainId !== SupportedChainId.MAINNET) {
      swithNetwork();
    }
    if (web3Modal.cachedProvider) {
      toggleWalletModal();
    }
  }, []);

  useEffect(() => {
    if (isWalletModalOpen) {
      connect();
    }
  }, [connect, isWalletModalOpen]);

  useEffect(() => {
    if (instance?.on && web3Dispatch) {
      instance.on("chainChanged", (_hexChainId: string) => {
        const newChainId = parseInt(_hexChainId, 16);
        if (newChainId !== SupportedChainId.MAINNET) {
          swithNetwork();
        }
        web3Dispatch({ type: "SET_CHAINID", chainId: newChainId });
      });
      instance.on(
        "disconnect",
        async (error: { code: number; message: string }) => {
          await web3Modal.clearCachedProvider();
          if (
            instance?.disconnect &&
            typeof instance.disconnect === "function"
          ) {
            await instance.disconnect();
          }
          if (web3Dispatch) {
            web3Dispatch({ type: "RESET_WEB3" });
          }
        }
      );
      instance.on("accountsChanged", async (accounts: string[]) => {
        if (accounts.length > 0) {
          web3Dispatch({ type: "SET_ACCOUNT", account: accounts[0] });
        } else {
          await web3Modal.clearCachedProvider();
          if (
            instance?.disconnect &&
            typeof instance.disconnect === "function"
          ) {
            await instance.disconnect();
          }
          if (web3Dispatch) {
            web3Dispatch({ type: "RESET_WEB3" });
          }
        }
      });
    }
  }, [instance, web3Dispatch]);

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    if (instance?.disconnect && typeof instance.disconnect === "function") {
      await instance.disconnect();
    }
    if (web3Dispatch) {
      web3Dispatch({ type: "RESET_WEB3" });
    }
  }, [instance, web3Dispatch]);

  return (
    <Button
      sx={{
        p: 1.3,
        borderRadius: "1px",
        transition: "0.3s",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "fontWeightBold",
        border: "3px solid #000",
        color: "info.light",
        boxShadow: '5px 5px 5px #000',
        "&:hover": {
          border: "3px solid #000",
          background:'rgb(253 186 116)',
          // color: "info.main",
        },
      }}
      color="info"
      variant="contained"
      onClick={instance ? disconnect : toggleWalletModal}
    >
      {instance ? "Disconnect" : "Connect wallet"}
    </Button>
  );
}
