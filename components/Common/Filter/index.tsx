'use client'

import { Button } from '@/components/UI'

const Filter = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-2 px-3 py-2 rounded-lg md:justify-start md:gap-5 md:w-2/3 bg-shark-400 bg-opacity-40 md:bg-none md:box-large">
      <Button className="h-[40px] md:h-auto">All pools</Button>
      <Button variant="default" className="h-[40px] md:h-auto">
        CL Stable
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto">
        CL Volatile
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto">
        Stable
      </Button>
      <Button variant="default" className="h-[40px] md:h-auto">
        Volatile
      </Button>
    </div>
  )
}

export default Filter
