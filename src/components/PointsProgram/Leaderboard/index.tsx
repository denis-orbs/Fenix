'use client'
import { Button, Pagination } from '@/src/components/UI'
import Item from './Item'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { totalCampaigns } from '@/src/library/utils/campaigns'

const Leaderboard = ({ data }: any) => {
  return (
    <div className="mb-10 w-full">
      <div className="flex flex-col xl:flex-row items-start w-full justify-between mb-8 xl:items-center">
        <h5 className="text-white text-lg mb-3 font-medium">Leaderboard</h5>
        {/* <Button className="w-full xl:w-auto">
          <span>
            Refer your friends to move up
            <i className="icon-copy ml-3"></i>
          </span>
        </Button> */}
      </div>
      <div className="relative">
        <div className="flex items-center w-full mb-3">
          <span className="text-white w-36 text-center text-sm">#</span>
          <span className="text-white w-full text-sm">
            Ranking Addresses
            {/* <i className="icon-chevron text-xs ml-2"></i> */}
          </span>
          <span className="text-white w-36 text-center text-sm">
            RINGS
            <i className="icon-chevron text-xs ml-2"></i>
          </span>
        </div>
        {data.map((data: any, index: number) => (
          <Item key={index} data={data} />
        ))}
        {/* <Pagination className="mx-auto" numberPages={7} /> */}
      </div>
    </div>
  )
}

export default Leaderboard
