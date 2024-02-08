/* eslint-disable import/no-default-export */
'use client'
import { Button } from '@/components/UI'

const AllowFNX = () => {
  return (
    <li className="flex justify-between gap-3 items-center p-3 mb-3 relative bg-shark-400 bg-opacity-40 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 p-3 rounded-lg bg-shark-400 bg-opacity-60">
          <span
            className={`inline-block text-xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-lock`}
          ></span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-shark-100 text-sm">Allowance not granted for FNX</p>
        </div>
      </div>
      <Button variant="tertiary" className="h-4 !p-[12px] !text-xs">
        Allow FNX
      </Button>
    </li>
  )
}

export default AllowFNX
