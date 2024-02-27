'use client'
import { useEffect, useState } from 'react'
import Deposit from '@/components/Liquidity/LiquidityPools'
import Steps from '@/components/Common/Steps'
import Filter from '@/components/Common/Filter'
import Search from '@/components/Common/Search'
import { STEPS } from './data'
import { OPTIONS_FILTER } from './data'
import { DATA_ROW } from './data'
import HeaderRow from './Tables/HeaderRow'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>('CONCENTRATED')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const filterData = currentTab !== 'ALL POOLS' ? DATA_ROW.filter((row) => row.type === currentTab) : DATA_ROW

  return (
    <section>
      <div className="flex flex-col items-center gap-5 py-5 2xl:flex-row">
        <div className="w-full 2xl:w-3/4">
          <Deposit />
        </div>
        <Steps steps={STEPS} />
      </div>
      <h5 className="mb-4 text-lg text-white">Liquidity Pools</h5>
      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter options={OPTIONS_FILTER} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="w-full xl:w-1/3">
          <Search />
        </div>
      </div>
      <HeaderRow loading={loading} filterData={filterData} />
    </section>
  )
}

export default Liquidity
