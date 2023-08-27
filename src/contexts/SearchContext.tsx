"use client"

import { createContext, useContext, useState } from "react"

interface SearchContextProps {
  search: string
  handleSearch: (newSearch: string) => void
}

const SearchContext = createContext<SearchContextProps>({} as SearchContextProps)

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [ search, setSearch ] = useState<string>('')

  function handleSearch(newSearch: string) {
    setSearch(newSearch)
  }

  return (
    <SearchContext.Provider value={{search, handleSearch}}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  return useContext(SearchContext)
}