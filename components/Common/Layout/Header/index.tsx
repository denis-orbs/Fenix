'use client'

import Image from 'next/image'
import Link from 'next/link'

import Menu from './Menu'
import AccountHandler from './AccountHandler'
import WalletSelection from '@/components/Modals/WalletSelection'

const Header = () => {
  return (
    <header className="hidden mx-auto xl:block container">
      <div className="flex justify-between gap-5 rounded-lg bg-shark-400 bg-opacity-40">
        <div className="flex items-center justify-between w-full relative z-10 h-[87px] p-4">
          <Link href="/">
            <Image
              src="/static/images/logo.svg"
              className="w-[150px] h-10"
              alt="logo"
              width={150}
              height={40}
              priority
            />
          </Link>
          <Menu />
        </div>
        <div className="flex relative z-10 items-center gap-3.5 justify-end px-5 2xl:w-1/2">
          <AccountHandler />
          <div className="p-2 cursor-pointer">
            <span className="text-[26px] transition-all icon-logout text-shark-100 hover:text-outrageous-orange-400"></span>
          </div>
        </div>
      </div>
      <div className="header-box"></div>
      <WalletSelection />
    </header>
  )
}

export default Header
