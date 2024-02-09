import React from 'react'
import ExchangeRate from './ExchangeRate'
import Slippage from './Slippage'
import AmountReceived from './AmountReceived'
import PriceSafe from './PriceSafe'
import AllowFNX from './AllowFNX'

const HowToSwap = () => {
  return (
    <div className="w-full my-5 xl:w-[45%] md:m-0">
      <div className="flex flex-col justify-center w-full">
        <h4 className="w-full mb-3 text-xl text-white">How to Swap</h4>
        <div className="relative flex flex-col w-auto">
          <ExchangeRate />
          <Slippage />
          <AmountReceived />
          <PriceSafe />
          <AllowFNX />
        </div>
      </div>
    </div>
  )
}

export default HowToSwap
