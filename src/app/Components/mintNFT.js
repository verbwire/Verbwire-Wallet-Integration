"use client";
import { useState } from "react";
import { useSwitchNetwork } from "wagmi";
import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
} from "wagmi";
import { ParseAbi, parseAbi } from "viem";

export default function MintNFT() {
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { chain } = useNetwork();
  const { address } = useAccount();
  console.log(chain, address);

  const { config } = usePrepareContractWrite({
    address: "0x50A4DcFf21ca58500Dee7ED33854f10070547a70",
    abi: parseAbi([
      "function mint(address recipient, string memory tokenURI, uint256 quantity) payable",
    ]),
    functionName: "mint",
    args: [
      address,
      "https://ipfs.io/ipfs/bafyreihwifovpld6idabkt4m4fm47uzlqqx2fqjo6mypmes7oto5icf7qm/metadata.json",
      1,
    ],
  });
  const { data, isSuccess, write } = useContractWrite(config);
  console.log("Data: ", data);

  const [buttonState, setbuttonState] = useState("Mint NFT");
  return (
    <div className="flex flex-col items-center mt-8">
      {chain.id != 80001 && (
        <button
          onClick={() => switchNetwork?.(80001)}
          className="mx-2 w-fit block rounded border border-blue-500 bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
        >
          Switch and Mint
        </button>
      )}
      {chain.id == 80001 && !isSuccess && (
        <button
          onClick={() => write?.()}
          className="mx-2 w-fit block rounded border border-blue-500 bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
        >
          {buttonState}
        </button>
      )}

      {isSuccess && (
        <a
          href={`https://mumbai.polygonscan.com/tx/${
            data["hash"]["hash"] || data["hash"]
          }`}
          target="_blank"
          className="mx-2 w-fit block rounded border border-blue-500 bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          rel="noreferrer"
        >
          View Transaction
        </a>
      )}
    </div>
  );
}
