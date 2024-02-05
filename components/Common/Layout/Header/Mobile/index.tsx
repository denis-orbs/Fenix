'use client'

import Image from 'next/image'

import AccountHandler from '../AccountHandler'
import Toggle from './Toggle'
import WalletSelection from '@/components/Modals/WalletSelection'

const MobileHeader = () => {

  const handleShowMenu = () => {}

  return (
    <div className="p-3 block md:hidden">
      <header className="header max-w-[1820px] mx-auto p-0 flex gap-5 justify-between bg-shark-400 bg-opacity-40 rounded-lg">
        <div className="flex items-center justify-between w-full relative z-10 h-[87px] p-4">
          <Image src="/static/images/isotipe.svg" className="w-[45px] h-7" alt="logo" width={43} height={26} priority />
          <div className="flex items-center gap-2">
            <AccountHandler />
            <Toggle onClick={handleShowMenu} />
          </div>
        </div>
      </header>
      <WalletSelection />
    </div>
  )
}

export default MobileHeader
