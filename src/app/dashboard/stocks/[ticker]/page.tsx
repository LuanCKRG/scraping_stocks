import { NotResult } from "@/components/NotResult"
import { Stock } from "@/components/Stock"
import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

const Page = async ({params}: {params: {ticker: string}}) => {
  const ticker = params.ticker.toUpperCase()

  const supabase = createServerComponentClient<Database>({cookies})
  const {data: stocks} = await supabase.from("stocks").select("*").eq("ticker", ticker)

  console.log(ticker)

  if(stocks!.length > 0) {
    return (
      <div className="flex flex-col space-y-4 justify-center sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 px-4">
        {
          stocks?.map(
            (stock, index) => <Stock key={index} {...stock} />
          )
        }
      </div>
    )
  } else {
    return (
      <NotResult />
    )
  }
}

export default Page