'use client'

import Image from "next/image"
import HowToEarn from "./HowToEarn"
import BlastCriteria from "./BlastCriteria"
import Mechanisms from "./Mechanisms"

const PointsProgram = () => {
  return (
    <section className="relative max-w-7xl mx-auto">
      <div className="container py-10">
        <div className="flex items-center justify-center flex-col">
          <Image src="/static/images/isotipe.svg" className="w-[76px] h-9 mb-2" alt="logo" width={43} height={26} priority />
          <h5 className="text-white text-2xl mb-3 font-medium">Fenix Credits</h5>
        </div>
        <HowToEarn />
        <BlastCriteria />
        <Mechanisms />
      </div>
    </section>
  )
}

export default PointsProgram
