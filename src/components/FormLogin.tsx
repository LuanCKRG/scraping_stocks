"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Form } from "./Form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Database } from "@/types"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import Link from "next/link"
import { EmailNotConfirmedError } from "@/use-cases/errors/email-not-confirmed-error"

const loginUserSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .min(1, 'O e-mail é obrigatório')
    .max(60, 'O limite de caracteres é 60')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'No mínimo 8 caracteres')
    .max(30, 'No máximo 30 caracteres')
})

type loginUserFormData = z.infer<typeof loginUserSchema>

export const FormLogin = () => {
  const [message, setMessage] = useState<{text: string, error: boolean}>()
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const loginUserForm = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserSchema)
  })

  const {handleSubmit} = loginUserForm

  const loginUser: SubmitHandler<loginUserFormData> = async (data) => {
    try {
      const {error} = await supabase.auth.signInWithPassword(data)

      if(error?.message === "Invalid login credentials") {
        throw new InvalidCredentialsError()
      }

      if(error?.message === "Email not confirmed") {
        throw new EmailNotConfirmedError()
      }

      if(error) {
        throw error
      }

      setMessage({text: "Usuário logado comsucesso", error: false})
      router.refresh()

    } catch (err) {
      if(err instanceof InvalidCredentialsError) {
        setMessage({text: err.message, error: true})
      } else if(err instanceof EmailNotConfirmedError) {
        setMessage({text: err.message, error: true})
      } else {
        console.error(err)
        throw err
      }
    }
  }

  return (
    <FormProvider {...loginUserForm}>
      <form onSubmit={handleSubmit(loginUser)}className="flex flex-col gap-8 text-center">
        <h1 className="text-xl">
          Stocks
        </h1>

        <Form.Field>
          <Form.Input name="email" text="E-mail*" placeholder="yasminrenata@gmail.com" />
          <Form.ErrorMessage field="email" />
        </Form.Field>

        <Form.Field>
          <Form.Input name="password" text="Senha*" type="password" placeholder="********" />
          <Form.ErrorMessage field="password" />
        </Form.Field>

        {message &&
          <span className={`text-sm ${message.error ? "text-red-500" : "text-emerald-600"}`}>
            {message.text}!
          </span>
        }

        <Form.Button text="Login" />
      </form>
      <div className="text-sm text-center mt-2">
        <p>
          Ainda não tem uma conta?
        </p>
        <p className="underline text-blue-400">
          <Link href="/signup">
            Cadastre-se
          </Link>
        </p>
      </div>
    </FormProvider>
  )
}