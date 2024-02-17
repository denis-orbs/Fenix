'use client'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Common/Steps'
import Filter from '../Common/Filter'
import Search from '../Common/Search'

import { STEPS } from './data'
import Concentrated from '@/components/Liquidity/Tables/Concentrated'
import Stable from './Tables/Stable'
import Volatile from './Tables/Volatile'

const Liquidity = () => {
  return (
    <section className="my-5 xl:my-10">
      <div className="flex items-center gap-10 justify-around flex-col xl:flex-row mb-10 xl:h-[450px]">
        <Deposit />
        <Steps steps={STEPS} />
      </div>
      <h5 className="mb-4 text-lg text-white">Liquidity Pools</h5>
      
      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter />
        <div className="xl:w-1/3">
          <Search />
        </div>
      </div>
      <h1 className='text-white text-4xl text-center'>Concentrated</h1>
      <Concentrated />
      <h1 className='text-white text-4xl text-center'>Stable</h1>

      <Stable/>
      <h1 className='text-white text-4xl text-center'>Volatile</h1>

      <Volatile/>
    </section>
  )
}

export default Liquidity
