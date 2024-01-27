/* eslint-disable import/no-default-export */
import Image from 'next/image'

const Welcome = () => {
  return (
    <div className="p-20 bg-modal-welcome bg-[length:100%] bg-no-repeat w-[1057px] h-[606px] flex items-start flex-col justify-center relative">
      <Image
        src="/static/images/modals/abstract.png"
        className="w-[150px] h-[150px] absolute top-[180px] -left-[50px] mix-blend-lighten blur-sm"
        alt="logo"
        width={150}
        height={150}
      />
      <div className="max-w-[500px] mb-4">
        <Image
          src="/static/images/logo.svg"
          className="w-[150px] h-10 mb-8"
          alt="logo"
          width={150}
          height={40}
          priority
        />
        <p className="mb-4 text-shark-100">Welcome to fenix</p>
        <h3 className="mb-4 text-4xl text-white">
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
      <div className="flex items-center gap-5">
        <div className="relative p-4 bg-info-box bg-contain bg-no-repeat flex items-center gap-4 h-[100px]">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg p-3 w-12 h-12 flex items-center justify-center">
            <span className="text-xl text-white icon-wallet"></span>
          </div>
          <div className="relative">
            <h6 className="text-xs text-white">You`ll need an Ethereum Wallet to sign-in.</h6>
            <p className="text-xs text-shark-100">
              <span className="mr-2 text-base icon-link"></span>
              Learn More
            </p>
          </div>
        </div>
        <div className="relative p-4 bg-info-box bg-contain bg-no-repeat flex items-center gap-4 h-[100px]">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg p-3 w-12 h-12 flex items-center justify-center">
            <span className="text-2xl text-outrageous-orange-500 icon-document"></span>
          </div>
          <div className="relative">
            <p className="text-xs text-white max-w-[240px]">
              Once connected, you will have to sign a message to confirm that you agree to our Legal Disclaimer.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 absolute bottom-0 left-[193px]">
        <p className="text-shark-100 text-sm">2023 © Fenix Finance</p>
        <p className="text-shark-100 text-sm bg-shark-400 bg-opacity-40 px-2 py-1 rounded-md">Version: 93a8d72</p>
      </div>
      <Image
        src="/static/images/modals/abstract.png"
        className="w-[320px] h-[320px] absolute -bottom-[100px] -right-[40px] mix-blend-lighten blur-sm"
        alt="logo"
        width={150}
        height={150}
      />
    </div>
  )
}

export default Welcome
