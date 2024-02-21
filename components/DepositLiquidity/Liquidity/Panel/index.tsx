/* eslint-disable max-len */
'use client'
import { useState } from 'react'
import Image from 'next/image'

// import IWantToAllocate from './IWantToAllocate'
// import ToBuy from './ToBuy'
// import Frequency from './Frequency'
// import AdvancedDCA from './AdvancedDCA'
// import Summary from './Summary'
// import Separator from '../../Common/Separator'

import { Button, Switch } from '@/components/UI'

import { IToken } from '@/types'

import ClasicalDepositLiquidity from './Classic'
import ConcentratedDepositLiquidityAutomatic from './Concentrated/Automatic'
import ConcentratedDepositLiquidityManual from './Concentrated/Manual'

const Panel = () => {
  const [tokenSell, setTokenSell] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenGet, setTokenGet] = useState<IToken>({ name: 'USDC', symbol: 'USDC' })
  const [allocateValue, setAllocateValue] = useState<number>(0)
  const [over, setOver] = useState<number>(0)
  const [showSummary, setShowSummary] = useState<boolean>(false)
  const [advancedDCA, setAdvancedDCA] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<string>('CONCENTRATED')
  const [depositType, setDepositType] = useState<
    'VOLATILE' | 'STABLE' | 'CONCENTRATED_AUTOMATIC' | 'CONCENTRATED_MANUAL'
  >('VOLATILE')

  const summary = {
    sell: (allocateValue || 0) + '' + tokenGet.symbol,
    get: tokenSell.symbol,
    receive: tokenGet.symbol,
    frequency: '12 Day(s)',
  }

  const handleShowSummary = () => setShowSummary(!showSummary)
  const [tokenSwap, setTokenSwap] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenFor, setTokenFor] = useState<IToken>({ name: 'ethereum', symbol: 'ETH' })

  return (
    <section className="box-panel-trade">
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-[25px] font-semibold">
            <h4 className="text-lg md:text-xl text-white font-medium">New Position</h4>
            <div className="flex items-center gap-[13px]">
              <div className="flex items-center gap-[9px] h-10">
                <Switch
                  active={depositType === 'CONCENTRATED_AUTOMATIC' || depositType === 'CONCENTRATED_MANUAL'}
                  setActive={() =>
                    setDepositType('CONCENTRATED_AUTOMATIC' === depositType ? 'VOLATILE' : 'CONCENTRATED_AUTOMATIC')
                  }
                />
                <span className="text-shark-100 text-xs leading-normal">Concentrated</span>
              </div>
              <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] p-2.5 border border-oxford-blue-900 bg-limed-spruce-900 bg-opacity-40 rounded-[10px] flex items-center justify-center text-white">
                <span className="icon-cog"></span>
              </div>
            </div>
          </div>

          <div className="bg-shark-400 bg-opacity-40 p-[13px] md:py-[11px] md:px-[19px] flex gap-1.5 md:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5">
            {depositType === 'CONCENTRATED_AUTOMATIC' || depositType === 'CONCENTRATED_MANUAL' ? (
              <>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'CONCENTRATED_AUTOMATIC' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('CONCENTRATED_AUTOMATIC')}
                >
                  Automatic
                </Button>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'CONCENTRATED_MANUAL' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('CONCENTRATED_MANUAL')}
                >
                  Manual
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'STABLE' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('STABLE')}
                >
                  Stable
                </Button>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'VOLATILE' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('VOLATILE')}
                >
                  Volatile
                </Button>
              </>
            )}
          </div>

          {(depositType === 'VOLATILE' || depositType === 'STABLE') && (
            <ClasicalDepositLiquidity depositType={depositType} tokenSwap={tokenSwap} tokenFor={tokenFor} />
          )}

          {depositType === 'CONCENTRATED_AUTOMATIC' && <ConcentratedDepositLiquidityAutomatic />}
          {depositType === 'CONCENTRATED_MANUAL' && <ConcentratedDepositLiquidityManual />}

          <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary">
            Create Position
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Panel
