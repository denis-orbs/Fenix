import { Button } from '@/src/library/components/UI'
import React from 'react'

const Overlay = () => {
  return (
    <>
      <div className="md:flex justify-center hidden">
        <div className=" p-8 flex  justify-between  items-center w-[626px] bg-overlay-fixed backdrop-blur-md">
          <div className="flex flex-col w-full lg:w-auto">
            <p className="text-white text-xs text-nowrap">Voting Power Used</p>
            <p className="text-xl text-white">3878 (100%)</p>
          </div>
          <div className="flex justify-end gap-10 items-center ">
            <div className="">
              <span className="py-1 border border-green-400 bg-none bg-green-500 bg-opacity-20 text-white rounded-lg px-5 text-xs">
                Voting
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button className="!h-[38px] !text-xs w-[130px] ">Cast Votes</Button>
              <Button className="!py-2 !text-xs" variant="secondary">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="flex justify-center md:hidden ">
        <div className=" p-8 flex  justify-between  items-center w-[363px] h-[118px] bg-overlay-mobile backdrop-blur-md  ">
          <div className="flex flex-col w-full">
            <p className="text-white text-[10px] ">Voting Power Used</p>
            <p className="text-sm text-white">3878 (100%)</p>
          </div>
          <div className="flex flex-col items-end gap-2 ">
            <div className="">
              <span className="py-1 border border-green-400 bg-none bg-green-500 bg-opacity-20 text-white rounded-lg px-5 text-[10px]">
                Voting
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button className="!h-[28px] !text-[10px] w-[100px]">Cast Votes</Button>
              <Button className="!py-2 !text-[10px] w-[80px]" variant="secondary">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
    </>
  )
}

export default Overlay
