'use client'

interface SearchProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const Search = ({ onChange, placeholder="Search by name, symbol or address.." }: SearchProps) => {

  return (
    <div className="search-box">
      <span className="flex items-center justify-center w-8 h-5 text-2xl icon-search text-shark-100" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-2 text-sm bg-transparent outline-none text-shark-100"
        onChange={onChange}
      />
    </div>
  )
}

export default Search
