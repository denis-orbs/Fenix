'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/UI'
import useStore from '@/store'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const AccountHandler = () => {
  // eslint-disable-next-line no-unused-vars
  const isConnected = useStore((state) => state.isConnected)
  const { setWalletSelectionModal } = useStore()

  const handlerConnectWallet = () => {
    //  setWalletSelectionModal(true)
  }

  return (
    <div className="flex items-center gap-[15px]">
      {/* {isConnected && (
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Image src="/static/images/tokens/ETH.png" className="w-6 h-6" alt="logo" width={24} height={24} />
          <p className="text-xs text-white">1.987 ETH</p>
        </div>
      )} */}
      <div className="flex">
        <ConnectButton label="Connect your wallet" showBalance={true}></ConnectButton>
        {/* <Button className="gap-3.5 md:w-[300px] h-[40px] md:h-[49px]" onClick={handlerConnectWallet}>
          <span className="icon-wallet text-md"></span>
          <span className="text-xs md:text-sm">
          </span>
        </Button> */}
      </div>
    </div>
  )
}

export default AccountHandler
