'use client'

import Image from 'next/image'
import cn from '@/src/library/utils/cn'
import { usePathname } from 'next/navigation'

import AccountHandler from '../AccountHandler'
import { MENU_LINKS, SOCIAL_LINKS } from '../data'
import Link from 'next/link'

interface MenuProps {
  showMenu: boolean
  setShowMenu: (showMenu: boolean) => void
}

const Menu = ({ showMenu, setShowMenu }: MenuProps) => {
  const pathname = usePathname()
  const className = cn(
    'absolute transition-all p-4 w-[90%] bg-shark-500 backdrop-blur-3xl bg-opacity-80  top-full rounded-2xl border border-shark-400',
    showMenu ? 'right-5 opacity-100 visible' : 'right-0 opacity-50 invisible'
  )

  const handleCloseMenu = () => setShowMenu(false)
  // Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        {/* <Image src="/static/images/logo.svg" className="w-[100px]" alt="logo" width={43} height={26} priority /> */}
        <span className="icon-x text-white text-xl ml-auto" onClick={handleCloseMenu}></span>
      </div>
      {/* <h5 className="text-white text-sm font-normal mb-4">Main menu</h5> */}
      {/* <div className={`items-center gap-2 mb-4 flex xl:hidden ${pathname === '/' ? 'hidden' : 'block'}`}> */}
      {/* <Image src="/static/images/tokens/ETH.svg" className="w-6 h-6" alt="token" width={43} height={26} />
        <p className="text-white text-xs">1.987 ETH</p> */}
      {/* </div> */}

      {/* <div className="mb-4 w-full flex justify-start">
        <AccountHandler isMenuMobile={true} isMoreOption={false} />
      </div> */}

      <div className="flex flex-col mb-4">
        {MENU_LINKS.map((link, index) => (
          <Link onClick={() => handleCloseMenu()} href={link.href} key={index} className="text-white text-xs py-4">
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map((link, index) => (
          <Link
            key={index}
            target="_blank"
            href={link.href}
            className="bg-shark-400 border border-shark-300 rounded-lg p-1 w-8 h-8 flex items-center justify-center"
          >
            <span className={`text-white text-xs icon-${link.iconName}`}></span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Menu
