'use client'

import { POINTS_BLAST } from "../data"
import Item from "./Item"

const BlastCriteria = () => {
  return (
    <div className="mb-10">
      <h5 className="text-white text-lg mb-3 font-medium">Blast Criteria for points</h5>
      <div className="flex items-center justify-between gap-5 relative">
        {
          POINTS_BLAST.map((item, index) => (
            <Item key={index} item={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default BlastCriteria
