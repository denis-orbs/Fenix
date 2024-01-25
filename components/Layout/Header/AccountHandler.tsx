'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/UI'

const AccountHandler = () => {
  // eslint-disable-next-line no-unused-vars
  const [isConnected, setIsConnected] = useState<boolean>(true)

  return (
    <div className="flex gap-8 items-center">
      {isConnected && (
        <div className="flex items-center gap-2">
          <Image src="/static/images/tokens/ETH.png" className="w-6 h-6" alt="logo" width={24} height={24} />
          <p className="text-xs text-white">1.987 ETH</p>
        </div>
      )}
      <div className="flex">
        {isConnected ? (
          <div className="flex bg-shark-600 rounded-lg border border-shark-500 gap-5 p-4 cursor-pointer hover:bg-shark-500 transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-shark-500 group-hover:bg-shark-600 rounded-lg w-10 h-10 flex items-center justify-center relative">
                <span className="icon-wallet text-base text-outrageous-orange-500"></span>
                <Image
                  src="/static/images/wallets/metamask.png"
                  className="absolute w-6 h-6 bottom-0 -right-1"
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
              <div className="">
                <p className="text-shark-100 text-xs font-medium">Welcome</p>
                <p className="text-white text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 block"></span>
                  0x98b36...ab87c6de3c
                </p>
              </div>
            </div>
            <div className="border-l border-shark-300 flex items-center justify-center w-10 h-10 pl-2">
              <span className="icon-cog text-lg text-shark-100 group-hover:text-outrageous-orange-500"></span>
            </div>
          </div>
        ) : (
          <Button className="gap-4">
            <span className="icon-wallet text-md"></span>
            Connect your Wallet
          </Button>
        )}
      </div>
    </div>
  )
}

export default AccountHandler
