'use client'

import { useState } from 'react'
import Image from 'next/image'

import AccountHandler from '../AccountHandler'
import Toggle from './Toggle'
import WalletSelection from '@/components/Modals/WalletSelection'
import Menu from './Menu'

const MobileHeader = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleShowMenu = () => setShowMenu(!showMenu)

  return (
    <div className="block xl:hidden px-5">
      <header className="flex justify-between gap-5 p-0 mx-auto rounded-lg header bg-shark-400 bg-opacity-40 relative z-50">
        <div className="flex items-center justify-between w-full relative z-10 h-[87px] p-4 gap-3">
          <Image src="/static/images/isotipe.svg" className="w-[45px] h-7" alt="logo" width={43} height={26} priority />
          <div className="flex items-center gap-2">
            <AccountHandler />
            <Toggle onClick={handleShowMenu} />
          </div>
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </header>
      <WalletSelection />
    </div>
  )
}

export default MobileHeader
