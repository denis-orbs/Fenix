'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/src/components/UI'
import { MENU_LINKS } from './data'
import Link from 'next/link'

const Menu = () => {
  const pathname = usePathname()
  const isActive = (path: string) => {
    const regex = new RegExp(`^${path}`)
    return regex.test(pathname)
  }

  // Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
  const activeButtonClass = 'button-primary'
  const activeButtonTextClass = 'text-white'
  const inactiveButtonClass =
    'text-white border border-transparent hover:bg-limed-spruce-900 hover:border-oxford-blue-900 hover:bg-opacity-40'
  const inactiveButtonTextClass =
    'group-hover:text-transparent group-hover:bg-gradient-to-r from-outrageous-orange-500 to-festival-500 group-hover:bg-clip-text'

  return (
    <ul
      className={`${pathname === '/' ? 'header-box-landing' : ''} flex items-center md:gap-2 2xl:gap-3 justify-center `}
    >
      {MENU_LINKS.map((link, index) => (
        <span className="flex items-center relative" key={index}>
          <Link
            href={link.href}
            className={`${isActive(link.href) ? activeButtonClass : inactiveButtonClass} 
            rounded-[8px] relative z-50 py-2.5 px-3 md:px-1 flex items-center justify-center min-w-[80px] gap-2.5 text-white text-xs leading-normal group transition-all`}
          >
            <span className={`${isActive(link.href) ? activeButtonTextClass : inactiveButtonTextClass} `}>
              {link.name}
            </span>
          </Link>
          {link.new && (
            <span className="absolute -top-2 right-1 text-[9px]  bg-alizarin-crimson-600 rounded-md w-7 h-5 flex items-center justify-center z-[100] text-white">
              New
            </span>
          )}
          {pathname === '/' && (
            <>{index !== MENU_LINKS.length - 1 && <div className=" border-r solid border-white h-[22px]"></div>}</>
          )}
        </span>
      ))}
    </ul>
  )
}

export default Menu
