'use client'

import { useState } from 'react'
import { Button, Switch } from '../../UI'
import { positions } from './Strategy'

type GraphProps = {
  row: positions
  tickLower: {
    price0: string
    price1: string
  }
  tickUpper: {
    price0: string
    price1: string
  }
  token1Symbol: string
  token0Symbol: string
}

const Graph = ({ row, tickLower, tickUpper, token0Symbol, token1Symbol }: GraphProps) => {
  const [showtoken0, setshowtoken0] = useState(true)

  const handlerSwitch = () => {
    setshowtoken0(!showtoken0)
  }

  return (
    <div className="w-full">
      <div className="flex items-start relative h-20">
        <div className="absolute h-full bottom-0 w-full flex items-end">
          <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
            0
          </p>
          {Array.from({ length: 30 }).map((_, index) => (
            <span key={index} className="h-5 w-5 border-l border-shark-300 block"></span>
          ))}

          <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
            ∞
          </p>
        </div>

        {row.liquidity === 'ichi' ? (
          <>
            <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
              Position Managed by ichi
            </p>
          </>
        ) : (
          showtoken0 && (
            <>
              <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
                Min. Price: {Number(tickLower?.price0) < 1e-5 ? 0 : Number(tickLower?.price0).toFixed(5)} {token0Symbol}
                /{token1Symbol}
              </p>

              <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
                Max. Price: {Number(tickUpper?.price0) > 1e12 ? '∞' : Number(tickUpper?.price0).toFixed(5)}{' '}
                {token0Symbol}/{token1Symbol}
              </p>
            </>
          )
        )}
        {/* {!showtoken0 && (
          <>
            <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
              Min. Price: {Number(tickLower?.price1) < 1e-5 ? 0 : Number(tickLower?.price1).toFixed(5)} {token1Symbol}/
              {token0Symbol}
            </p>

            <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">
              Max. Price: {Number(tickUpper?.price1) > 1e12 ? '∞' : Number(tickUpper?.price1).toFixed(5)} {token1Symbol}
              /{token0Symbol}
            </p>
          </>
        )} */}
        <div className="absolute bottom-0 left-[40%] w-[20%] h-1/2 bg-gradient-to-b from-shark-400 to-green-500 border-x-2 border-green-500 opacity-30"></div>
      </div>
      <div className="flex items-center w-full justify-between px-10 py-3 border-t-2 border-shark-400">
        {/* <p className="text-white text-xs">0.00</p>
        <p className="text-white text-xs">1,328.19</p>
        <p className="text-white text-xs">3,672.06</p>
        <p className="text-white text-xs">6,015.93</p> */}
      </div>
    </div>
  )
}

export default Graph
