'use client'

import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import Steps from '@/src/components/Common/Steps'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import { useV2PairsData } from '@/src/state/liquidity/hooks'
import { PoolData, v3PoolData } from '@/src/state/liquidity/types'
import { useEffect, useMemo, useState } from 'react'
import HeaderRow from './Tables/LiquidityTable/HeaderRow'
import { DATA_ROW, OPTIONS_FILTER, STEPS } from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('ALL POOLS')
  const [searchResults, setSearchResults] = useState<PoolData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const { loading: loadingV2Pairs, data: v2PairsData } = useV2PairsData()

  useEffect(() => {
    // console.log('Loading ', loading)
    // console.log('v2PairsData ', v2PairsData)
  }, [v2PairsData, loading])

  const poolsData = useMemo<PoolData[]>(() => {
    if (loading || !v2PairsData) {
      return []
    }

    return v2PairsData.map((pair) => {
      const pd: PoolData = {
        pairDetails: pair,
      }

      return pd
    })
  }, [loading, loadingV2Pairs, v2PairsData])

  useEffect(() => {
    setSearchResults(poolsData)
  }, [poolsData])

  useEffect(() => {
    if (poolsData && poolsData.length > 0) {
      if (currentTab === 'VOLATILE') {
        const poolData = poolsData.filter(
          (row) => !row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool'
        )
        // console.log('inn1')
        setSearchResults(poolData)
      } else if (currentTab === 'STABLE') {
        const poolData = poolsData.filter(
          (row) => row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool'
        )
        // console.log('inn2')
        setSearchResults(poolData)
      } else if (currentTab === 'CONCENTRATED') {
        const poolData = poolsData.filter((row) => row.pairDetails.pairSymbol === 'Concentrated pool')
        setSearchResults(poolData)
        // console.log('inn3')
      } else {
        // console.log('inn4')
        setSearchResults(poolsData)
      }
    }
  }, [currentTab, poolsData])

  const filteredPoolsData = searchResults.filter((pool) =>
    pool?.pairDetails?.token0Symbol.toLowerCase().includes(searchValue.toLowerCase())
  )

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
      <HeaderRow loading={loadingV2Pairs} poolsData={filteredPoolsData} />
    </section>
  )
}

export default Liquidity
