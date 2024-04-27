'use client'

import Image from 'next/image'
import Link from 'next/link'

import Menu from './Menu'
import AccountHandler from './AccountHandler'
import WalletSelection from '@/src/components/Modals/WalletSelection'
import { useWindowSize } from 'usehooks-ts'
import { usePathname } from 'next/navigation'
const Header = () => {
  const pathname = usePathname()
  const { width } = useWindowSize()

  // Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
  return (
    <header className={`hidden mx-auto ${pathname === '/' ? 'lg:block' : 'md:block'}  container`}>
      <div
        className={`${pathname === '/' ? '' : 'header-box px-5 pb-3'} flex justify-between items-center ${width < 860 ? 'gap-1' : 'gap-5'} rounded-l`}
      >
        <div className="flex items-center justify-between min-w-[50px] w-auto z-10 h-[95px] 2xl:w-1/3 ">
          <Link href="/">
            {width < 940 ? (
              <Image
                src="/static/images/isotipe.svg"
                className="w-[45px] h-7"
                alt="logo"
                width={43}
                height={26}
                priority
              />
            ) : (
              <Image
                src="/static/images/logo.svg"
                className="w-[150px] h-10"
                alt="logo"
                width={150}
                height={40}
                priority
              />
            )}
          </Link>
        </div>
        <div className={`${pathname === '/' ? '' : 'w-full'} relative z-10`}>
          <Menu />
        </div>
        <div
          className={`flex relative z-10 items-center gap-3.5 justify-end ${width < 860 ? 'px-1' : 'px-5'} h-[95px]
          ${pathname === '/' ? '2xl:w-1/3 ' : '2xl:w-3/5'}`}
        >
          <AccountHandler isMenuMobile={false} />
        </div>
      </div>
      <WalletSelection />
    </header>
  )
}

export default Header
