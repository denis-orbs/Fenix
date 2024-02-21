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
        <div className="flex justify-center items-center py-10">
          <CreateLock />
        </div>
      ) : (
        <section className="">
          <div className="flex flex-col items-center gap-5 py-5 2xl:flex-row mb-4">
            <div className="w-full 2xl:w-3/4">
              <LockTokens changeState={changeState} setChangeState={setChangeState} />
            </div>
            <Steps steps={LOCK_STEPS} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <h5 className="text-xl text-white">My Locks</h5>
            <span className="text-xl text-white icon-info"></span>
          </div>
          <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
            <div className="w-full xl:w-2/3">
              <Filter options={FILTER_OPTIONS} currentTab={''} setCurrentTab={() => {}} />
            </div>
            <div className="w-full xl:w-1/3">
              <Search />
            </div>
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
