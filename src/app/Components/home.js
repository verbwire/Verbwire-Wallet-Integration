"use client";
import { useDisconnect, useAccount, useConnect } from "wagmi";
import { useBalance } from "wagmi";


import dynamic from "next/dynamic";
import SwitchNewtork from "./switchNewtork";
import WalletClient from "./walletClient";
import { useEffect } from "react";
import MintNFT from "./mintNFT";

function Home() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  console.log(data, isError, isLoading);

  async function connectWallet(connector) {
    const { chain } = await connectAsync({ connector });
  }

  async function walletDisconnect() {
    await disconnect();
  }

  return (
    <>
      <div className="my-8 h-screen">
        {!isConnected &&
          connectors.map((connector) => {
            const { id, name } = connector;
            return (
              <a
                onClick={() => connectWallet(connector)}
                key={id}
                id={id}
                className="mt-4 text-center block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Connect to {name}
              </a>
            );
          })}
        {isConnected && (
          <>
            <div className="flex flex-col items-center p-4">
              <div className="flex">
              <p className="py-2 mx-4 text-white">Connected to {address}</p>
              <button
                className="block rounded border border-red-500 bg-red-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                onClick={walletDisconnect}
              >
                Disconnect
              </button>
              </div>
              <p>Balance: {data?.formatted} {data?.symbol}</p>
            </div>

          <SwitchNewtork />
          <WalletClient />
          <MintNFT />
          </>
        )}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
