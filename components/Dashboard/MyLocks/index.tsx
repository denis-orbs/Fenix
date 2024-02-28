'use client'

import { Button } from '@/components/UI'
import Locks from '@/components/Lock/MyLocks'
import MylocksMobile from '@/components/Lock/Mobile/MylocksMobile'

const MyLocks = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-white text-xl">Locks</h1>
        <Button variant="tertiary" className="!py-3">
          <span className="icon-logout"></span>New deposit
        </Button>
      </div>
      <div className="dashboard-box rounded-lg">
        <div className="relative z-10">
          <Locks activePagination={false} />
          <MylocksMobile activePagination={false} />
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

export default MyLocks
