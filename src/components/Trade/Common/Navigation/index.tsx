'use client'
import { useState } from 'react'
import NavItem from './NavItem'
import { NAV_LIST } from '../../data'
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
    <div className="box-navigation-trade">
      <div className="relative z-10 grid xl:grid-cols-6 grid-cols-2 gap-5 xl:gap-4 items-start xl:items-center flex-row flex-wrap w-full xl:w-[70%] mb-4 xl:mb-0">
        {NAV_LIST.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </div>
      <div className='flex items-center gap-3 max-xl:hidden'>
        <Switch active={showChart} setActive={handleSwitch} />
        <div className='text-xs text-shark-100 font-normal whitespace-nowrap'>{showChart ? 'Hide' : 'Show'} Trading View</div>
      </div>
      {/* <div className="min-w-[150px] flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 justify-center">
        <span className="icon-discord"></span>
        <p className="text-sm">Need help?</p>
      </div> */}
    </div>
  )
}

export default Navigation
