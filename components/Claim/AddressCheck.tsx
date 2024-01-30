'use client'

import { Button } from '@/components/UI'
import useStore from '@/store'

const AddressCheck = () => {
  const isConnected = useStore((state) => state.isConnected)
  return (
    <div className="flex items-center justify-between w-2/3 px-5 py-3 box-large">
      <div className="flex items-center gap-5">
        <p className="text-sm text-shark-100">Wallet Address</p>
        {}
        <span className="px-3 py-1 text-sm border rounded-lg text-shark-100 bg-shark-400 border-shark-300">
          {isConnected ? '0x878dfbs83fabc3x97d3469743d4E7' : '-'}
        </span>
      </div>
      <Button className="!py-2">Check</Button>
    </div>
  )
}

export default AddressCheck
