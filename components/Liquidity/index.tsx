'use client'

import Image from 'next/image'
import { Button } from '@/components/UI'

const Liquidity = () => {
  return (
    <div className="flex gap-5 items-center">
      <div className="bg-shark-400 bg-opacity-40 w-[50%] h-[602px] p-12 flex flex-col items-center justify-center">
        <div className="w-full flex items-center gap-4">
          <div className="w-1/2">
            <h4 className="mb-3 text-xl text-white">Liquidity</h4>
            <p className="text-shark-100 text-sm mb-4">
              Liquidity Providers (LPs) make low-slippage swaps posibble. Deposit and Stake liquidity to earn FNX.
            </p>
            <div className="flex gap-2 mb-8">
              <Button>
                <div className="flex gap-2">
                  <span className="icon-send"></span>
                  Deposit Liquidity
                </div>
              </Button>
              <Button variant="default">Claim Earnings</Button>
            </div>
            <p className="text-shark-100 text-sm mb-4 gap-3 flex items-center">
              <span className="icon-send text-lg inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              There are currently 54 tokens listed.
            </p>
            <div className="flex items-center gap-3">
              <p className="text-shark-100 text-sm mb-8 gap-3 flex items-center">
                <span className="icon-link text-lg"></span>
                View Tokens
              </p>
              <p className="text-shark-100 text-sm mb-8 gap-3 flex items-center">
                <span className="icon-link text-lg"></span>
                List New Token
              </p>
            </div>
          </div>
          <div className="flex-col flex w-1/2">
            <div className="flex gap-3 items-center p-3 border border-shark-400 mb-3">
              <div className="bg-shark-400 bg-opacity-40 rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                <span className="text-xl icon-lock inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              </div>
              <div className="fw">
                <h5 className="text-xs text-shark-100">Total Value Locked</h5>
                <p className="text-white">$92,833,342</p>
              </div>
            </div>
            <div className="flex gap-3 items-center p-3 border border-shark-400 mb-3">
              <div className="bg-shark-400 bg-opacity-40 rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                <span className="text-xl icon-lock inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              </div>
              <div className="fw">
                <h5 className="text-xs text-shark-100">Total Value Locked</h5>
                <p className="text-white">$92,833,342</p>
              </div>
            </div>
            <div className="flex gap-3 items-center p-3 border border-shark-400">
              <div className="bg-shark-400 bg-opacity-40 rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                <span className="text-xl icon-lock inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              </div>
              <div className="fw">
                <h5 className="text-xs text-shark-100">Total Value Locked</h5>
                <p className="text-white">$92,833,342</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Liquidity
