import { useWineryContract, useWineryProgressionContract } from "hooks/useContract";
import React, { createContext, useEffect, useState } from "react";
import { useWeb3 } from "state/web3";
import { FirebaseHelper } from "./FirebaseHelper";

export interface FirebaseContext {
  firebaseHelper?: FirebaseHelper;
}

export const Context = createContext<FirebaseContext>({
  firebaseHelper: undefined,
});

interface IFirebaseProps {
  children?: React.ReactNode;
}

export const FirebaseProvider: React.FC<IFirebaseProps> = ({ children }) => {
  const [firebaseHelper, setFirebaseHelper] = useState<FirebaseHelper>();
  const wineryContract = useWineryContract()
  const wineryProgressionContract = useWineryProgressionContract()
  const {chainId} = useWeb3()

  useEffect(() => {
    if (wineryContract && wineryProgressionContract && chainId) {
      if (!firebaseHelper) {
        setFirebaseHelper(new FirebaseHelper(wineryContract, wineryProgressionContract, chainId));
      }
    }
  }, [firebaseHelper, wineryContract, wineryProgressionContract, chainId]);

  return (
    <Context.Provider value={{ firebaseHelper }}>{children}</Context.Provider>
  );
};
