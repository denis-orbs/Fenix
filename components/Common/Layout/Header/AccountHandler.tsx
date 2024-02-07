'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/UI'
import useStore from '@/store'

const AccountHandler = () => {
  // eslint-disable-next-line no-unused-vars
  const isConnected = useStore((state) => state.isConnected)
  const { setWalletSelectionModal } = useStore()

  const handlerConnectWallet = () => {
    setWalletSelectionModal(true)
  }

  return (
    <div className="flex items-center gap-[15px]">
      {isConnected && (
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Image src="/static/images/tokens/ETH.png" className="w-6 h-6" alt="logo" width={24} height={24} />
          <p className="text-xs text-white">1.987 ETH</p>
        </div>
      )}
      <div className="flex">
        {isConnected ? (
          <div className="flex gap-2 md:gap-5 md:py-[13px] md:px-3.5 !pr-0 transition-all border rounded-[10px] cursor-pointer bg-shark-900 border-shark-400 bg-opacity-40 hover:bg-opacity-10 group">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-[10px] bg-shark-400 bg-opacity-40">
                <span className="text-[17px] icon-wallet text-outrageous-orange-500"></span>

                <Image
                  src="/static/images/wallets/metamask.png"
                  className="absolute w-6 h-6 right-0 bottom-0"
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
              <div className="">
                <p className="hidden md:block text-xs font-medium text-shark-100">Welcome</p>
                <p className="flex items-center text-xs text-white">
                  <span className="block w-2 h-2 mr-1.5 bg-green-400 rounded-full"></span>
                  <span className="truncate max-w-[70px] md:max-w-[150px]">0x98b36ab87c6de3c</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center px-4 border-l border-shark-300 flex-shrink-0 group-hover:border-shark-300 transition-colors">
              <span className="text-base md:text-xl icon-cog text-shark-100 group-hover:text-outrageous-orange-500"></span>
            </div>
          </div>
        ) : (
          <Button className="gap-3.5 md:w-[300px] h-[40px] md:h-[49px]" onClick={handlerConnectWallet}>
            <span className="icon-wallet text-md"></span>
            <span className="text-xs md:text-sm">Connect your Wallet</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default AccountHandler
