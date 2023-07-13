"use client";
import { useEffect, useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "ethers/utils";

function SendTransaction() {
    const [recepient, setrecepient] = useState("");
    const [amount, setamount] = useState("");

    const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
        to: recepient,
        value: parseEther(amount || '0'),
      });
    
    useEffect(() => {
      setrecepient('');
        setamount('');
        console.log("Data ",data)
    }, [isSuccess,data])
      

  return (
    <>
    <div className="mt-6 flex flex-col items-center">
        <div className="flex">
          <input
            type="address"
            placeholder="Enter Wallet Address"
            className="mx-2 bg-black text-white rounded border border-white p-2 text-sm"
            onChange={(e) => setrecepient(e.target.value)}
            value={recepient}
          />
          <input
            type="value"
            placeholder="Enter Amount"
            className="mx-2 bg-black w-1/4 text-white rounded border border-white p-2 text-sm"
            onChange={(e) => setamount(e.target.value)}
            value={amount}
          />
          {!isSuccess && <button
          className="mx-2 w-fit block rounded border border-blue-500 bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          onClick={() => sendTransaction()}
          >
            {isLoading ? 'Loading...': 'Send'}
          </button>}
          {isSuccess && <a
          className="mx-2 w-fit block rounded border border-blue-500 bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href={`https://mumbai.polygonscan.com/tx/${data['hash']['hash'] || data['hash']}`}
          target="_blank" rel="noreferrer"
          >
            View Transaction
          </a>}
          
        </div>
      </div>
    </>
  )
}

export default SendTransaction