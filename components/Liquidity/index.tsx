'use client'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Common/Steps'
import Filter from '../Common/Filter'
import Search from '../Common/Search'
import { STEPS } from './data'
import Concentrated from '@/components/Liquidity/Tables/Concentrated'
import Stable from './Tables/Stable'
import Volatile from './Tables/Volatile'
import SingleTokenDeposit from './Tables/SingleTokenDeposit'
import { OPTIONS_FILTER } from './data'
import { useState } from 'react'

type TablesLiquidity = {
  [key: string]: React.ReactNode
}

const Liquidity = () => {
  const [tableChange, setTableChange] = useState<string>('concentrated')
  const TABLES_LIQUIDITY: TablesLiquidity = {
    concentrated: <Concentrated />,
    stable: <Stable />,
    volatile: <Volatile />,
    singletokendeposit: <SingleTokenDeposit />,
    allpools: '',
  }
  return (
    <section className="my-5 xl:my-10">
      <div className="flex items-center gap-10 justify-around flex-col xl:flex-row mb-10 xl:h-[450px]">
        <Deposit />
        <Steps steps={STEPS} />
      </div>
      <h5 className="mb-4 text-lg text-white">Liquidity Pools</h5>

      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter Options={OPTIONS_FILTER} tableChange={tableChange} setTableChange={setTableChange} />
        <div className="xl:w-1/3">
          <Search />
        </div>
      </div>
      <div className="hidden xl:block">
        {TABLES_LIQUIDITY[tableChange]}
      </div>
    </section>
  )
}

export default Liquidity
