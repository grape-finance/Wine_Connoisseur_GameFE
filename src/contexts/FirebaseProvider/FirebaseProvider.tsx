import { useWineryContract, useWineryProgressionContract } from "hooks/useContract";
import React, { createContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (wineryContract && wineryProgressionContract) {
      if (!firebaseHelper) {
        setFirebaseHelper(new FirebaseHelper(wineryContract, wineryProgressionContract));
      }
    }
  }, [firebaseHelper, wineryContract, wineryProgressionContract]);

  return (
    <Context.Provider value={{ firebaseHelper }}>{children}</Context.Provider>
  );
};
