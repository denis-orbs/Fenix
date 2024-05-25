'use client'

import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import Steps from '@/src/components/Common/Steps'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import { useAllPools } from '@/src/state/liquidity/hooks'
import { BasicPool } from '@/src/state/liquidity/types'
import { useEffect, useState } from 'react'
import HeaderRow from './Tables/LiquidityTable/HeaderRow'
import {
  BLAST_ECOSYSTEM_POOLS,
  BLUE_CHIPS_POOLS,
  GAMEFI_POOLS,
  LIQUIDITY_MANAGER_POOLS,
  MEMES_POOLS,
  OPTIONS_FILTER,
  STABLECOINS_POOLS,
  STAKED_RESTAKED_ETH_POOLS,
  STEPS,
} from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('ALL')
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredPools, setFilteredPools] = useState<BasicPool[]>([])
  // console.log(filteredPools)
  const { loading, data: pools } = useAllPools()

  useEffect(() => {
    if (pools && pools?.length > 0) {
      if (currentTab === 'LIQUIDITY MANAGER') {
        const combinedPools = pools.filter((pool: BasicPool) => LIQUIDITY_MANAGER_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'MEMES') {
        const combinedPools = pools.filter((pool: BasicPool) => MEMES_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'GAMEFI') {
        const combinedPools = pools.filter((pool: BasicPool) => GAMEFI_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'STAKED & RESTAKED ETH') {
        const combinedPools = pools.filter((pool: BasicPool) =>
          STAKED_RESTAKED_ETH_POOLS.includes(pool.id.toLowerCase())
        )
        setFilteredPools(combinedPools)
      } else if (currentTab === 'BLUE CHIPS') {
        const combinedPools = pools.filter((pool: BasicPool) => BLUE_CHIPS_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'STABLECOINS') {
        const combinedPools = pools.filter((pool: BasicPool) => STABLECOINS_POOLS.includes(pool.id.toLowerCase()))
        setFilteredPools(combinedPools)
      } else if (currentTab === 'BLAST ECOSYSTEM') {
        const combinedPools = pools.filter((pool: BasicPool) => BLAST_ECOSYSTEM_POOLS.includes(pool.id.toLowerCase()))
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
    <section>
      <div className="flex flex-col items-center overflow-hidden gap-5 py-5 xl:flex-row">
        <div className="w-full xl:w-2/3 ">
          <Deposit />
        </div>
        <div className="w-full xl:w-1/3 self-auto">
          <Steps steps={STEPS} title="Start Now" />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-5 mb-4 md:items-center xl:flex-row overflow-hidden">
        <h5 className="text-lg mb-1 text-white max-xl:w-full lg:flex-shrink-0">Liquidity Pools</h5>
        <div className="w-full">
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
