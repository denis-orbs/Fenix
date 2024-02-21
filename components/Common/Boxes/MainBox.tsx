'use client'
import cn from '@/utils/cn'

interface MainBoxProps {
  children: React.ReactNode
  className: string
}

const MainBox = ({ children, className }: MainBoxProps) => {

  const mergeClassName = cn('main-box', className)

  return <div className={mergeClassName}>{children}</div>
}

export default MainBox
