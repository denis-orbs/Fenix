'use client'

const Search = () => {

  return (
    <div className="search-box">
      <span className="flex items-center justify-center w-8 h-5 text-2xl icon-search  text-shark-100" />
      <input
        type="text"
        placeholder="Search by name, symbol or address..."
        className="w-full px-2 text-sm bg-transparent outline-none text-shark-100"
      />
    </div>
  )
}

export default Search
