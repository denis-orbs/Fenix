'use client'

import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import Steps from '@/src/components/Common/Steps'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import { useAllPools } from '@/src/state/liquidity/hooks'
import { BasicPool } from '@/src/state/liquidity/types'
import { useEffect, useState } from 'react'
import HeaderRow from './Tables/LiquidityTable/HeaderRow'
import GoldRushBanner from '@/src/components/Common/GoldRushBanner'
import Image from 'next/image'
import {
  BLAST_NATIVE_POOLS,
  BLUE_CHIPS_POOLS,
  LRTS_POOLS,
  MEMES_POOLS,
  OPTIONS_FILTER,
  STABLES_POOLS,
  CLASSIC,
  STEPS,
} from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('ALL')
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredPools, setFilteredPools] = useState<BasicPool[]>([])
  //
  const { loading, data: pools } = useAllPools()
  useEffect(() => {
    if (pools && pools?.length > 0) {
      if (currentTab === 'BLUE CHIPS') {
        const combinedPools = pools.filter((pool: BasicPool) => BLUE_CHIPS_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'LST/LRT') {
        const combinedPools = pools.filter((pool: BasicPool) => LRTS_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'STABLES') {
        const combinedPools = pools.filter((pool: BasicPool) => STABLES_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'MEMES') {
        const combinedPools = pools.filter((pool: BasicPool) => MEMES_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'BLAST NATIVE') {
        const combinedPools = pools.filter((pool: BasicPool) => BLAST_NATIVE_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'CLASSIC') {
        const combinedPools = pools.filter((pool: BasicPool) => CLASSIC.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else {
        setFilteredPools(pools)
      }
    }
  }, [currentTab, pools])

  const filteredPoolsData = filteredPools
    .filter(
      (pool) =>
        pool?.token0.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        pool?.token1.symbol.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      return Number(b.totalValueLockedUSD) - Number(a.totalValueLockedUSD)
    })
  return (
    <section className="pt-5">
      <div className="flex flex-col items-center overflow-hidden gap-5 py-5 xl:flex-row">
        <div className="w-full xl:w-2/3 ">
          <Deposit />
        </div>
        <div className="w-full xl:w-1/3 self-auto">
          <Steps steps={STEPS} title="Start Now" />
        </div>
      </div>
      <GoldRushBanner />
      <div className="flex flex-col justify-between gap-5 mb-4 md:items-center xl:flex-row overflow-hidden mt-5">
        <h5 className="text-lg mb-1 text-white max-xl:w-full lg:flex-shrink-0">Liquidity Pools</h5>
        <div className="2xl:max-w-[70%] xl:max-w-[65%]  w-full">
          <Filter options={OPTIONS_FILTER} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
        <div className="w-full xl:w-1/3">
          <Search setSearchValue={setSearchValue} searchValue={searchValue} placeholder="Search by symbol" />
        </div>
      </div>
      <HeaderRow loading={loading} poolsData={filteredPoolsData} />
    </section>
  )
}

export default Liquidity
