'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/src/components/UI'
import { MENU_LINKS } from './data'
import Link from 'next/link'

const Menu = () => {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  // Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
  const activeButtonClass = 'button-primary'
  const activeButtonTextClass = 'text-white'
  const inactiveButtonClass =
    'text-white border border-transparent hover:bg-limed-spruce-900 hover:border-oxford-blue-900 hover:bg-opacity-40'
  const inactiveButtonTextClass =
    'group-hover:text-transparent group-hover:bg-gradient-to-r from-outrageous-orange-500 to-festival-500 group-hover:bg-clip-text'

  return (
    <ul
      className={`${pathname === '/' ? 'header-box-landing' : ''} flex item-center md:gap-2 2xl:gap-3 justify-center`}
    >
      {MENU_LINKS.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={`${isActive(link.href) ? activeButtonClass : inactiveButtonClass} 
          rounded-[8px] py-2.5 px-3 md:px-1 flex items-center justify-center min-w-[80px] gap-2.5 text-white text-xs leading-normal group transition-all`}
        >
          <span className={`${isActive(link.href) ? activeButtonTextClass : inactiveButtonTextClass}`}>
            {link.name}
          </span>
        </Link>
      ))}
    </ul>
  )
}

export default Menu
