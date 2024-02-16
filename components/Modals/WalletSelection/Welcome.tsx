/* eslint-disable import/no-default-export */
import Image from 'next/image'

const Welcome = () => {
  return (
    <div className="md:w-[60%] hidden xl:block relative mb-10 md:mb-0 bg-shark-400 bg-opacity-40 rounded-2xl p-10">
      <Image
        src="/static/images/modals/abstract.png"
        className="w-[150px] h-[150px] absolute top-[130px] -left-[80px] mix-blend-lighten blur-sm"
        alt="logo"
        width={150}
        height={150}
      />
      <div className="w-full">
        <div className="md:max-w-[500px] mb-4 relative">
          <Image
            src="/static/images/logo.svg"
            className="w-[150px] h-10 mb-8"
            alt="logo"
            width={150}
            height={40}
            priority
          />
          <p className="mb-4 text-shark-100">Welcome to fenix</p>
          <h3 className="mb-4 text-2xl text-white md:text-4xl">
            The core trading and{' '}
            <span className="inline-block text-transparent bg-gradient-to-r from-festival-500 to-outrageous-orange-500 bg-clip-text">
              liquidity marketplace
            </span>{' '}
            on{' '}
          </h3>
          <p className="mb-4 text-sm text-shark-100">
            Fenix is a community-owned decentralized exchange (DEX) and liquidity provider constructed on the Arbitrum
            Layer 2 (L2) network, aimed at fostering DeFi growth.
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 mb-4 md:flex-row">
          <div className="relative flex items-center w-1/2 gap-4 p-4 rounded-lg bg-shark-400 bg-opacity-80">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-500">
              <span className="text-sm text-white icon-wallet"></span>
            </div>
            <div className="relative">
              <h6 className="text-xs text-white line-clamp-1">You`ll need an Ethereum Wallet to sign-in.</h6>
              <p className="text-xs text-shark-100">
                <span className="mr-2 text-base icon-link"></span>
                Learn More
              </p>
            </div>
          </div>
          <div className="relative flex items-center w-1/2 gap-4 p-4 rounded-lg bg-shark-400 bg-opacity-80">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-500">
              <span className="text-xl text-white icon-document"></span>
            </div>
            <div className="relative">
              <p className="text-xs text-white line-clamp-1">
                Once connected, you will have to sign a message to confirm that you agree to our Legal Disclaimer.
              </p>
            </div>
          </div>
        </div>
        <div className="items-center hidden gap-2 md:flex">
          <p className="text-xs text-shark-100">2023 © Fenix Finance</p>
          <p className="px-2 py-1 text-xs rounded-md text-shark-100 bg-shark-400 bg-opacity-40">Version: 93a8d72</p>
        </div>
      </div>
      <Image
        src="/static/images/modals/abstract.png"
        className="w-[320px] h-[320px] absolute -bottom-[100px] -right-[40px] mix-blend-lighten blur-sm hidden md:block"
        alt="logo"
        width={150}
        height={150}
      />
    </div>
  )
}

export default Welcome
