'use client'
import cn from '@/utils/cn'

interface SearchProps {
  className?: string
}

const Search = ({ className }: SearchProps) => {

  const mergeClassName = cn(
    'relative flex items-center w-full h-[62px] p-2 rounded-lg bg-shark-400 bg-opacity-40',
    className
  )

  return (
    <div className={mergeClassName}>
      <span className="flex items-center justify-center w-8 h-5 text-2xl icon-search text-shark-100" />
      <input
        type="text"
        placeholder="Search by name, symbol or address..."
        className="w-full px-2 text-sm bg-transparent outline-none text-shark-100"
      />
    </div>
  )
}

export default Search
