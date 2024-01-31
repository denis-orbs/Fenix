'use client'

import { Button, BigBox } from '@/components/UI'

const Deposit = () => {
  return (
    <BigBox>
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2">
          <h4 className="mb-3 text-xl text-white">Liquidity</h4>
          <p className="mb-4 text-sm text-shark-100">
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
          <p className="flex items-center gap-3 mb-4 text-sm text-shark-100">
            <span className="inline-block text-lg text-transparent icon-send bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            There are currently 54 tokens listed.
          </p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-3 mb-8 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              View Tokens
            </p>
            <p className="flex items-center gap-3 mb-8 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              List New Token
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-auto px-8">
          <div className="w-[384px] h-[97px] flex gap-3 items-center p-3 box-medium mb-3">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
              <span className="inline-block text-2xl text-transparent icon-lock bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="fw">
              <h5 className="text-xs text-shark-100">Total Value Locked</h5>
              <p className="text-white">$92,833,342</p>
            </div>
          </div>
          <div className="w-[384px] h-[97px] flex gap-3 items-center p-3 box-medium mb-3">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
              <span className="inline-block text-2xl text-transparent icon-pig bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="fw">
              <h5 className="text-xs text-shark-100">Fees</h5>
              <p className="text-white">$64,789,445.82</p>
            </div>
          </div>
          <div className="w-[384px] h-[97px] flex gap-3 items-center p-3 box-medium">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
              <span className="inline-block text-2xl text-transparent icon-coins bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="fw">
              <h5 className="text-xs text-shark-100">Volume</h5>
              <p className="text-white">$48,680,765.44</p>
            </div>
          </div>
          <div className="absolute flex items-center justify-end gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 -bottom-10 right-16">
            <span className="icon-discord"></span>
            <p className="text-sm">Need help?</p>
          </div>
        </div>
      </div>
    </BigBox>
  )
}

export default Deposit
