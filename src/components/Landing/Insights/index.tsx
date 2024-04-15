"use client"

import CardInsights from "./cardInsights"
import Image from "next/image"
const Insights = () => {
  return (
    <div className="relative flex items-center flex-col justify-center mb-[50px] ">
      <div className="flex flex-col items-center justify-center mx-auto z-50 mb-10">
        <div className="text-shark-100 text-xl max-lg:text-lg font-normal text-center">Updates</div>
        <div className="text-gradient3 text-[40px] font-normal leading-relaxed max-lg:text-2xl text-center">
          Insights from FENIX
        </div>
      </div>
      <div className="absolute -z-10 h-[1000px] top-[-200px] max-xl:top-[-100px] max-sm:top-0 left-0 right-0 ">
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src="/static/images/landing/overview/Sun2.svg"
            width={500}
            height={500}
            className=" mix-blend-normal absolute top-0 transform left-1/2 -translate-x-1/2 min-w-[150vw] z-10 object-center object-cover"
            alt="Sun"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        <CardInsights />
        <CardInsights />
        <CardInsights />
      </div>
    </div>
  )
}

export default Insights