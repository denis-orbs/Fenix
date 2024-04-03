'use client'

import Image from 'next/image'

import { Button } from '@/src/components/UI'
import TopCurrentPosition from '@/src/components/Liquidity/MyPositions/Panel/TopCurrentPosition'
import Liquidity from '@/src/components/Liquidity/MyPositions/Panel/Liquidity'
import UnclaimedFees from '@/src/components/Liquidity/MyPositions/Panel/UnclaimedFees'

const Panel = () => {

  return (
    <section className="box-panel-trade">
      <div className="relative z-10 flex flex-col items-center justify-between w-full gap-12 xl:flex-row">
        <div className="relative w-full">
          <div className="flex items-center justify-between mb-5 font-semibold">
            <h4 className="text-lg font-medium text-white md:text-xl">My Manage Position</h4>
          </div>
          <p className="text-xs text-white mb-3">Current Position</p>

          <TopCurrentPosition />
          <Liquidity />
          <UnclaimedFees />

          <div className="flex items-center gap-3 mb-5 bg-shark-400 bg-opacity-40 p-3 rounded-lg">
            <Button className="w-full mx-auto !py-3" variant="secondary">
              Increase Liquidity
            </Button>
            <Button className="w-full mx-auto !py-3" variant="secondary">
              Remove Liquidity
            </Button>
          </div>

          <div className="relative mb-5">
            <p className="text-xs text-white mb-3">Price range</p>
            <div className="bg-shark-400 bg-opacity-40 p-5 rounded-lg">
              <div className="flex w-full gap-5 items-center mb-3">
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white mb-3">Min Price</p>
                    <p className="text-xs text-shark-100 mb-3">FNX per ETH</p>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="0"
                      className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white mb-3">Max Price</p>
                    <p className="text-xs text-shark-100 mb-3">FNX per ETH</p>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="0"
                      className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white mb-3">Current price</p>
                  <p className="text-xs text-shark-100 mb-3">FNX per ETH</p>
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="0"
                    className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel
