'use client'
import { RankingEntry } from '@/src/library/hooks/rings/useRingsPoints'
import { formatAmount, formatCurrency } from '@/src/library/utils/numbers'
import Image from 'next/image'
const Item = ({ data, isUser }: { data: RankingEntry; isUser: boolean }) => {
  return (
    <div
      className={`flex items-center w-full ${isUser ? 'bg-ranking-gradient border border-outrageous-orange-400' : 'bg-shark-400 border border-shark-300'} bg-opacity-40 py-6 rounded-md mb-4 xl:px-0`}
    >
      <span className="text-white w-[15%] text-center flex items-center justify-center">
        <div
          className={`bg-shark-400 bg-opacity-40 border ${isUser ? 'border-white' : 'border-shark-300'} w-10 rounded-md text-xs py-2`}
        >
          {data?.ranking}
        </div>
      </span>
      <span className="text-white w-[25%]">
        <div className="flex items-center justify-center gap-4">
          <p className="text-xs max-w-[100px] lg:max-w-auto truncate">{data.id}</p>
        </div>
      </span>
      <span className="text-white w-[20%] flex justify-center">
        <div className="bg-shark-400 text-xs border border-shark-100 rounded-xl px-6 py-1">{data?.nft_boost || 0}%</div>
      </span>
      <span className="text-white w-[20%] flex justify-center">
        <div className="bg-shark-400 text-xs border w-[50%] border-shark-100 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
          <Image
            src="/static/images/point-stack/blast-gold.svg"
            alt="user"
            width={40}
            height={40}
            className="w-4 h-4"
          />
          {formatAmount(data?.gold_potential_rewards, 6, true) || 0}
        </div>
      </span>
      {/* <span className="text-white w-[20%] flex justify-center">
        <div className="flex items-center gap-2 text-xs">
          <Image src="/static/images/points-program/orbit.svg" alt="user" width={40} height={40} className="w-4 h-4" />
          {formatAmount(data?.gold_qualifying_rings, 6, true) || 0}
        </div>
      </span> */}
      <span className="text-white flex items-center justify-center gap-3 xl:w-[20%] text-center text-xs">
        <Image src="/static/images/points-program/orbit.svg" alt="user" width={40} height={40} className="w-4 h-4" />
        {formatAmount(data.accumulated_rings_points, 6, true)}
      </span>
    </div>
  )
}

export default Item
