'use client'

import Image from 'next/image'
import Link from 'next/link'

import Menu from './Menu'
import AccountHandler from './AccountHandler'
import WalletSelection from '@/src/components/Modals/WalletSelection'

import { usePathname } from 'next/navigation'
const Header = () => {
  const pathname = usePathname()
  // Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
  return (
    <header className="hidden mx-auto lg:block container">
      <div className={`${pathname === '/' ? '' : 'header-box px-5'} flex justify-between gap-5 rounded-l`}>
        <div className="flex items-center justify-between w-full relative z-10 h-[95px] ">
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
        <div
          className={`flex relative z-10 items-center gap-3.5 justify-end px-5 h-[95px] ${pathname === '/' ? '2xl:w-1/2 ' : '2xl:w-3/5'}`}
        >
          <AccountHandler isMenuMobile={false} />
        </div>
      </div>
      <WalletSelection />
    </header>
  )
}

export default Header
