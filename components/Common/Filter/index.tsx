'use client'

import { Button } from '@/components/UI'

const Filter = () => {
  return (
    <div className="flex items-center w-2/3 gap-5 p-3 box-large">
      <Button className="!py-2">All pools</Button>
      <Button variant="default" className="!py-2">
        All pools
      </Button>
      <Button variant="default" className="!py-1">
        CL Stable
      </Button>
      <Button variant="default" className="!py-1">
        CL Volatile
      </Button>
      <Button variant="default" className="!py-1">
        Stable
      </Button>
      <Button variant="default" className="!py-1">
        Volatile
      </Button>
    </div>
  )
}

export default Filter
