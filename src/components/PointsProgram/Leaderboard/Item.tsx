'use client'
import { formatAmount, formatCurrency } from '@/src/library/utils/numbers'
import Image from 'next/image'

const Item = ({ data }: any) => {
  return (
    <div className="flex items-center w-full bg-shark-400 bg-opacity-40 border border-shark-300 py-6 rounded-md mb-4 px-3 xl:px-0 gap-3">
      <span className="text-white xl:w-36 text-center flex items-center justify-center">
        <div className="bg-shark-400 bg-opacity-40 border border-shark-300 w-10 rounded-md text-xs py-2">
          {data.rank}
        </div>
      </span>
      <span className="text-white w-full">
        <div className="flex items-center gap-4">
          <Image src="/static/images/tokens/FNX.svg" alt="user" width={40} height={40} className="w-10 h-10" />
          <p className="text-sm max-w-[100px] xl:max-w-auto truncate">{data.recipient}</p>
        </div>
      </span>
      <span className="text-white xl:w-36 text-center text-sm">{formatCurrency(data.amount)}</span>
    </div>
  )
}

export default Item
