'use client'

import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import Steps from '@/src/components/Common/Steps'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import { useV2PairsData } from '@/src/state/liquidity/hooks'
import { PoolData } from '@/src/state/liquidity/types'
import { useEffect, useMemo, useState } from 'react'
import HeaderRow from './Tables/LiquidityTable/HeaderRow'
import { DATA_ROW, OPTIONS_FILTER, STEPS } from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('STABLE')
  const [searchResults, setSearchResults] = useState<PoolData[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const { loading: loadingV2Pairs, data: v2PairsData } = useV2PairsData()

  const poolsData = useMemo<PoolData[]>(() => {
    if (loading) {
      return []
    }

    return v2PairsData.map((pair) => {
      const pd: PoolData = {
        pairDetails: pair,
      }

      return pd
    })
  }, [loading, v2PairsData])

  useEffect(() => {
    setSearchResults(poolsData)
  }, [poolsData])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value.length === 0) {
      setSearchResults(poolsData)
      return
    }

    const filteredPoolsData = poolsData.filter(pool => pool?.pairDetails?.token0?.symbol.toLowerCase().includes(value.toLowerCase()))

    setSearchResults(filteredPoolsData)
  }

  return (
    <section>
      <div className="flex flex-col items-center gap-5 py-5 2xl:flex-row">
        <div className="w-full 2xl:w-3/4">
          <Deposit />
        </div>
        <Steps steps={STEPS} title="Start Now" />
      </div>
      <h5 className="mb-4 text-lg lg:text-2xl text-white">Liquidity Pools</h5>
      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter options={OPTIONS_FILTER} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="w-full xl:w-1/3">
          <Search onChange={handleSearch} placeholder="Search by symbol" />
        </div>
      </div>
      <HeaderRow
        loading={loadingV2Pairs}
        poolsData={searchResults}
      />
    </section>
  )
}

export default Liquidity
