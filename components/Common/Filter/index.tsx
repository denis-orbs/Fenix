'use client'

import { Button } from '@/components/UI'

const Filter = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center gap-2 px-3 py-2 rounded-lg justify-start md:gap-5 w-full xl:w-2/3 bg-shark-400 bg-opacity-40">
      <Button className="h-[40px] md:h-auto w-full xl-w-auto">All pools</Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        CL Stable
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        CL Volatile
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        Stable
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto w-full xl-w-auto">
        Volatile
      </Button>
    </div>
  )
}

export default Filter
