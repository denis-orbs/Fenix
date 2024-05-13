'use client'
import { useState } from 'react'
import Steps from '../Common/Steps'
import LockTokens from './LockTokens'
import MyLocks from './MyLocks'
import Nest from './Nest'
import { LOCK_STEPS, FILTER_OPTIONS, LOCKS } from './data'
import Filter from '../Common/Filter'
import Search from '../Common/Search'
import CreateLock from './CreateLock/CreateLock'
import MylocksMobile from './Mobile/MylocksMobile'
import NestMobile from './Mobile/NestMobile'

const Lock = () => {
  const [changeState, setChangeState] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState('ACTIVE')

  const LOCKS_FILTER = LOCKS.filter((lock) => lock.TYPE === currentTab.toUpperCase())

  return (
    <>
      {changeState ? (
        <div className="flex flex-col items-center py-10 ">
          <div className="box-notification p-5  justify-between rounded-lg w-2/5 mb-5 me-20 hidden xl:flex">
            <div className="flex items-center gap-2 w-2/3 ">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
                <span className="inline-block text-2xl text-gradient icon-bell"></span>
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
        <section>
          <div className="flex flex-col items-center gap-5 py-5 xl:flex-row mb-4 overflow-hidden">
            <div className="w-full xl:w-2/3">
              <LockTokens changeState={changeState} setChangeState={setChangeState} />
            </div>
            <div className="w-full xl:w-1/3 self-auto">
              <Steps steps={LOCK_STEPS} />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <h5 className="lg:text-2xl text-lg text-white">Locks</h5>
          </div>
          <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
            <div className="w-full xl:w-2/3">
              <Filter options={FILTER_OPTIONS} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </div>
            <div className="w-full xl:w-1/3">
              <Search searchValue="" setSearchValue={() => {}} />
            </div>
          </div>
          <MyLocks Locks={LOCKS_FILTER} />
          <MylocksMobile Locks={LOCKS} />
          <div>
            <h5 className="lg:text-2xl text-lg text-white py-5">Nest</h5>
            <Nest />
            <NestMobile />
          </div>
        </section>
      )}
    </>
  )
}

export default Lock
