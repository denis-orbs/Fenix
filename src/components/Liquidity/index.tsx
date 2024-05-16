'use client'

import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import Steps from '@/src/components/Common/Steps'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import { useAllPools } from '@/src/state/liquidity/hooks'
import { BasicPool } from '@/src/state/liquidity/types'
import { useEffect, useState, useMemo } from 'react'
import HeaderRow from './Tables/LiquidityTable/HeaderRow'
import { OPTIONS_FILTER, STEPS } from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('ALL POOLS')
  const [searchValue, setSearchValue] = useState<string>('')
  // const [filteredPools, setFilteredPools] = useState<BasicPool[]>([])
  // console.log(filteredPools)
  const { loading, data: pools } = useAllPools()
  console.log('pools >> ', pools)

  const filteredPools:BasicPool[] = useMemo(() => {
    if (!pools) return []
    console.log('entrando a filteredPools')
    switch (currentTab) {
      case 'VOLATILE':
        return []  // Filtrar pools volátiles según tu lógica
      case 'STABLE':
        return []  // Filtrar pools estables según tu lógica
      case 'CONCENTRATED':
        return pools  // Filtrar pools concentrados según tu lógica
      case 'ALL POOLS':
      default:
        return pools
    }
  }, [currentTab, pools])

  const filteredPoolsData = useMemo(() => {
    console.log('entrando a filteredPoolsData')
    return filteredPools
      .filter(pool =>
        pool?.token0.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        pool?.token1.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort((a, b) => Number(b.totalValueLockedUSD) - Number(a.totalValueLockedUSD))
  }, [filteredPools, searchValue])

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
        <h5 className="text-lg mb-1 text-white max-xl:w-full    lg:flex-shrink-0">Liquidity Pools</h5>
        <div className='w-full'>
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
