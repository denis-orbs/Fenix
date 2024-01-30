'use client'

const Search = () => {
  return (
    <div className="relative flex items-center w-1/3 h-[62px] p-2 rounded-lg box-large">
      <span className="text-2xl icon-search text-shark-100 w-8 h-5 flex items-center justify-center" />
      <input
        type="text"
        placeholder="Search by name, symbol or address..."
        className="text-sm bg-transparent outline-none text-shark-100 px-2"
      />
    </div>
  )
}

export default Search
