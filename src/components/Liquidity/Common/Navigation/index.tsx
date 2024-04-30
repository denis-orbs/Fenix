'use client'

// import Link from 'next/link'
import NavItem from './NavItem'
import { NAV_LIST } from "../../data"

const Navigation = () => {
  return (
    <div className="box-navigation-trade">
      <div className="flex gap-5 xl:gap-10 items-start xl:items-center flex-col xl:flex-row w-full mb-4 xl:mb-0">
        {NAV_LIST.map((item, index) => (
          <NavItem
            key={index}
            item={item}
          />
        ))}
      </div>
      {/* <Link target="_blank" href="https://discord.com/invite/fenixfi" className="min-w-[150px] flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 justify-center">
        <span className="icon-discord"></span>
        <p className="text-sm">Need help?</p>
      </Link> */}
    </div>
  )
}

export default Navigation
