'use client'

import Image from 'next/image'

import Menu from './Menu'
import AccountHandler from './AccountHandler'

const Header = () => {
  return (
    <header className="header">
      <Image src="/static/images/logo.svg" className="w-[150px] h-10" alt="logo" width={150} height={40} priority />
      <div className="flex gap-5 items-center">
        <Menu />
        <AccountHandler />
        <div className="p-2 cursor-pointer">
          <span className="icon-logout text-shark-100 text-2xl hover:text-outrageous-orange-400 transition-all"></span>
        </div>
      </div>
    </header>
  )
}

export default Header
