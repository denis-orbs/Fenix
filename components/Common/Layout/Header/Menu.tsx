'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/UI'
import MENU_LINKS from './data'

const Menu = () => {
  const router = useRouter()
   const pathname = usePathname()
   const isActive = (path: string) => path === pathname

  const handlePath = (path: string) => router.push(path)

  return (
    <ul className="flex item-center gap-2">
      {MENU_LINKS.map((link, index) => (
        <li key={index}>
          <Button variant={isActive(link.href) ? 'primary' : 'secondary'} onClick={() => handlePath(link.href)}>
            <span className="text-xs">{link.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Menu
