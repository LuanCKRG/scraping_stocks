import { Header } from "@/components/Header"
import { SearchBar } from "@/components/SearchBar"

const Home = () => {
  return (
    <>
      <Header />
      
      <div className="flex flex-col">
				<SearchBar />
			</div>
    </>
  )
}

export default Home