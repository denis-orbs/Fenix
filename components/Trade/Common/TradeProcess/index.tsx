'use client'

import ProcessItem from './ProcessItem'
import { PROCESS_LIST } from '../../data'

const TradeProcess = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="mb-4 text-2xl font-medium text-white">Trade Process</h5>
        <div className="h-[5px] w-[200px] bg-shark-400 flex rounded-lg overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-outrageous-orange-500 to-chilean-fire-500"></div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 xl:flex-nowrap">
        {PROCESS_LIST.map((process, index) => (
          <ProcessItem key={index} process={process} />
        ))}
      </div>
    </div>
  )
}

export default TradeProcess
