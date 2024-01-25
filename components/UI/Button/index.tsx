"use client"

import React from "react"
import Link from 'next/link'
import cn from '@/utils/cn'

interface ButtonProps {
  variant?: 'default' |'primary' | 'secondary' | 'tertiary'
  className?: string
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  href?: string
}

const Button = ({ children, onClick, href, disabled, className, variant = 'primary', ...props }: ButtonProps) => {
  const variantClasses = {
    default: 'button-default',
    primary: 'button-primary',
    secondary: 'button-secondary',
    tertiary: 'button-tertiary',
  }[variant]

  const disabledClasses = 'opacity-40 cursor-not-allowed'

  const mergeClassName = cn('button', variantClasses, { [disabledClasses]: disabled }, className)

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={mergeClassName} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={mergeClassName} {...props}>
      {children}
    </button>
  )
}

export default Button



