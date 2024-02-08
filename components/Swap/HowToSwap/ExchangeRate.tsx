/* eslint-disable import/no-default-export */
'use client'
import Image from 'next/image'
import { Button } from '@/components/UI'

const ExchangeRate = () => {
  return (
    <li className="flex justify-between gap-3 items-center p-3 mb-3 relative bg-shark-400 bg-opacity-40 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 p-3 rounded-lg bg-shark-400 bg-opacity-60">
          <span
            className={`inline-block text-xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-calculator`}
          ></span>
        </div>
        <div className="flex flex-col">
          <h5 className="text-xs text-shark-100">Exchange rate found...</h5>
          <div className="flex items-center gap-2">
            <p className="text-white text-sm">1 FNX</p>
            <span
              className={`inline-block text-lg text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-swap`}
            ></span>
            <p className="text-white text-sm">0.0856 USDC</p>
          </div>
        </div>
      </div>
      <Button variant="tertiary" className="h-4 !p-[12px] !text-xs">
        Refresh
      </Button>
      <span className="absolute z-0 top-[80%] left-[10px]">
        <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-8" width={1} height={35} />
      </span>
    </li>
  )
}

export default ExchangeRate
