import { SearchBar } from "@/components/SearchBar"

const StocksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchBar />
      {children}
    </>
  )
}

export default StocksLayout