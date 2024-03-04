'use client'

import { Button } from '@/components/UI'
import Nest from '@/components/Lock/Nest'
import NestMobile from '@/components/Lock/Mobile/NestMobile'
import INFO_API from '../data'

const MyNest = () => {
  return (
    <>
      {INFO_API.length !== 0 ? (
        <div className="mb-10">
          <div className="flex justify-between mb-4">
            <h1 className="text-white text-xl">Nest</h1>
          </div>
          <div className="dashboard-box rounded-lg">
            <div className="relative z-10">
              <Nest activePagination={false} />
              <NestMobile activePagination={false} />
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
          <div className="text-white flex justify-between items-center flex-wrap ">
            <p className="flex gap-3 text-lg ms-2">
              Nest <span className="icon-info"></span>
            </p>
            <Button variant="tertiary" className="flex gap-2 !py-2">
              <span className="icon-logout"></span>My strategies
            </Button>
          </div>
          <div className="box-dashboard p-6">
            <p className="text-white text-sm">No Nest found.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyNest
