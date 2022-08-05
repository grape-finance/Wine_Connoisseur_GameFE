import { Alert, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const NetworkVerifier: React.FC = () => {
  const [currentChain, setCurrentChain] = useState(0);
  const vertical = "top";
  const horizontal = "right";
  const chainId = 43114;

  useEffect(() => {
    function verifyEthereum() {
      if (window.ethereum) {
        setCurrentChain(parseInt(window.ethereum.chainId));
        window.ethereum.on("chainChanged", (chainId: any) => {
          window.location.reload();
        });
      }
    }

    setTimeout(verifyEthereum, 2000);
  }, []);

  return (
    <>
      {currentChain !== 0 && currentChain !== chainId ? (
        <Snackbar
          open
          style={{ marginTop: "80px" }}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            <Typography component="p">Switch to Avalanche Network</Typography>
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default NetworkVerifier;
