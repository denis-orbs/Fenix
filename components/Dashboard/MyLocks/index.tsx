'use client'

import { Button } from '@/components/UI'
import Locks from '@/components/Lock/MyLocks'
import MylocksMobile from '@/components/Lock/Mobile/MylocksMobile'
import { LOCKS } from '@/components/Lock/data'
const MyLocks = () => {
  const MYLOCKS_INFO_API = ["TEST"]
  return (
    <>
      {MYLOCKS_INFO_API.length !== 0 ? (
        <div className="mb-10">
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-white text-xl">Locks</h1>
            <Button variant="tertiary" className="!py-3">
              <span className="icon-logout"></span>New deposit
            </Button>
          </div>
          <div className="dashboard-box rounded-lg">
            <div className="relative z-10">
              <Locks Locks={LOCKS} activePagination={false} />
              <MylocksMobile activePagination={false} Locks={LOCKS} />
              <div className="mt-2">
                <Button variant="tertiary" className="!py-3 flex gap-2">
                  Review more
                  <span className="icon-link"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">
              Locks <span className="icon-info"></span>
            </p>
          </div>
          <div className="box-dashboard p-6">
            <p className="text-white text-sm">To receive incentives and fees create a lock and vote with it.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyLocks
