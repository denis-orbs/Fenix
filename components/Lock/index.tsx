'use client'

import { useState } from 'react'

import Steps from '../Common/Steps'
import LockTokens from './LockTokens'
import MyLocks from './MyLocks'
import Nest from './Nest'
import { LOCK_STEPS, FILTER_OPTIONS } from './data'
import Filter from '../Common/Filter'
import Search from '../Common/Search'
import CreateLock from './CreateLock/CreateLock'
const Lock = () => {
  const [changeState, setChangeState] = useState<boolean>(false)

  return (
    <>
      {changeState ? (
        <div className="flex flex-col items-center py-10">
          <div className="box-notification p-5  justify-between rounded-lg w-2/5 mb-5 me-20 xl:block hidden xl:flex ">
            <div className="flex items-center gap-2 w-2/3 ">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
                <span className="inline-block text-2xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-bell"></span>
              </div>
              <p className="text-shark-100 text-xs">
                Create a Lock for more than 2 years and enjoy the benefits of our APR Performance.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-shark-100 text-xs">Current APR</p>
              <p className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                0.00%
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <CreateLock />
          </div>
        </div>
      ) : (
        <section className="p-5 py-20">
          <div className="flex items-center gap-6  flex-col xl:flex-row mb-10 xl:h-[450px]">
            <LockTokens changeState={changeState} setChangeState={setChangeState} />
            <Steps steps={LOCK_STEPS} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <h5 className="text-xl text-white">My Locks</h5>
            <span className="text-xl text-white icon-info"></span>
          </div>
          <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
            <Filter options={FILTER_OPTIONS} currentTab={''} setCurrentTab={() => {}} />
            <Search />
          </div>
          <div className="hidden w-full mb-20 xl:block">
            <MyLocks />
          </div>
          <div className="hidden w-full xl:block">
            <Nest />
          </div>
        </section>
      )}
    </>
  )
}

export default Lock
