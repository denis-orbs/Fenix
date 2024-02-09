'use client'

import Image from 'next/image'
import { Button } from '@/components/UI'

interface ExchangeBoxProps {
  title: string
}

const ExchangeBox = ({ title }: ExchangeBoxProps) => {
  return (
    <div className="bg-shark-400 bg-opacity-40 w-full rounded-xl px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white">{title}</p>
        <p className="text-shark-100 flex gap-3 text-sm items-center">
          <span className="icon-wallet text-xs"></span>
          <span>Available: 0.00 ETH</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-2/5">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              <Image
                src={`/static/images/tokens/FNX.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">FNX</span>
            </div>
            <span className="icon-chevron text-sm inline-block ml-2" />
          </div>
        </div>
        <div className="relative w-3/5">
          <input
            type="text"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
          />
          <Button variant="tertiary" className="!py-1 !px-3 absolute right-2 top-3">
            Max
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExchangeBox
