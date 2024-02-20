'use client'

import ProcessItem from '@/components/Trade/Common/TradeProcess/ProcessItem'
import { ProgressBar } from '@/components/UI'
import { IStep } from '@/types'

interface TradeProcessProps {
  title: string
  steps: IStep[]
}

const TradeProcess = ({ title, steps }: TradeProcessProps) => {
  return (
    <div className="relative mb-10">
      <div className="flex items-center justify-between">
        <h5 className="mb-4 text-lg text-white">{title} Process</h5>
        <ProgressBar progress={20} />
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
