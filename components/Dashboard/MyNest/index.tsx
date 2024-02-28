'use client'

import { Button } from '@/components/UI'
import Nest from '@/components/Lock/Nest'
import NestMobile from '@/components/Lock/Mobile/NestMobile'

const MyNest = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-white text-xl">Nest</h1>
      </div>
      <div className="dashboard-box rounded-lg">
        <div className="relative z-10">
          <Nest activePagination={false} />
          <NestMobile activePagination={false} />
          <div>
            <Button variant="tertiary" className="!py-3 flex gap-2">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyNest
