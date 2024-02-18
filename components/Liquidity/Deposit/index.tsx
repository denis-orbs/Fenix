'use client'

import { Button } from '@/components/UI'
import MainBox from '@/components/Common/Boxes/MainBox'
import InfoBox from '@/components/Common/InfoBox'
import { EXCHANGE_LIST } from '../data'

const Deposit = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row bg-shark-400 bg-opacity-40 rounded-2xl xl:rounded-none py-8 xl:py-0 px-10">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-xl text-white">Liquidity Pools</h4>
          <p className="mb-4 text-sm text-shark-100">
            Liquidity Providers (LPs) make low-slippage swaps possible. Deposit and Stake liquidity to earn FNX.
          </p>
          <div className="flex flex-col gap-2 mb-8 md:flex-row">
            <Button>
              <div className="flex gap-2">
                <span className="icon-send"></span>
                Create Position
              </div>
            </Button>
            {/* <Button variant="default">Claim Earnings</Button> */}
          </div>
          <p className="flex items-center gap-3 mb-4 text-sm text-shark-100">
            <span className="inline-block text-lg text-transparent icon-circles bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            There are currently 54 tokens listed.
          </p>
      
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%]">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} hasTooltip={false} />
          ))}
        </div>
       
      </div>
      <div className='bg-shark-400 bg-opacity-40 hidden xl:block  text-shark-100 rounded-2xl xl:rounded-none'>
        <div className='flex gap-3 justify-end'>
        <span className='icon-discord'></span>
        <p className='me-10'>Need some help?</p>
        </div>
      </div>
    </MainBox>
  )
}

export default Deposit
