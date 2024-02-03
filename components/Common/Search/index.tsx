'use client'

const Search = () => {
  return (
    <div className="relative flex items-center md:w-1/3 h-[62px] p-2 rounded-lg box-large">
      <span className="flex items-center justify-center w-8 h-5 text-2xl icon-search text-shark-100" />
      <input
        type="text"
        placeholder="Search by name, symbol or address..."
        className="px-2 text-sm bg-transparent outline-none text-shark-100"
      />
    </div>
  )
}

export default Search
