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
import MylocksMobile from './Mobile/MylocksMobile'
import NestMobile from './Mobile/NestMobile'
const Lock = () => {
  const [changeState, setChangeState] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState("Everything")
  return (
    <>
      {changeState ? (
        <div className="flex flex-col items-center py-10 px-20">
          <div className="box-notification p-5  justify-between rounded-lg w-2/5 mb-5 me-20 hidden xl:flex">
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
        <section className="">
          <div className="flex flex-col items-center gap-5 py-5 2xl:flex-row mb-4">
            <div className="w-full 2xl:w-3/4">
              <LockTokens changeState={changeState} setChangeState={setChangeState} />
            </div>
            <Steps steps={LOCK_STEPS} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <h5 className="text-xl text-white">Locks</h5>
          </div>
          <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
            <div className="w-full xl:w-2/3">
              <Filter options={FILTER_OPTIONS} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </div>
            <div className="w-full xl:w-1/3">
              <Search />
            </div>
          </div>
          <div className="lg:hidden">
            <MylocksMobile />
            <NestMobile/>
          </div>
          <div className="hidden w-full mb-20 lg:flex lg:flex-col">
            <MyLocks />
            <Nest />
          </div>
        </section>
      )}
    </>
  )
}

export default Lock
