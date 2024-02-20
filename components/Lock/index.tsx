'use client'
import Steps from '../Common/Steps'
import LockTokens from './LockTokens'
import MyLocks from './MyLocks'
import Nest from './Nest'
import { LOCK_STEPS } from './data'
import Filter from '../Common/Filter'
import Search from '../Common/Search'
import { FILTER_OPTIONS } from './data'
import { useState } from 'react'
import CreateLock from './CreateLock/CreateLock'
const Lock = () => {
  const [changeState, setChangeState] = useState<boolean>(false)

  return (
    <>
      {changeState ? (
        <div className='flex justify-center items-center py-10'>
        <CreateLock />
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
