"use client";
import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {  arbitrumGoerli, goerli, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { VerbwireWalletConnector } from "verbwire-wallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { VerbwireWalletStreamContextProvider } from "verbwire-wallet-stream";
import { watchAccount } from "@wagmi/core";
import { credentials } from "../../credentials";


import Home from "./Components/home";
import { useEffect } from "react";


const { chains, publicClient } = configureChains(
  [polygonMumbai, arbitrumGoerli, mainnet, goerli, polygon, ],
  [alchemyProvider({apiKey: credentials.alchemyKey})]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new VerbwireWalletConnector({
      chains,
      options: {
        name: "Wallet Integration",
        network: polygonMumbai,
        applicationId: credentials.applicationId,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
  ],
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WagmiConfig config={config}>
        <VerbwireWalletStreamContextProvider
          apiKey={credentials}
          applicationId={credentials.applicationId}
          watchAccount={watchAccount}
        >
          <Home />
        </VerbwireWalletStreamContextProvider>
      </WagmiConfig>
    </main>
  );
}
