"use client";
import { useState } from "react";
import { useSignMessage } from "wagmi";
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
import SendTransaction from "./sendTransaction";

function WalletClient() {
  const [buttonState, setButtonState] = useState("Sign Message");
  const [message, setmessage] = useState("");
  const [recepient, setrecepient] = useState("");
  const [amount, setamount] = useState("");

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: message,
  });
  

  return (
    <>
      <div className="mt-6 flex flex-col items-center">
        <div className="flex p-4 max-w-2xl">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Message"
            className="bg-black text-white rounded border border-white p-2 text-sm"
            onChange={(e) => setmessage(e.target.value)}
            value={message}
          />
          <button
            className="mx-4 w-fit block rounded border border-blue-500 bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            onClick={() => {
              signMessage();
            }}
          >
            {buttonState}
          </button>
        </div>
        {isSuccess && (
          <>
            <div className="text-white w-1/2">
              Signature
              <textarea
                className="border bg-black w-full text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={true}
              >
                {data}
              </textarea>
            </div>
          </>
        )}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error signing message</div>}
      </div>

      <SendTransaction />
    </>
  );
}

export default WalletClient;
