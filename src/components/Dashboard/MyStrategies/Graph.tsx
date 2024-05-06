'use client'

import { useEffect, useState } from 'react'
import { Button, Switch } from '../../UI'
import { positions } from './Strategy'
import { formatAmount } from '@/src/library/utils/numbers'
import { getAlgebraPoolPrice } from '@/src/library/hooks/liquidity/useCL'
import cn from '@/src/library/utils/cn'

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

  const sqrtPrice = Math.pow(1.0001, 887220 / 2)
  // return Math.pow(sqrtPrice, 2)
  console.log(Math.pow(sqrtPrice, 2))

  /* price0 / 1e(token1.decimals - token0.decimals) */

  /* price0 * 1e(token0.decimals - token1.decimals) */

  const minPrice = parseFloat(tickLower?.price0) * 10 ** (Number(row?.token0?.decimals) - Number(row?.token1?.decimals))
  const maxPrice = parseFloat(tickUpper?.price0) * 10 ** (Number(row?.token0?.decimals) - Number(row?.token1?.decimals))
  const minPriceIsZero = minPrice < 1e-5
  const maxPriceIsInfinity = maxPrice > 1e12
  const [poolGlobalState, setPoolGlobalState] = useState<{
    price: number
    currentTick: number
  }>({
    price: 0,
    currentTick: 0,
  })
  const getPoolCurrentState = async () => {
    const state = await getAlgebraPoolPrice(row?.token0?.id as `0x${string}`, row?.token1?.id as `0x${string}`)
    if (state) {
      setPoolGlobalState(state)
    }
  }
  useEffect(() => {
    getPoolCurrentState()
  }, [])

  const currentPoolPrice = Number(poolGlobalState?.price / 10 ** Number(row.token1.decimals)).toFixed(6)

  const isInRange =
    (minPrice < Number(currentPoolPrice) && maxPrice >= Number(currentPoolPrice)) || row.liquidity === 'ichi'

  return (
    <div className="w-full">
      <div className="flex items-start relative h-20">
        <div className="absolute h-full bottom-0 w-full flex items-end z-50">
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
            <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1 z-50">
              Position Managed by ichi
            </p>
          </>
        ) : (
          showtoken0 && (
            <>
              <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs z-[100] px-3 py-1 rounded-sm mx-auto mt-1">
                Min. Price: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0Symbol}/{token1Symbol}
              </p>

              <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs z-[100] px-3 py-1 rounded-sm mx-auto mt-1">
                Max. Price: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0Symbol}/{token1Symbol}
              </p>
            </>
          )
        )}
        {minPriceIsZero && maxPriceIsInfinity ? (
          <>
            <div className="absolute bottom-0 left-[8%] w-[84%] h-1/2 bg-gradient-to-b from-shark-400 to-green-500 border-x-2 border-green-500 opacity-30"></div>
          </>
        ) : (
          <div
            className={cn(
              'absolute bottom-0 left-[40%] w-[20%] h-1/2   border-x-2  opacity-30',
              isInRange
                ? 'border-green-500 bg-gradient-to-b from-shark-400 to-green-500'
                : 'border-red-500 to-red-500 bg-gradient-to-b from-shark-400'
            )}
          ></div>
        )}
        {isInRange && <div className="absolute bottom-0 left-[50%] w-[1px] h-1/2 bg-white"></div>}
      </div>
      <div className="flex items-center w-full justify-center px-10 border-t-2 border-shark-400">
        <p className="text-white text-xs">
          {isInRange ? <span className="text-green-400">In range</span> : 'Out of range'}
          <span>
            {currentPoolPrice !== '0' && !isNaN(Number(currentPoolPrice)) && <span> ({currentPoolPrice})</span>}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Graph
