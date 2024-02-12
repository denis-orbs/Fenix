'use client'
import { useState } from 'react'

import NavItem from './NavItem'
import { NAV_LIST } from "../../data"

interface NavigationProps {
  setSectionActive: (section: string) => void
}

const Navigation = ({ setSectionActive }: NavigationProps) => {
  const [activePath, setActivePath] = useState("swap")

  const handlerNavigation = (section: string) => {
    setSectionActive(section)
    setActivePath(section)
  }

  return (
    <div className="flex mb-4 w-full flex-col xl:flex-row items-start xl:items-center bg-shark-400 bg-opacity-40 rounded-lg px-5 py-4 justify-between">
      <div className="flex gap-5 xl:gap-10 items-start xl:items-center flex-col xl:flex-row w-full mb-4 xl:mb-0">
        {NAV_LIST.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            activePath={activePath}
            onClick={() => handlerNavigation(item.path)}
          />
        ))}
      </div>
      <div className="min-w-[100px] flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 justify-center">
        <span className="icon-discord"></span>
        <p className="text-sm">Need help?</p>
      </div>
    </div>
  )
}

export default Navigation
