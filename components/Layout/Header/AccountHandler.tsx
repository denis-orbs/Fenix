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
    <div className="flex items-center gap-8">
      {isConnected && (
        <div className="flex items-center gap-2">
          <Image src="/static/images/tokens/ETH.png" className="w-6 h-6" alt="logo" width={24} height={24} />
          <p className="text-xs text-white">1.987 ETH</p>
        </div>
      )}
      <div className="flex">
        {isConnected ? (
          <div className="flex gap-5 p-4 transition-all border rounded-lg cursor-pointer bg-shark-600 border-shark-500 hover:bg-shark-500 group">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-shark-500 group-hover:bg-shark-600">
                <span className="text-base icon-wallet text-outrageous-orange-500"></span>
                <Image
                  src="/static/images/wallets/metamask.png"
                  className="absolute bottom-0 w-6 h-6 -right-1"
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
              <div className="">
                <p className="text-xs font-medium text-shark-100">Welcome</p>
                <p className="flex items-center text-xs text-white">
                  <span className="block w-2 h-2 mr-2 bg-green-400 rounded-full"></span>
                  0x98b36...ab87c6de3c
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-10 h-10 pl-2 border-l border-shark-300">
              <span className="text-lg icon-cog text-shark-100 group-hover:text-outrageous-orange-500"></span>
            </div>
          </div>
        ) : (
          <Button className="gap-4 w-[290px]" onClick={handlerConnectWallet}>
            <span className="icon-wallet text-md"></span>
            Connect your Wallet
          </Button>
        )}
      </div>
    </div>
  )
}

export default AccountHandler
