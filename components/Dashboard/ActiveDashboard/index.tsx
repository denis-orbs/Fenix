'use client'
import MyLocks from '@/components/Lock/MyLocks'
import Nest from '@/components/Lock/Nest'
import { Button } from '@/components/UI'
import HeaderRowVote from '@/components/Vote/Tables/HeaderRowVote'
import NestMobile from '@/components/Lock/Mobile/NestMobile'
import MylocksMobile from '@/components/Lock/Mobile/MylocksMobile'
import HeaderRow from '@/components/Liquidity/Tables/HeaderRow'
import { PROPS_CLASSIC_LIQUIDITY, PROPS_CONCENTRATED_LIQUIDITY, PROPS_HEADER_ROW_VOTE } from './type.props'

const ActiveDashboard = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between mb-2 px-10 mt-10">
          <h1 className="text-white text-2xl">Liquidity Positions</h1>
          <Button variant="tertiary" className="!py-3">
            <span className="icon-logout"></span>New deposit
          </Button>
        </div>
        <div className="dashboard-box">
          <div className="  rounded-lg z-10">
            <h1 className="text-white p-3">Classic liquidity</h1>
            <HeaderRow {...PROPS_CLASSIC_LIQUIDITY} />
            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>

          <div className="rounded-lg z-10">
            <h1 className="text-white p-3">Concentrated Liquidity</h1>
            <HeaderRow {...PROPS_CONCENTRATED_LIQUIDITY} />
            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>
      {/* //// */}
      <div className="mt-10">
        <div className="flex justify-between mb-2 px-10">
          <h1 className="text-white text-2xl">Locks</h1>
          <Button variant="tertiary" className="!py-3">
            <span className="icon-logout"></span>New deposit
          </Button>
        </div>
        <div className="dashboard-box rounded-lg">
          <MyLocks activePagination={false} />
          <MylocksMobile activePagination={false} />
          <div>
            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>
      {/* //// */}
      <div className="mt-10">
        <div className="flex justify-between mb-2">
          <h1 className="text-white text-2xl">Nest</h1>
        </div>
        <div className="dashboard-box  rounded-lg">
          <Nest activePagination={false} />
          <NestMobile activePagination={false} />
          <div>
            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>
      {/* //// */}
      <div className="mt-10">
        <div className="flex justify-between mb-2">
          <h1 className="text-white text-2xl">Voting Rewards</h1>
        </div>
        <div className="dashboard-box ">
          <HeaderRowVote {...PROPS_HEADER_ROW_VOTE} />
          <div>
            <Button variant="tertiary" className="!py-3 flex gap-2 mt-4">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>
      {/* //// */}
    </div>
  )
}

export default ActiveDashboard
