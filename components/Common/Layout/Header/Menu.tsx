'use client'

import { useState } from 'react'
import { Button } from '@/components/UI'
import MENU_LINKS from './data'

const Menu = () => {
  // TODO: Delete this comment
  // eslint-disable-next-line no-unused-vars
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <ul className="flex item-center gap-2">
      {MENU_LINKS.map((link, index) => (
        <li key={index}>
          <Button href={link.href} variant={isActive ? 'primary' : 'secondary'}>
            <span className='text-xs'>{link.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Menu
