'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/UI'
import { MENU_LINKS } from './data'
import Link from 'next/link'

const Menu = () => {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  return (
    <ul className="flex item-center md:gap-2 2xl:gap-3">
      {MENU_LINKS.map((link, index) => (
        <Link href={link.href} key={index}>
          {/* <Button variant={isActive(link.href) ? 'primary' : 'secondary'} className="!px-3 2xl:!px-5"> */}
          <Button variant="secondary" className="!px-3 2xl:!px-5">
            <span className="text-sm">{link.name}</span>
          </Button>
        </Link>
      ))}
    </ul>
  )
}

export default Menu
