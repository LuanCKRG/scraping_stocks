"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types"



const supabase = createServerActionClient<Database>({ cookies })

export const getAllStocksFromTV = async () => {
  const {data} = await supabase.from("stocks").select("target_price, ticker").eq("src", "Tranding View")

  return {stocks: data!}
}

export const getActiveList = async (search: string) => {
  const { data: activeList } = await supabase.from("indexes").select("name").eq("name", search)

  return {activeList}
}

export const addActiveOnUser = async ({id, indexes, search}: {id: string, indexes: string[], search: string}) => {
  await supabase.from("user").upsert({ id, indexes: [...indexes, search] })
}




export const show = async (search: string) => {
  const { data: active_list } = await supabase.from("indexes").select("name").eq("name", search)

  if (!active_list) {
    return { error: true, message: "Algo deu errado, por favor tente novamente mais tarde" }
  }

  if (active_list.length > 0) {
    if ([""].includes(search)) {
      return { error: true, text: "Índice já adicionado" }

    } else {
      // await supabase.from("user").upsert({ id, indexes: [...indexes, search] })
      return { error: false, text: "Índice adicionado com sucesso" }
    }


  } else {
    await supabase.from("querys").insert({ ticker: search, type_search: "index" })
    return { error: true, text: "Índice não encontrado, foi enviado para busca" }
  }
}

export const getUserId = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  const { id } = user!

  return { id }
}

export const addQuery = async ({ticker, type_search}: {ticker: string, type_search: "index" | null}) => {
  await supabase.from("querys").insert({ticker, type_search})
}

export const getDataFromUser = async (id: string) => {
  const { data: data_from_user } = await supabase.from("user").select("indexes").eq("id", id)
  const { indexes } = data_from_user![0]

  return { indexes }
}

export const getIndexes = async (queryIndexes: string[]) => {
  const { data: indexes } = await supabase.from("indexes").select('*').in("name", queryIndexes)

  return { indexes }
}