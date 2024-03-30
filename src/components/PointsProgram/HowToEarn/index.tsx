'use client'

import Image from "next/image"
import { POINTS_BOXES } from "../data"
import Point from "./Point"

const HowToEarn = () => {
  return (
    <div className="mb-10">
      <h5 className="text-white text-lg mb-3 font-medium">How to earn points</h5>
      <div className="flex items-center justify-between gap-5 relative">
        <div className="point-box bg-shark-400 bg-opacity-40 px-5 py-8 rounded-lg flex flex-col justify-center items-center relative w-full">
          <div className="flex items-center justify-center w-10 h-10 px-2 mb-2 rounded-lg bg-shark-400">
            <span
              className="inline-block text-xl text-gradient icon-coin-received"
            ></span>
          </div>
          <h4 className="text-sm text-white text-center mb-2">Provide Liquidity</h4>
          <p className="text-sm text-shark-100 text-center">
            Earn points by supplying liquidity, factoring liquidity tightness, amount & time deposited.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowToEarn
