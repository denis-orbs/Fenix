'use client'

import { Button } from '@/components/UI'
import MainBox from '@/components/Common/Boxes/MainBox'
import InfoBox from '../Common/InfoBox'
import { EXCHANGE_LIST } from './data'

const Deposit = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row relative z-10">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-2xl text-white">Vote</h4>
          <p className="mb-4 text-sm text-shark-100">
            Voters earn a share of transaction fees and incentives for helping govern how emissions are distributed.
          </p>
          <div className="flex items-center flex-col md:flex-row gap-3">
            <div className="flex gap-2 items-center w-full xl:w-auto">
              <div className="bg-shark-400 p-1 rounded-lg border border-shark-400 border-1 bg-opacity-40">
                <span className="icon-clock p-1 text-lg text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              </div>
              <p className="text-white text-sm">Current voting round</p>
            </div>
            <Button variant="tertiary" className="w-full xl:w-auto">
              <div className="flex">Claim Earnings</div>
            </Button>
          </div>
          <p className="flex items-center gap-3 mb-4 mt-4 text-sm text-shark-100">
            <span className="inline-block text-2xl text-transparent icon-circles bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            There are currently 54 tokens listed.
          </p>
          <div className="text-sm flex gap-2 text-shark-100">
            <p className="flex gap-2">
              <span className="icon-trophy"></span>
              View Tokens
            </p>
            <p className="flex gap-2">
              <span className="icon-link"></span>
              List New Token
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%]">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} hasTooltip={false} />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default Deposit
