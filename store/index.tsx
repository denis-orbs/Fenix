import { create } from 'zustand'

interface DefaultState {
  walletSelectionModal: boolean
  readMoreModal: boolean
  isConnected: boolean
  setIsConnected: (value: boolean) => void
  setWalletSelectionModal: (value: boolean) => void
  setReadMoreModal: (value: boolean) => void
}

const useStore = create<DefaultState>((set) => ({
  isConnected: false,
  walletSelectionModal: false,
  readMoreModal: false,
  setIsConnected: (value: boolean) =>
    set(() => ({
      isConnected: value,
    })),
  setWalletSelectionModal: (value: boolean) =>
    set(() => ({
      walletSelectionModal: value,
    })),
  setReadMoreModal: (value: boolean) =>
    set(() => ({
      readMoreModal: value,
    })),
}))

export default useStore
