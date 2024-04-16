'use client'

import NavItem from './NavItem'
import { NAV_LIST } from '../../data'

const Navigation = () => {
  return (
    <div className="box-navigation-trade">
      <div className="relative z-10 grid xl:grid-cols-6 grid-cols-2 gap-5 xl:gap-4 items-start xl:items-center flex-row flex-wrap w-full xl:w-[70%] mb-4 xl:mb-0">
        {NAV_LIST.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </div>
      {/* <div className="min-w-[150px] flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 justify-center">
        <span className="icon-discord"></span>
        <p className="text-sm">Need help?</p>
      </div> */}
    </div>
  )
}

export default Navigation
