'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/UI'
import { MENU_LINKS } from './data'

const Menu = () => {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  return (
    <ul className="flex item-center md:gap-2 2xl:gap-3">
      {MENU_LINKS.map((link, index) => (
        <Button
          href={link.href}
          key={index}
          variant={isActive(link.href) ? 'primary' : 'secondary'}
          className="!px-3 2xl:!px-5"
        >
          <span className="text-sm">{link.name}</span>
        </Button>
      ))}
    </ul>
  )
}

export default Menu
