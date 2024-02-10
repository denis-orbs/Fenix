'use client'


interface INav {
  name: string
  description: string
  icon: string
}

interface NavItemProps {
  nav: INav
  isActive: boolean
}

const NavItem = ({ nav, isActive }: NavItemProps) => {

  const activeName = isActive ? 'text-chilean-fire-600' : 'text-white'
  const activeBorder = isActive ? 'border-chilean-fire-600' : 'border-transparent'

  return (
    <div className={`flex items-center pb-2 transtition gap-2 cursor-pointer border-b-2 group hover:border-chilean-fire-600 ${activeBorder}`}>
      <div className="flex items-center justify-center w-10 h-10 p-2 border rounded-lg bg-shark-400 bg-opacity-40 border-shark-400">
        <span
          className={`inline-block text-lg text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text ${nav.icon}`}
        ></span>
      </div>
      <div>
        <h6 className={`text-sm group-hover:text-chilean-fire-600 ${activeName}`}>{nav.name}</h6>
        <p className="text-xs text-shark-100 line-clamp-1">{nav.description}</p>
      </div>
    </div>
  )
}

export default NavItem
