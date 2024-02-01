/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import ExchangeTooltip from './ExchangeTooltip'

interface Info {
  unlocked: number
  locked: number
}

interface Exchange {
  label: string
  amount: string
  info: Info
}

interface MigrationItemProps {
  exchange: Exchange
}

const MigrationItem = ({ exchange }: MigrationItemProps) => {
  const [show, setShow] = useState<boolean>(false)

  const handleShowTooltip = () => setShow(true)
  const handleHiddenTooltip = () => setShow(false)

  return (
    <div className="relative">
      <div className="w-[384px] h-[77px] box-medium flex gap-3 items-center p-3 mb-3 relative">
        <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
          <span className="inline-block text-2xl text-transparent icon-lucide bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
        </div>
        <div className="fw">
          <h5 className="text-xs text-shark-100">{exchange.label}</h5>
          <div className="flex items-center gap-1">
            <p className="text-white">{exchange.amount}</p>
            <span
              onMouseEnter={handleShowTooltip}
              onMouseLeave={handleHiddenTooltip}
              className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"
            ></span>
          </div>
        </div>
      </div>
      <ExchangeTooltip show={show} setShow={setShow} info={exchange.info} />
    </div>
  )
}

export default MigrationItem
