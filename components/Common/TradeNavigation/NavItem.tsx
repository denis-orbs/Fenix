'use client'
import cn from '@/utils/cn'

interface IItem {
  name: string
  description: string
  icon: string
  path: string
}

interface NavItemProps {
  item: IItem
  activePath: string
  onClick: () => void
}

const NavItem = ({ item, onClick, activePath }: NavItemProps) => {

  const activeItem = cn(
    'flex items-center pb-2 transtition gap-2 cursor-pointer border-b-2 group hover:border-chilean-fire-600',
    activePath === item.path ? 'border-chilean-fire-600' : 'border-transparent'
  )
  const activeName = cn(activePath === item.path ? 'text-chilean-fire-600' : 'text-white')

  return (
    <div onClick={onClick} className={activeItem}>
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
  )
}

export default NavItem
