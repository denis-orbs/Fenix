'use client'

import Image from 'next/image'

import Menu from './Menu'
import AccountHandler from './AccountHandler'
import WalletSelection from '@/components/Modals/WalletSelection'

const Header = () => {
  return (
    <div className="px-5 pt-[26px]">
      <header className="header max-w-[1820px] mx-auto p-0 flex gap-5 justify-between">
        <div className="flex items-center justify-between w-full relative z-10 h-[87px] p-4 max-w-[1309px]">
          <Image src="/static/images/logo.svg" className="w-[150px] h-10" alt="logo" width={150} height={40} priority />
          <Menu />
        </div>
        <div className="flex relative z-10 pr-[15px] items-center pb-[10px] gap-3.5 min-w-[489px] justify-end">
          <AccountHandler />
          <div className="p-2 cursor-pointer">
            <span className="text-[26px] transition-all icon-logout text-shark-100 hover:text-outrageous-orange-400"></span>
          </div>
        </div>
      </header>

      <WalletSelection />
    </div>
  )
}

export default Header
