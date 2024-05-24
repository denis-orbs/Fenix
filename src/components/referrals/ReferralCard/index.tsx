import React from 'react'
import Image from 'next/image'

interface ReferralCardProps {
  title: string
  img: string
  description: string
}

const ReferralCard = ({ title, img, description }: ReferralCardProps) => {
  return (
    <div className="mx-auto ">
      <div
        className="
        group
        hover:from-outrageous-orange-500
        after:transition-all
        ease-out
        hover:bg-gradient-to-r
        hover:bg-opacity-40
        hover:to-festival-500 
        cursor-pointer
      bg-shark-400 bg-opacity-40 flex flex-col gap-2 p-5 rounded-xl border border-solid border-shark-300
         max-w-[362px] xl:min-w-[362px] min-h-[216px]
        max-h-[240px]
        "
      >
        <Image src={img} className="w-full h-[110px]" alt="" height={362} width={110} />
        <h1 className="text-white font-semibold text-xs">{title}</h1>

        <p className="text-shark-100 group-hover:text-white  font-normal text-xs line-clamp-3">{description}</p>
      </div>
    </div>
  )
}

export default ReferralCard
