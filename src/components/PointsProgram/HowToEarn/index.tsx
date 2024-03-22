'use client'

import { POINTS_BOXES } from "../data"
import Point from "./Point"

const HowToEarn = () => {
  return (
    <div className="mb-10">
      <h5 className="text-white text-lg mb-3 font-medium">How to Earn Points Boxes</h5>
      <div className="flex items-center justify-between gap-5 relative">
        {
          POINTS_BOXES.map((point, index) => (
            <Point key={index} point={point}/>
          ))
        }
      </div>
    </div>
  )
}

export default HowToEarn
