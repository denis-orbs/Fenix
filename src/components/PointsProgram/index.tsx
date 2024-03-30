'use client'

import Image from "next/image"
import HowToEarn from "./HowToEarn"
import PointSummary from "./PointSummary"
import Leaderboard from "./Leaderboard"

const PointsProgram = () => {
  return (
    <section className="relative max-w-7xl mx-auto">
      <div className="container py-10">
        <div className="flex items-center justify-center flex-col mb-8">
          <Image src="/static/images/isotipe.svg" className="w-[76px] h-9 mb-2" alt="logo" width={43} height={26} priority />
          <h5 className="text-white text-2xl mb-3 font-medium">Fenix Points</h5>
          <p className="text-white text-sm text-center">Fenix Points are designed to quantify and recognize participants for their contributions and loyalty to Fenix. These points will be awarded after the program ends.</p>
        </div>
        <HowToEarn />
        <PointSummary />
        <Leaderboard />
      </div>
    </section>
  )
}

export default PointsProgram
