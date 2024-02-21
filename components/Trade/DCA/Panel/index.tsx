'use client'
import { useState } from 'react'

import IWantToAllocate from '@/components/Trade/DCA/Panel/IWantToAllocate'
import ToBuy from '@/components/Trade/DCA/Panel/ToBuy'
import Frequency from '@/components/Trade/DCA/Panel/Frequency'
import AdvancedDCA from '@/components/Trade/DCA/Panel/AdvancedDCA'
import Summary from '@/components/Trade/DCA/Panel/Summary'
import Separator from '@/components/Trade/Common/Separator'

import { Button, Switch } from '@/components/UI'

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

  return (
    <section className="box-panel-trade">
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <h4 className="mb-3 text-lg text-white font-medium">DCA</h4>
            <span className="icon-reflesh text-shark-100 text-xl"></span>
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <div className="mb-3">
              <IWantToAllocate
                token={tokenSell}
                setToken={setTokenSell}
                value={allocateValue}
                setValue={setAllocateValue}
              />
              <Separator />
              <ToBuy token={tokenGet} setToken={setTokenGet} />
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
                <Switch active={advancedDCA} setActive={setAdvancedDCA} />
              </div>
              {advancedDCA && <AdvancedDCA />}
            </div>

            <div className="flex items-center justify-between mb-2">
              <p className="text-shark-100 text-sm">Current buy FNX</p>
              <p className="text-white text-sm">0.000 USDC</p>
            </div>

            {showSummary && <Summary summary={summary} />}
          </div>
          <Button className="w-full mx-auto" variant="tertiary">
            Start DCA
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Panel
