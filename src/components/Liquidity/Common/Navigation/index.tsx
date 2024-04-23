'use client'

// import Link from 'next/link'
import { useState } from 'react'
import NavItem from './NavItem'
import { NAV_LIST } from "../../data"
import { Switch } from '@/src/components/UI'
import { useSetChart, useShowChart } from "@/src/state/swap-chart/hooks"

const Navigation = () => {
  const showChart = useShowChart()
  const setChart = useSetChart()
  const [isChartVisible, setIsChartVisible] = useState(showChart)
  const handleSwitch = () => {
    setChart(!isChartVisible)
    setIsChartVisible(prevState => !prevState)
  }
  return (
    <div className="flex mb-4 w-full flex-col xl:flex-row items-start xl:items-center bg-shark-400 bg-opacity-40 rounded-lg px-5 py-4 justify-between">
      <div className="flex gap-5 xl:gap-10 items-start xl:items-center flex-col xl:flex-row w-full mb-4 xl:mb-0">
        {NAV_LIST.map((item, index) => (
          <NavItem
            key={index}
            item={item}
          />
        ))}
      </div>
      <div className='flex items-center gap-3 max-xl:hidden'>
        <Switch active={showChart} setActive={handleSwitch} />
        <div className='text-xs text-shark-100 font-normal whitespace-nowrap'>{showChart ? 'Hide' : 'Show'} Trading View</div>
      </div>
      {/* <Link target="_blank" href="https://discord.com/invite/fenixfi" className="min-w-[150px] flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 justify-center">
        <span className="icon-discord"></span>
        <p className="text-sm">Need help?</p>
      </Link> */}
    </div>
  )
}

export default Navigation
