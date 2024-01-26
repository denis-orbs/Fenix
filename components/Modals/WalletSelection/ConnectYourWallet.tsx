/* eslint-disable import/no-default-export */
import Image from 'next/image'

const WALLETS = [
  {
    name: 'Metamask',
    image: '/static/images/wallets/metamask.png',
  },
  {
    name: 'Rabby Wallet',
    image: '/static/images/wallets/rabby.png',
  },
  {
    name: 'Coinbase Wallet',
    image: '/static/images/wallets/coinbase.png',
  },
  {
    name: 'Rainbow',
    image: '/static/images/wallets/rainbow.png',
  },
  {
    name: 'WalletConnect',
    image: '/static/images/wallets/wallet-connect.png',
  },
  {
    name: 'Trust Wallet',
    image: '/static/images/wallets/trust-wallet.png',
  },
  {
    name: 'Safe Wallet',
    image: '/static/images/wallets/safe-wallet.png',
  },
  {
    name: 'Ledger Live',
    image: '/static/images/wallets/ledger-live.png',
  },
]

interface ConnectYourWalletProps {
  setIsConnecting: (isConnecting: boolean) => void
}

const ConnectYourWallet = ({ setIsConnecting }: ConnectYourWalletProps) => {

  const handlerSelectWallet = () => setIsConnecting(true)

  return (
    <div className="w-[620px] h-[602px] px-12 py-12 bg-no-repeat bg-[length:100%] bg-modal-connect flex flex-col items-center justify-center">
      <div className="w-full">
        <h4 className="mb-8 text-xl text-white">Connect your Wallet</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {WALLETS.map((wallet, index) => (
            <div
              key={index}
              onClick={handlerSelectWallet}
              className="relative flex items-center w-full gap-4 p-4 border cursor-pointer bg-shark-400 border-shark-400 bg-opacity-40 rounded-xl hover:bg-opacity-60"
            >
              <Image src={wallet.image} alt="wallet" className="w-10 h-10" width={42} height={42} />
              <h5 className="text-sm text-white">{wallet.name}</h5>
              {index < 1 && (
                <span className="absolute px-2 text-[10px] rounded-lg right-2 button-primary top-2">Recent</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
          <span className="icon-discord"></span>
          <p className="text-sm">Need help?</p>
        </div>
      </div>
    </div>
  )
}

export default ConnectYourWallet
