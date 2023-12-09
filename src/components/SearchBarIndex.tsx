"use client"

import { z } from "zod"
import { IoIosAddCircleOutline } from "react-icons/io"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types"
import { useState } from "react"
import { Search } from "@/patterns/Search"
import { addActiveOnUser, getActiveList, addQuery } from "@/services/console"

const searchIndexSchema = z.object({
  search: z.string()
    .toUpperCase()
    .min(5, "O mínimo de caracteres é 5")
    .max(80, "O máximo de caracteres é 80")
})

type searchIndexType = z.infer<typeof searchIndexSchema>

interface SearchBarIndexProps {
  id: string
  indexes: string[] | null
}

export const SearchBarIndex = ({ indexes, id }: SearchBarIndexProps) => {
  const [message, setMessage] = useState<{ text: string, error: boolean }>()
  const { refresh } = useRouter()

  const searchIndexForm = useForm<searchIndexType>({
    resolver: zodResolver(searchIndexSchema)
  })

  const { handleSubmit, register, formState: { errors } } = searchIndexForm

  // const supabase = createClientComponentClient<Database>()

  // const handleIndexes: SubmitHandler<searchIndexType> = async ({ search }) => {

  //   const {data: activesOnDB} = await supabase.from("indexes").select('name').eq("name", search)

  //   if(activesOnDB && activesOnDB.length > 0) {
  //     if (indexes.includes(search)) {
  //       setMessage({error: true, text: "Índice já adicionado"})

  //     } else {
  //       await supabase.from("user").upsert({ id, indexes: [...indexes, search] })
  //       setMessage({error: false, text: "Índice adicionado com sucesso"})
  //       refresh()
  //     }
  //   } else {
  //     await supabase.from("querys").insert({ticker: search, type_search: "index"})
  //     setMessage({error: true, text: "Índice não encontrado, foi enviado para busca"})
  //   }

  // }

  const handleClick: SubmitHandler<searchIndexType> = async ({ search }) => {
    // Lista de ativos vindo do banco de dados
    const { activeList } = await getActiveList(search)

    if (!activeList) {
      setMessage({ error: true, text: "Algo deu errado, por favor tente novamente mais tarde" })

    } else if (activeList.length > 0) {
      if (indexes?.includes(search)) {
        setMessage({ error: true, text: "Índice já adicionado" })
      } else {
        await addActiveOnUser({ id, indexes: indexes!, search })
        setMessage({ error: false, text: "Índice adicionado com sucesso" })
        refresh()
      }

    } else {
      await addQuery({ ticker: search, type_search: "index" })
      setMessage({ error: true, text: "Índice não encontrado, foi enviado para busca" })
    }
  }

  return (
    <FormProvider {...searchIndexForm}>
      <div className="flex flex-col items-center">
        <Search.Form onSubmit={handleSubmit(handleClick)}>
          <Search.Input name="search" placeholder="Digite um ativo. Ex: HASH11, MGLU3, BIAU39" />
          <Search.Button type="submit" icon={IoIosAddCircleOutline} />
        </Search.Form>

        {
          message &&
          <span className={`text-sm ${message.error ? "text-red-500" : "text-emerald-600"}`}>
            {message.text}!
          </span>
        }

        {
          errors.search &&
          <span className="text-left text-red-500 text-xs">
            {errors.search.message}
          </span>
        }
      </div>
    </FormProvider>

    // <form onSubmit={handleSubmit(handleIndexes)} className="flex flex-col justify-center items-center gap-2 m-4">
    //   <div className="flex justify-center items-center mx-auto px-2 max-w-xs sm:max-w-md border-black border-2 rounded-lg">
    //     <input {...register("search")} autoComplete="off" placeholder="Digite uma ação. Ex.: PETR4, GGBR4, ALUP11" type="text" className="w-full p-2 rounded-l-lg bg-inherit focus:outline-none" />
    //     <button type="submit" className="flex justify-center cursor-pointer px-2 items-center rounded-r-lg">
    //       <IoIosAddCircleOutline size={30} />
    //     </button>
    //   </div>

    //   { message &&
    //     <span className={`text-sm ${message.error ? "text-red-500" : "text-emerald-600"}`}>
    //       {message.text}!
    //     </span>
    //   }

    //   {
    //     errors.search &&
    //     <span className="text-left text-red-500 text-xs">
    //       {errors.search.message}
    //     </span>
    //   }
    // </form>
  )
}