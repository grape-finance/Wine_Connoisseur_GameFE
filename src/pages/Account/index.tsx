import { Button, Card, Container, Grid, Typography } from "@mui/material";
import { useTokenBalance } from "state/user/hooks";
import React, { useEffect, useState } from "react";
import {
  buyGrapeAddress,
  buyToolsNFTAddress,
  buyVintageWineAddress,
  buyVintnerNFTAddress,
} from "config/address";
import { useWeb3 } from "state/web3";
import NFTList from "components/NFTList";

const Account = () => {
  const { grapeBalance, vintageWineBalance } = useTokenBalance();
  const { account } = useWeb3();

  const stakeVinter = () => {
    alert("123");
  };

  const stakeTools = () => {
    alert("345");
  };

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Button
            size="large"
            variant="contained"
            href={buyGrapeAddress}
            target="_blank"
          >
            Buy Grape Token
          </Button>
          <Button
            size="large"
            variant="contained"
            href={buyVintageWineAddress}
            target="_blank"
          >
            Buy VinageWine Token
          </Button>

          <Button
            size="large"
            variant="contained"
            href={buyVintnerNFTAddress}
            target="_blank"
          >
            Buy Vintner NFT
          </Button>
          <Button
            size="large"
            variant="contained"
            href={buyToolsNFTAddress}
            target="_blank"
          >
            Buy Tools NFT
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" style={{ padding: "10px" }}>
            Your Token Balance
            <Typography color="text.secondary">
              {grapeBalance.toFixed(2)} Grape
            </Typography>
            <Typography color="text.secondary">
              {vintageWineBalance.toFixed(2)} VintageWine
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" style={{ padding: "10px" }}>
            Your NFTs
            <Typography color="text.secondary">Vintners</Typography>
            <Typography color="text.secondary">
              {vintageWineBalance.toFixed(2)} VintageWine
            </Typography>
          </Card>
          <Button
            size="large"
            variant="contained"
            onClick={() => stakeVinter()}
          >
            Stake Vintner to get VintageWine
          </Button>

          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => stakeTools()}
          >
            Stake Tools to get more
          </Button>
        </Grid>
      </Grid>
      <Typography>My NFTs</Typography>
      {account && <NFTList account={account.toLowerCase()} />}
    </Container>
  );
};

export default Account;
