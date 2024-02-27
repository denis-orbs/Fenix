'use client'

import { Button } from '@/components/UI'
import StepBox from '@/components/Common/Boxes/StepBox'

const MyStrategies = () => {
  return (
    <div className="dashboard-box mb-10">
      <div className="flex items-center">
        <StepBox>
          <div className="min-h-[400px]">
            <div className="relative text-white">HERODES</div>
            <div className="relative text-white">SANJI</div>
          </div>
        </StepBox>
      </div>
    </div>
  )
}

export default MyStrategies
