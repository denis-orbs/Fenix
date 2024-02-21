'use client'

import Link from 'next/link'
import cn from '@/utils/cn'
import { usePathname } from 'next/navigation'


interface IItem {
  name: string
  description: string
  icon: string
  path: string
}

interface NavItemProps {
  item: IItem
}

const NavItem = ({ item }: NavItemProps) => {

  const pathname = usePathname()

  const shortenedPathname = pathname.slice(7, 20)

  const activeItem = cn(
    'relative pb-2 transtition gap-2 cursor-pointer border-b-2 group hover:border-chilean-fire-600',
    shortenedPathname === item.path ? 'border-chilean-fire-600' : 'border-transparent'
  )
  const activeName = cn(shortenedPathname === item.path ? 'text-chilean-fire-600' : 'text-white')

  return (
    <Link href={`${item.path}`} className={activeItem}>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 p-2 border rounded-lg bg-shark-400 bg-opacity-40 border-shark-400">
          <span
            className={`inline-block text-lg text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text ${item.icon}`}
          ></span>
        </div>
        <div>
          <h6 className={`text-sm group-hover:text-chilean-fire-600 ${activeName}`}>{item.name}</h6>
          <p className="text-xs text-shark-100 line-clamp-1">{item.description}</p>
        </div>
      </div>
      <div className="bg-shark-400 bg-opacity-90 rounded-lg text-chilean-fire-600 text-xs flex items-center justify-center px-4 py-3 absolute top-0 w-full">
        Coming soon
      </div>
    </Link>
  )
}

export default NavItem
