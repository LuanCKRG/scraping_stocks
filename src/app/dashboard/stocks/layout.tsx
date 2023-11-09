import { SearchBar } from "@/components/SearchBar"

export const StocksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchBar />
      {children}
    </>
  )
}

export default StocksLayout