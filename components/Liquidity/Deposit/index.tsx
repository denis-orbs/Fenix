'use client'

import { Button, MainBox } from '@/components/UI'
import InfoBox from '@/components/Common/InfoBox'
import { EXCHANGE_LIST } from '../data'

const Deposit = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row">
        <div className="xl:w-1/2">
          <h4 className="mb-3 text-xl text-white">Liquidity</h4>
          <p className="mb-4 text-sm text-shark-100">
            Liquidity Providers (LPs) make low-slippage swaps possible. Deposit and Stake liquidity to earn FNX.
          </p>
          <div className="flex flex-col gap-2 mb-8 md:flex-row">
            <Button>
              <div className="flex gap-2">
                <span className="icon-send"></span>
                Deposit Liquidity
              </div>
            </Button>
            <Button variant="default">Claim Earnings</Button>
          </div>
          <p className="flex items-center gap-3 mb-4 text-sm text-shark-100">
            <span className="inline-block text-lg text-transparent icon-send bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            There are currently 54 tokens listed.
          </p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-3 mb-8 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              View Tokens
            </p>
            <p className="flex items-center gap-3 mb-8 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              List New Token
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%] max-h-[390px] overflow-y-auto overflow-x-none">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default Deposit
