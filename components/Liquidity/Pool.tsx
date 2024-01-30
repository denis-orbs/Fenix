'use client'

import Search from '@/components/Common/Search'
import Filter from '@/components/Common/Filter'

const Pool = () => {
  return (
    <div className="relative">
      <h5 className="mb-4 text-lg text-white">Liquidity Pools</h5>
      <div className="flex items-center justify-between gap-10">
        <Filter />
        <Search />
      </div>
    </div>
  )
}

export default Pool
