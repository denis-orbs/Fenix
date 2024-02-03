
'use client'

import React from 'react'
import cn from '@/utils/cn'

interface TableRowProps {
  className?: string
  children: React.ReactNode
}

const TableRow = ({ className, children }: TableRowProps) => {
  const mergeClass = cn(
    'flex rounded-[10px] border border-shark-500 bg-shark-400 bg-opacity-40 px-1.5 py-2.5 hover:bg-opacity-70 flex-wrap md:flex-row',
    className
  )

  return <div className={mergeClass}>{children}</div>
}

export default TableRow
