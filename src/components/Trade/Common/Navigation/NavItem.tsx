'use client'

import { useState } from 'react'
import Link from 'next/link'
import cn from '@/src/library/utils/cn'
import { usePathname } from 'next/navigation'

interface IItem {
  name: string
  description: string
  icon: string
  path: string
  active: boolean
}

interface NavItemProps {
  item: IItem
}

const NavItem = ({ item }: NavItemProps) => {
  const [hasHover, setHasHover] = useState<boolean>(false)

  const pathname = usePathname()

  const shortenedPathname = pathname.slice(7, 20)

  const activeItem = cn(
    'relative pb-2 transtition cursor-pointer border-b-2 group hover:border-chilean-fire-600',
    shortenedPathname === item.path ? 'border-chilean-fire-600' : 'border-transparent'
  )
  const activeName = cn(shortenedPathname === item.path ? 'text-chilean-fire-600' : 'text-white')

  const onHoverEnter = () => setHasHover(true)
  const onHoverLeave = () => setHasHover(false)

  const handleRedirect = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!item.active) event.preventDefault()
  }

  return (
    <div className={activeItem} onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
      <Link href={`${item.path}`} className="flex items-center gap-2" onClick={handleRedirect}>
        <div className="hidden md:flex items-center justify-center w-9 h-9 p-2 border rounded-lg bg-shark-400 bg-opacity-40 border-shark-400">
          <span className={`inline-block text-lg text-gradient ${item.icon}`}></span>
        </div>
        <div className="">
          <p className={`text-sm group-hover:text-chilean-fire-600 ${activeName}`}>{item.name}</p>
        </div>
      </Link>
      {hasHover && !item.active && (
        <div className="bg-shark-400 bg-opacity-90 cursor-not-allowed pointer-events-none rounded-lg text-chilean-fire-600 text-xs flex items-center justify-center px-4 py-3 absolute top-0 w-full">
          Coming soon
        </div>
      )}
    </div>
  )
}

export default NavItem
