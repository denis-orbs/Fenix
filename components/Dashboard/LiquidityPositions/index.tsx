'use client'

import { Button } from '@/components/UI'
import HeaderRow from '@/components/Liquidity/Tables/HeaderRow'

import { PROPS_CLASSIC_LIQUIDITY, PROPS_CONCENTRATED_LIQUIDITY, } from '../types'

const LiquidityPositions = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-white text-xl">Liquidity Positions</h1>
        <Button variant="tertiary" className="!py-3">
          <span className="icon-logout"></span>New deposit
        </Button>
      </div>
      <div className="dashboard-box">
        <div className="  rounded-lg z-10">
          <h1 className="text-white p-3">Classic liquidity</h1>
          <HeaderRow {...PROPS_CLASSIC_LIQUIDITY} />
          <Button variant="tertiary" className="!py-3 flex gap-2 mt-2">
            Ver mas
            <span className="icon-link"></span>
          </Button>
        </div>

        <div className="rounded-lg z-10">
          <h1 className="text-white p-3">Concentrated Liquidity</h1>
          <HeaderRow {...PROPS_CONCENTRATED_LIQUIDITY} />
          <Button variant="tertiary" className="!py-3 flex gap-2">
            Ver mas
            <span className="icon-link"></span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LiquidityPositions
