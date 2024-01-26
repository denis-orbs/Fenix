'use client'

import Image from 'next/image'

import Menu from './Menu'
import AccountHandler from './AccountHandler'

const Header = () => {
  return (
    <header className="header">
      <Image src="/static/images/logo.svg" className="w-[150px] h-10" alt="logo" width={150} height={40} priority />
      <div className="flex items-center gap-5">
        <Menu />
        <AccountHandler />
        <div className="p-2 cursor-pointer">
          <span className="text-2xl transition-all icon-logout text-shark-100 hover:text-outrageous-orange-400"></span>
        </div>
      </div>
    </header>
  )
}

export default Header
