'use client'

import MyLocks from '@/components/Lock/MyLocks'
import Nest from '@/components/Lock/Nest'
import { Button } from '@/components/UI'
import HeaderRowVote from '@/components/Vote/Tables/HeaderRowVote'
import { DATA_ROW } from '@/components/Liquidity/data'
import NestMobile from '@/components/Lock/Mobile/NestMobile'
import MylocksMobile from '@/components/Lock/Mobile/MylocksMobile'
import HeaderRow from '@/components/Liquidity/Tables/HeaderRow'

import StrategiesDCA from '@/components/Dashboard/StrategiesDCA'
import MyStrategies from '@/components/Dashboard/MyStrategies'

const ActiveDashboard = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between mb-2 ">
          <h1 className="text-white text-xl">Liquidity Positions</h1>
          <Button variant="tertiary" className="!py-3">
            <span className="icon-logout"></span>New deposit
          </Button>
        </div>
        <div className="bg-shark-400 bg-opacity-40">
          <div className=" p-5 rounded-lg">
            <h1 className="text-white p-3">Classic liquidity</h1>
            <HeaderRow
              titleHeader="In Wallet"
              titleHeader2="Emissions"
              titleButton="claim"
              titleButton2="Manage"
              activePagination={false}
              activeRange={false}
              filterData={DATA_ROW.filter((f) => f.type !== 'CONCENTRATED')}
              loading={false}
            />

            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>

          <div className="p-5 rounded-lg">
            <h1 className="text-white p-3">Concentrated Liquidity</h1>

            <HeaderRow
              titleHeader="In Wallet"
              titleHeader2="Emissions"
              titleButton="claim"
              titleButton2="Manage"
              activePagination={false}
              filterData={DATA_ROW.filter((f) => f.type === 'CONCENTRATED')}
              loading={false}
            />

            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between mb-2">
          <h1 className="text-white text-xl">Locks</h1>
          <Button variant="tertiary" className="!py-3">
            <span className="icon-logout"></span>New deposit
          </Button>
        </div>
        <div className="bg-shark-400 bg-opacity-40 p-5 rounded-lg">
          <MyLocks activePagination={false} />
          <MylocksMobile activePagination={false} />
          <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
            Ver mas
            <span className="icon-link"></span>
          </Button>
        </div>
      </div>


      <div className="mt-10 ">
        <div className="flex justify-between mb-2">
          <h1 className="text-white text-xl">Nest</h1>
        </div>
        <div className="bg-shark-400 bg-opacity-40 p-5 rounded-lg">
          <Nest activePagination={false} />
          <NestMobile activePagination={false} />
          <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
            Ver mas
            <span className="icon-link"></span>
          </Button>
        </div>
      </div>

      <div className="my-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-white text-xl">Voting Rewards</h1>
        </div>
        <div className="bg-shark-400 bg-opacity-40 p-5 rounded-lg">
          <HeaderRowVote
            activeSlider={false}
            activeVote={false}
            activePagination={false}
            filterData={DATA_ROW}
            loading={false}
          />
          <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
            Ver mas
            <span className="icon-link"></span>
          </Button>
        </div>
      </div>
      <MyStrategies />
      <StrategiesDCA />
    </div>
  )
}

export default ActiveDashboard
