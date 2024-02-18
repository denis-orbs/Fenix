'use client'

import { Button } from '@/components/UI'

const Filter = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center gap-2 px-3 py-2 filter-box 
    rounded-lg justify-start md:gap-5 w-full xl:w-2/3  bg-opacity-40">
      <Button className="h-[40px] md:h-auto w-full xl-w-auto">Concentrated</Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto ">
       Stable
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        Volatile
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        Single Token Deposit
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        All Pools
      </Button>
    </div>
  )
}

export default Filter
