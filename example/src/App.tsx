import { useState, useEffect } from "react";

import { WalletProvider } from "../../src/context";
import WalletConnect from "./components/WalletConnect";
const BASE_URL = "https://wallet.sit.clique-test.tech";
const SOLANA_RPC_URL = "https://yeezy-rpc.com";

function App() {
  return (
    <WalletProvider
      config={{
        baseURL: BASE_URL,
        solanaCluster: {
          name: "mainnet-beta",
          rpcUrl: SOLANA_RPC_URL,
        },
      }}
    >
      <div className="app-container">
        <h1>Clique Wallet SDK Demo</h1>
        <WalletConnect />
      </div>
    </WalletProvider>
  );
}

export default App;
