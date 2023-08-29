import { Stock } from "@/components/Stock"
import { StockProps } from "@/types"

const Page = async ({ params }: { params: { stock: string } }) => {
  const stock = params.stock

  const res = await fetch(`http://localhost:3000/api/${stock}`, {cache: 'no-store'})
  const data: StockProps= await res.json().catch(e => console.error(e))
  console.log(typeof data)
  console.table(data)


  return (
    <div className="flex flex-col space-y-4 justify-center sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 px-4">
      <Stock {...data} />
    </div>
  )
}

export default Page