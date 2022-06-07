import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useTokenBalance } from "state/user/hooks";
import React, { useEffect, useState } from "react";

const Account = () => {
  const { grapeBalance, vintageWineBalance } = useTokenBalance();
  
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" style={{ padding: "10px" }}>
            Your Balance
            <Typography color="text.secondary">
              {grapeBalance.toFixed(2)} Grape
            </Typography>
            <Typography color="text.secondary">
              {vintageWineBalance.toFixed(2)} VintageWine
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
