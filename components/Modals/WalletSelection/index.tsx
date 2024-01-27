'use client'

import React, { useState } from 'react'

import { Modal } from '@/components/UI'
import ConnectYourWallet from '@/components/Modals/WalletSelection/ConnectYourWallet'
import Welcome from '@/components/Modals/WalletSelection/Welcome'
import SignIn from '@/components/Modals/WalletSelection/SignIn'

import useStore from '@/store'

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
        <div className="flex items-center justify-center gap-10">
          <Welcome />
          <ConnectYourWallet setIsConnecting={setIsConnecting} />
        </div>
      )}
    </Modal>
  )
}

export default WalletSelection
