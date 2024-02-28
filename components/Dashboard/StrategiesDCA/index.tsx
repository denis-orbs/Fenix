'use client'

import { Button } from '@/components/UI'
import StrategiesItem from '@/components/Dashboard/StrategiesDCA/StrategiesItem'

const StrategiesDCA = () => {
  return (
    <div className="dashboard-box flex-col xl:flex-row">
      <div className="relative w-full z-10">
        <div className="text-lg text-white mb-2">Active DCAs:</div>
        {Array.from({ length: 4 }).map((_, index) => (
          <StrategiesItem key={index} />
        ))}
        <Button variant="tertiary" className="gap-2 !py-3 !text-xs">
          Ver más
          <span className="icon-link"></span>
        </Button>
      </div>
      <div className="relative w-full z-10">
        <div className="text-lg text-white mb-2">Past DCAs:</div>
        {Array.from({ length: 2 }).map((_, index) => (
          <StrategiesItem key={index} />
        ))}
        <Button variant="tertiary" className="gap-2 !py-3 !text-xs">
          Ver más
          <span className="icon-link"></span>
        </Button>
      </div>
    </div>
  )
}

export default StrategiesDCA
