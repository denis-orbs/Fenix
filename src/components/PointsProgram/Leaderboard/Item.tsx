'use client'
import Image from "next/image"

const Item = () => {
  return (
    <div className="flex items-center w-full bg-shark-400 bg-opacity-40 border border-shark-300 py-6 rounded-md mb-4 px-3 xl:px-0 gap-3">
      <span className="text-white xl:w-36 text-center flex items-center justify-center">
        <div className="bg-shark-400 bg-opacity-40 border border-shark-300 w-10 rounded-md text-xs py-2">
          01
        </div>
      </span>
      <span className="text-white w-full">
        <div className="flex items-center gap-4">
          <Image src="/static/images/points-program/user.png" alt="user" width={40} height={40} className="w-10 h-10"/>
          <p className="text-sm max-w-[100px] xl:max-w-auto truncate">0x938c3b41c35ab3281</p>
        </div>
      </span>
      <span className="text-white xl:w-36 text-center text-sm">
        21769680
      </span>
    </div>
  )
}

export default Item
