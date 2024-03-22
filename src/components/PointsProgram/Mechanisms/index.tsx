'use client'

import { MECHANISMS } from "../data"
import Item from "./Item"

const Mechanisms = () => {
  return (
    <div className="mb-10">
      <h5 className="text-white text-lg mb-3 font-medium">Mechanisms</h5>
      <div className="flex items-center justify-between gap-5 relative">
        {
          MECHANISMS.map((item, index) => (
            <Item key={index} item={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default Mechanisms
