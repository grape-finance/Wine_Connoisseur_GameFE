import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import theme from "theme";
import { store } from "store";
import { Web3Provider } from "state/web3";
import Updater from "state/Updaters";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/letteldream/winenftgame",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Web3Provider>
        <Updater />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Web3Provider>
    </ApolloProvider>
  </Provider>,
  document.querySelector("#root")
);
