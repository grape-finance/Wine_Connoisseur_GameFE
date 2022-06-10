import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import theme from "config/theme";
import { store } from "store";
import { Web3Provider } from "state/web3";
import TokenUpdater from "state/user/updater";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/letteldream/winenftgame",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Web3Provider>
        <TokenUpdater />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Web3Provider>
    </ApolloProvider>
  </Provider>,
  document.querySelector("#root")
);
