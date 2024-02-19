'use client'

import ProcessItem from './ProcessItem'
import { IStep } from '@/types'

interface TradeProcessProps {
  title: string
  steps: IStep[]
}

const TradeProcess = ({ title, steps }: TradeProcessProps) => {
  return (
    <div className="relative mb-10">
      <div className="flex items-center justify-between">
        <h5 className="mb-4 text-xl text-white">{title} Process</h5>
        <div className="h-[5px] w-[200px] bg-shark-400 flex rounded-lg overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-outrageous-orange-500 to-chilean-fire-500"></div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 xl:flex-nowrap">
        {steps.map((step, index) => (
          <ProcessItem key={index} step={step} />
        ))}
      </div>
    </div>
  )
}

export default TradeProcess
