import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useContract, useWalletClient } from 'wagmi'

export default function SwitchNewtork() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
    
  return (
    <>
    <div className='px-4 flex flex-col items-center py-4 bg-slate-900 rounded'>
      {chain && <div className='m-2 block rounded border border-green-600 bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'>
        Connected to {chain.name}
        </div>}
      <div className='flex'>
      {chains.map((x) => (
        <button
          className='m-2 block rounded border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          Switch to {x.name}
          {isLoading && pendingChainId === x.id && ' (switching)'}
        </button>
      ))}
      </div>
 
      <div>{error && error.message}</div>
    </div>
    </>
  )
}

