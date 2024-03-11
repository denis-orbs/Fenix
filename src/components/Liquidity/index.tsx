'use client'
import { useEffect, useState } from 'react'
import Deposit from '@/src/components/Liquidity/LiquidityPools'
import Steps from '@/src/components/Common/Steps'
import Filter from '@/src/components/Common/Filter'
import Search from '@/src/components/Common/Search'
import { STEPS } from './data'
import { OPTIONS_FILTER } from './data'
import { DATA_ROW } from './data'
import HeaderRow from './Tables/HeaderRow'
import { useV2PairsData } from '@/src/state/liquidity/hooks'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('STABLE')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const filterData = currentTab !== 'ALL POOLS' ? DATA_ROW.filter((row) => row.type === currentTab) : DATA_ROW

  const { loading: loadingV2Pairs, data: v2PairsData } = useV2PairsData()

  return (
    <section>
      <div className="flex flex-col items-center gap-5 py-5 2xl:flex-row">
        <div className="w-full 2xl:w-3/4">
          <Deposit />
        </div>
        <Steps steps={STEPS} />
      </div>
      <h5 className="mb-4 text-lg lg:text-2xl text-white">Liquidity Pools</h5>
      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter options={OPTIONS_FILTER} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="w-full xl:w-1/3">
          <Search />
        </div>
      </div>
      <HeaderRow loading={loadingV2Pairs} filterData={filterData} />
    </section>
  )
}

export default Liquidity
