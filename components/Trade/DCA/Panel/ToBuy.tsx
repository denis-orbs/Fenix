'use client'

import Image from 'next/image'

import { IToken } from '@/types'

interface ToBuyProps {
  token: IToken
}

const ToBuy = ({ token }: ToBuyProps) => {

  return (
    <div className="exchange-box-x2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-sm">To buy</p>
        <p className="text-shark-100 flex gap-3 text-sm items-center">
          <span className="icon-wallet text-xs"></span>
          <span>Available: 0.00 ETH</span>
        </p>
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-3">
        <div className="relative w-full">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              <Image
                src={`/static/images/tokens/${token.symbol}.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{token.symbol}</span>
            </div>
            <span className="icon-chevron text-sm inline-block ml-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToBuy
