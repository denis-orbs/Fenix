'use client'

import { Button } from '@/components/UI'
import HeaderRow from '@/components/Liquidity/Tables/HeaderRow'
import { PROPS_CLASSIC_LIQUIDITY, PROPS_CONCENTRATED_LIQUIDITY } from '../types'

const LiquidityPositions = () => {
  const LIQUIDITY_INFO_API = ["TEST"]
  return (
    <>
      {LIQUIDITY_INFO_API.length !== 0 ? (
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
              <div className="mt-2">
                <Button variant="tertiary" className="!py-3 flex gap-2">
                  Review more
                  <span className="icon-link"></span>
                </Button>
              </div>
            </div>

            <div className="rounded-lg z-10">
              <h1 className="text-white p-3">Concentrated Liquidity</h1>
              <HeaderRow {...PROPS_CONCENTRATED_LIQUIDITY} />
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
        
          <div className="flex flex-col   gap-3 w-full lg:w-4/5 mx-auto">
            <div className="text-white flex justify-between items-center flex-wrap">
              <p className="flex gap-3 text-lg ms-2">
                Liquidity Positions <span className="icon-info"></span>
              </p>
              <Button variant="tertiary" className="flex gap-2  !py-2">
                {' '}
                <span className="icon-logout "></span>New Deposit
              </Button>
            </div>
            <div className="box-dashboard p-6">
              <p className="text-white text-sm">
                To receive emissions <span className="text-green-400 underline">deposit and stake</span> your liquidity
                first.
              </p>
            </div>
          </div>
        
      )}
    </>
  )
}

export default LiquidityPositions
