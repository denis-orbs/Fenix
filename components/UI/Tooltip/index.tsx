'use client'

import React, { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import cn from '@/utils/cn'


interface TooltipProps {
  children: React.ReactNode
  className?: string
  show: boolean
  setShow: (show: boolean) => void
}

const Tooltip = ({ children, className, show, setShow }: TooltipProps) => {
  const ref = useRef(null)

  const mergeClassName = cn(
    'flex justify-center flex-col w-[250px] px-3 box-medium !bg-opacity-100 rounded-lg h-[80px] transition-all absolute -bottom-[50px] -right-[70px] z-20',
    show ? 'block' : 'hidden',
    className
  )

  const handleClickOutside = () => setShow(false)

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div className={mergeClassName} ref={ref}>
      {children}
    </div>
  )
}

export default Tooltip
