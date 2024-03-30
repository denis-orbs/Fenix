'use client'
import { Button, Pagination } from "@/src/components/UI"
import Item from "./Item"
import Image from "next/image"

const Leaderboard = () => {
  return (
    <div className="mb-10 w-full">
      <div className="flex flex-col xl:flex-row items-start w-full justify-between mb-8 xl:items-center">
        <h5 className="text-white text-lg mb-3 font-medium">Leaderboard</h5>
        <Button>
          <span>
            Refer your friends to move up
            <i className="icon-copy ml-3"></i>
          </span>
        </Button>
      </div>
      <div className="relative">
        <div className="flex items-center w-full mb-3">
          <span className="text-white w-36 text-center text-sm">#</span>
          <span className="text-white w-full text-sm">
            Volume (24H)
            <i className="icon-chevron text-xs ml-2"></i>
          </span>
          <span className="text-white w-36 text-center text-sm">
            PTS
            <i className="icon-chevron text-xs ml-2"></i>
          </span>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <Item key={index} />
        ))}
        <Pagination className="mx-auto" numberPages={7} />
      </div>
    </div>
  )
}

export default Leaderboard
