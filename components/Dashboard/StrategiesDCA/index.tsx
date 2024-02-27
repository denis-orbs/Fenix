
'use client'

import { Button } from '@/components/UI'
import StrategiesItem from '@/components/Dashboard/StrategiesDCA/StrategiesItem'

const StrategiesDCA = () => {

  return (
    <div className="bg-shark-400 bg-opacity-40 p-10 rounded-2xl flex items-center justify-between gap-4">
      <div className="relative w-full">
        <div className="text-lg text-white mb-2">Active DCAs:</div>
        <StrategiesItem />
        <StrategiesItem />
        <Button variant="tertiary" className="gap-2 !py-3 !text-xs">
          Ver más
          <span className="icon-link"></span>
        </Button>
      </div>
      <div className="relative w-full">
        <div className="text-lg text-white mb-2">Past DCAs:</div>
        <StrategiesItem />
        <StrategiesItem />
        <Button variant="tertiary" className="gap-2 !py-3 !text-xs">
          Ver más
          <span className="icon-link"></span>
        </Button>
      </div>
    </div>
  )
}

export default StrategiesDCA
