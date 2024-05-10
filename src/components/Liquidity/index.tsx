'use client'

import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import Steps from '@/src/components/Common/Steps'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import { useAllPools } from '@/src/state/liquidity/hooks'
import { BasicPool } from '@/src/state/liquidity/types'
import { useEffect, useState } from 'react'
import HeaderRow from './Tables/LiquidityTable/HeaderRow'
import { OPTIONS_FILTER, STEPS } from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('ALL POOLS')
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredPools, setFilteredPools] = useState<BasicPool[]>([])
  const { loading, data: pools } = useAllPools()

  useEffect(() => {
    if (pools && pools?.length > 0) {
      if (currentTab === 'VOLATILE') {
        // fix filter. user the type of position pool in BasicPool interface
        setFilteredPools([])
      } else if (currentTab === 'STABLE') {
        setFilteredPools([])
      } else if (currentTab === 'CONCENTRATED') {
        setFilteredPools(pools)
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
      <div className="flex flex-col items-center gap-5 py-5 xl:flex-row">
        <div className="w-full xl:w-2/3">
          <Deposit />
        </div>
        <div className="w-full xl:w-1/3 self-auto">
          <Steps steps={STEPS} title="Start Now" />
        </div>
      </div>

      <h5 className="mb-4 text-lg lg:text-2xl text-white">Liquidity Pools</h5>
      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter options={OPTIONS_FILTER} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="w-full xl:w-1/3">
          <Search setSearchValue={setSearchValue} searchValue={searchValue} placeholder="Search by symbol" />
        </div>
      </div>
      <HeaderRow loading={loading} poolsData={filteredPoolsData} />
    </section>
  )
}

export default Liquidity
