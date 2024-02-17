'use client'

import React from 'react'
import cn from '@/utils/cn'

interface TableCellProps {
  className?: string
  children: React.ReactNode
}

const TableCell = ({ className, children }: TableCellProps) => {
   const mergeClass = cn('flex  p-2.5', className)

   return <div className={mergeClass}>{children}</div>
}

export default TableCell
