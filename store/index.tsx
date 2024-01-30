/* eslint-disable no-unused-vars */
import { create } from 'zustand'

interface DefaultState {
  walletSelectionModal: boolean
  liquidityReadMoreModal: boolean
  isConnected: boolean
  setIsConnected: (value: boolean) => void
  setWalletSelectionModal: (value: boolean) => void
  setLiquidityReadMoreModal: (value: boolean) => void
}

const useStore = create<DefaultState>((set) => ({
  isConnected: false,
  walletSelectionModal: false,
  liquidityReadMoreModal: false,
  setIsConnected: (value: boolean) =>
    set(() => ({
      isConnected: value,
    })),
  setWalletSelectionModal: (value: boolean) =>
    set(() => ({
      walletSelectionModal: value,
    })),
  setLiquidityReadMoreModal: (value: boolean) =>
    set(() => ({
      liquidityReadMoreModal: value,
    })),
}))

export default useStore
