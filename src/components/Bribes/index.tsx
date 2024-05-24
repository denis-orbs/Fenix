//@ts-ignore
//@ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '@/src/components/Common/InfoBox'
import STEPS from './data'
import ChoosePool from '@/src/components/Bribes/Panel/ChoosePool'
import RewardToken from '@/src/components/Bribes/Panel/RewardToken'
import RewardSummary from '@/src/components/Bribes/Panel/RewardSummary'
import Total from '@/src/components/Bribes/Panel/Total'
import Separator from '@/src/components/Trade/Common/Separator'

import { Button, ProgressBar } from '@/src/components/UI'
import { IToken } from '@/src/library/types'

const Bribes = () => {
  const [tokenSell, setTokenSell] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenGet, setTokenGet] = useState<IToken>({ name: 'USDC', symbol: 'USDC' })
  const [poolValue, setPoolValue] = useState<number>(0)

  return (
    <div className="lock-box">
      <div className="flex flex-col w-full xl:flex-row relative z-10   ">
        <div className="w-full mb-5 xl:w-[45%]">
          <div className="flex justify-between mb-5">
            <h4 className="text-xl font-semibold text-white">Bribes</h4>
            <span className="icon-refresh text-shark-100 text-xl cursor-pointer"/>
          </div>

          <div className="mb-3">
            <ChoosePool token={tokenSell} setToken={setTokenSell} value={poolValue} setValue={setPoolValue} />
            <Separator single />
            <RewardToken token={tokenGet} setToken={setTokenGet} />
          </div>
          <div className="mb-3">
            <Total token={tokenSell} setToken={setTokenSell} value={poolValue} setValue={setPoolValue} />
          </div>
          <div className="mb-3">
            <RewardSummary />
          </div>

          <div className="mt-4">
            <Button className="w-full" variant="primary">
              <span>Create Bribe</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center w-[10%] relative ">
          <div className="bg-shark-400 h-4/5 w-[1px]"></div>
        </div>
        <div className=" flex flex-col w-full xl:w-[45%] max-h-[390px]  overflow-x-none">
          <div>
            <h1 className="text-white text-xl font-medium mb-5">How it works</h1>
          </div>
          {STEPS.map((exchange, index) => (
            <InfoBox
              hasDecorator={STEPS.length === index + 1 ? false : true}
              bgBox="exchange-box-info"
              
              key={index}
              data={exchange}
              textColor={'text-shark-100'}
            />
          ))}
          <Link
            target="_blank"
            href="https://discord.com/invite/fenixfi"
            className="mt-6 cursor-pointer xl:absolute bottom-0 right-36  text-sm"
          >
            <p className="flex gap-2 justify-center text-shark-100">
              <span className="icon-discord"></span>Need some help?
            </p>
          </Link>
          <div className="absolute xl:-top-[70px]  -top-6 right-0 z-10 w-28  xl:right-[3%] max-w-[100px]">
            <ProgressBar progress={50} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bribes
