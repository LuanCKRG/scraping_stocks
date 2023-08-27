"use client"

import { useSearch } from '@/contexts/SearchContext'
import { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

export const SearchBar = () => {
  const [ query, setQuery ] = useState<string>('')
  const { handleSearch } = useSearch()

  return (
    <span className="flex justify-center items-center my-4 px-4">
      <div className="flex w-full max-w-xs sm:max-w-md border-white border-2 rounded-lg">

        <input
          className="w-full p-2 bg-black rounded-l-lg focus:outline-none text-center"
          placeholder="Digite uma ação. Ex.: PETR4, GGBR4, SNAG11"
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          type="text"
        />

        <span
          className="flex justify-center cursor-pointer px-2 items-center rounded-r-lg"
          onClick={() => handleSearch(query)}
        >
          <BiSearchAlt size={30} />
        </span>

      </div>
    </span>
  )
}