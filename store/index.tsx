/* eslint-disable no-unused-vars */
import { create } from 'zustand'

interface DefaultState {
  walletSelectionModal: boolean
  isConnected: boolean
  setIsConnected: (value: boolean) => void
  setWalletSelectionModal: (value: boolean) => void
}

const useStore = create<DefaultState>((set) => ({
  isConnected: false,
  walletSelectionModal: false,
  setIsConnected: (value: boolean) =>
    set(() => ({
      isConnected: value,
    })),
  setWalletSelectionModal: (value: boolean) =>
    set(() => ({
      walletSelectionModal: value,
    })),
}))

export default useStore
