'use client'

import Link from 'next/link'
import { Button } from '@/src/components/UI'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '@/src/components/Common/InfoBox'
import { EXCHANGE_LIST } from '../data'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useEffect, useState } from 'react'
import { fetchv2Factories, fetchv3Factories } from '@/src/state/liquidity/reducer'
import { v2FactoryData, v3FactoryData } from '@/src/state/liquidity/types'
// const [v2data, setV2Data] = useState<v2FactoryData[]>([])
// const [v3data, setV3Data] = useState<v3FactoryData[]>([])

const fetchData = async () => {
  const v2data = await fetchv2Factories()
  const v3data = await fetchv3Factories()

  if (v2data && v3data) {
    EXCHANGE_LIST[0].description =
      '$ ' + (Number(v2data[0].totalLiquidityUSD) + Number(v3data[0].totalValueLockedUSD)).toFixed(2).toString()
    EXCHANGE_LIST[1].description = '$ ' + Number(v3data[0].totalFeesUSD).toFixed(2).toString()
    EXCHANGE_LIST[2].description =
      '$ ' + (Number(v2data[0].totalVolumeUSD) + Number(v3data[0].totalVolumeUSD)).toFixed(2).toString()
    // setV2Data(v2data)
    // setV3Data(v3data)
  }
}

const LiquidityPools = () => {
  const [tokens, setTokens] = useState<Number>(0)

  const tokensData = async () => {
    setTokens((await fetchTokens()).length)
  }

  useEffect(() => {
    tokensData()
    fetchData()
  }, [])
  return (
    <MainBox>
      <div
        className="flex flex-col items-center justify-between
       w-full xl:flex-row relative z-10 xl:min-h-[350px]"
      >
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-xl text-white">Liquidity Pools</h4>
          <p className="mb-4 text-sm text-shark-100">
            Liquidity Providers (LPs) make low-slippage swaps possible. Deposit and Stake liquidity to earn FNX.
          </p>
          <div className="flex flex-col gap-2 mb-8 md:flex-row">
            <Button href="liquidity/deposit">
              <div className="flex gap-2">
                <span className="icon-send"></span>
                Create Position
              </div>
            </Button>
          </div>
          <p className="flex items-center gap-3 mb-4 text-sm text-shark-100">
            <span className="inline-block text-lg text-transparent icon-circles bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            There are currently {tokens.toString()} tokens listed.
          </p>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%]">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} hasTooltip={false} />
          ))}
        </div>
      </div>
      <div className="hidden xl:block text-shark-100 rounded-2xl xl:rounded-none relative z-10">
        <Link
          target="_blank"
          href="https://discord.com/invite/fenixfi"
          className="flex gap-3 justify-end cursor-pointer"
        >
          <span className="icon-discord"></span>
          <p className="me-10">Need some help?</p>
        </Link>
      </div>
    </MainBox>
  )
}

export default LiquidityPools
