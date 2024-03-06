'use client'

import React, { useState } from 'react'

import { Modal } from '@/src/library/components/UI'
import ConnectYourWallet from '@/src/library/components/Modals/WalletSelection/ConnectYourWallet'
import Welcome from '@/src/library/components/Modals/WalletSelection/Welcome'
import SignIn from '@/src/library/components/Modals/WalletSelection/SignIn'

import useStore from '@/src/store'

const WalletSelection = () => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const openModal = useStore((state) => state.walletSelectionModal)
  const { setWalletSelectionModal } = useStore()

  return (
    <Modal openModal={openModal} setOpenModal={setWalletSelectionModal}>
      {isConnecting ? (
        <div className="flex items-center justify-center gap-10">
          <SignIn setOpenModal={setWalletSelectionModal} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full md:gap-6 xl:flex-row 2xl:w-auto">
          <Welcome />
          <ConnectYourWallet setIsConnecting={setIsConnecting} />
        </div>
      )}
    </Modal>
  )
}

export default WalletSelection
