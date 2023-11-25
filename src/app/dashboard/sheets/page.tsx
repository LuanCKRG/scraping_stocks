import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: exchanges } = await supabase.from("exchanges").select("*")



  return (
    <div className="flex flex-col m-4 items-start space-y-4 justify-center sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 px-4">
      {
        exchanges?.map(
          (exchange, index) => {
            return (
              <section className="flex flex-col border-2 rounded-lg p-2">
                <div className="w-full border-b-2 border-black">
                  <h2 className="text-center">
                    <b> {exchange.title} </b>
                  </h2>
                </div>
                <div>
                    <div className="space-y-0 grid gap-4 grid-cols-4 px-4 border-b-2 border-black">
                      {exchange.table.map(
                        (table, index) => {
                          return (

                        <div className="flex flex-col items-center justify-center">
                          <b>
                             {
                              // @ts-expect-error
                                table?.year
                             }
                          </b>
                          <p>
                          {
                              // @ts-expect-error
                                table?.cambio
                             }
                          </p>
                        </div>
                          )
                        }
                      )}
                    </div>
                  <div>
                    Data: <b> {exchange.date} </b>
                  </div>
                  <div>
                    Orgão: <b> {exchange.src} </b>
                  </div>
                </div>
                <div className="mx-auto underline">
                  <a href={exchange.href!} >
                    Fonte
                  </a>
                </div>
              </section>
            )
          }
        )
      }
      {/* <pre>{JSON.stringify(exchanges, null, 2)}</pre> */}
    </div>
  )
}

export const dynamic = "force-dynamic"
export default Page