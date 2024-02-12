'use client'
import { useState } from 'react'

import IWantToAllocate from './IWantToAllocate'
import ToBuy from './ToBuy'
import Frequency from './Frequency'
import AdvancedDCA from './AdvancedDCA'
import Summary from './Summary'
import Separator from '../../Common/Separator'
import { Button } from '@/components/UI'

import { IToken } from '@/types'

const Panel = () => {
  const [tokenSell, setTokenSell] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenGet, setTokenGet] = useState<IToken>({ name: 'USDC', symbol: 'USDC' })
  const [allocateValue, setAllocateValue] = useState<number>(0)
  const [over, setOver] = useState<number>(0)
  const [showSummary, setShowSummary] = useState<boolean>(false)
  const [advancedDCA, setAdvancedDCA] = useState<boolean>(false)

  const summary = {
    sell: (allocateValue || 0) + "" + tokenGet.symbol,
    get: tokenSell.symbol,
    receive: tokenGet.symbol,
    frequency: '12 Day(s)',
  }

  const handleShowSummary = () => setShowSummary(!showSummary)
  const handleShowAdvancedDCA = () => setAdvancedDCA(!advancedDCA)

  return (
    <section className="relative w-full rounded-2xl xl:w-[667px] bg-shark-400 xl:bg-transparent bg-opacity-40">
      <div className="swap-box-top"></div>
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center py-8 xl:py-0 px-6 xl:px-10 xl:bg-shark-400 xl:bg-opacity-40">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <h4 className="mb-3 text-xl text-white font-medium">DCA</h4>
            <span className="icon-reflesh text-shark-100 text-xl"></span>
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <div className="mb-3">
              <IWantToAllocate token={tokenSell} value={allocateValue} setValue={setAllocateValue} />
              <Separator />
              <ToBuy token={tokenGet} />
            </div>
            <div className="mb-2">
              <Frequency over={over} setOver={setOver} handleShowSummary={handleShowSummary} />
            </div>
            <div className="flex flex-col items-start mb-3">
              <div className="flex items-center justify-between mb-4 w-full">
                <div className="flex gap-1 items-center ">
                  <p className="text-white text-sm">Advanced DCA</p>
                  <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
                </div>
                <div onClick={handleShowAdvancedDCA} className="bg-shark-100 rounded-full w-10 h-5 cursor-pointer flex items-center relative">
                  <span className="rounded-full w-4 h-4 bg-shark-400 block absolute top-[2px] left-[2px]"></span>
                </div>
              </div>
              {advancedDCA && <AdvancedDCA />}
            </div>

            <div className="flex items-center justify-between mb-2">
              <p className="text-shark-100 text-sm">Current buy FNX</p>
              <p className="text-white text-sm">0.000 USDC</p>
            </div>

            {showSummary && <Summary summary={summary} />}
          </div>
          <Button className="w-full mx-auto">Start DCA</Button>
        </div>
      </div>
      <div className="swap-box-bottom"></div>
    </section>
  )
}

export default Panel
