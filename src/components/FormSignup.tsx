"use client"

import { z } from 'zod'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from './Form'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-existss-error'
import { Database } from '@/types'

const createUserSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .max(60, 'O limite de caracteres é 60')
    .transform(
      (name) => {
        return name.split(' ').map(
          (word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          }
        ).join(' ')
      }
    ),
  email: z.string()
    .trim()
    .toLowerCase()
    .min(1, 'O e-mail é obrigatório')
    .max(60, 'O limite de caracteres é 60')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(8, 'A senha precisa de no mínimo 8 caracteres')
    .max(30, 'O limite de caracteres é 30')
    .regex(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'), 'Digite uma senha mais forte')
})

type createUserFormData = z.infer<typeof createUserSchema>

export const FormSignup = () => {
  const supabase  = createClientComponentClient<Database>()
  
  const [message, setMessage] = useState<{ text: string, error: boolean } | null>(null)
  const router = useRouter()

  const createUserForm = useForm<createUserFormData>({
    resolver: zodResolver(createUserSchema)
  })
  const { handleSubmit, watch, formState: { isSubmitting } } = createUserForm

  const userPassword = watch('password')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(userPassword)

  const createUser: SubmitHandler<createUserFormData> = async (data) => {
    try {
      const {data: userAlreadyExists} = await supabase.from('user').select('*').eq('email', data.email)
      
      if(userAlreadyExists?.length! > 0) {
        throw new UserAlreadyExistsError()
      }

      const {error} = await supabase.auth.signUp({...data, options: {
        data: {
          user_name: data.name
        }
      }})


      if(error) {
        console.error(error)
        throw error
      }
      
      setMessage({text: "Usuário criado com sucesso", error: false})

      router.refresh()


    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        setMessage({text: err.message, error: true})
      } else {
        console.error(err)
        throw err
      }
    }
  }

  return (
    <FormProvider {...createUserForm}>
      <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-8 text-center">
        <h1 className="text-xl">
          Stocks
        </h1>

        <Form.Field>
          <Form.Input text='Nome*' name="name" placeholder='Luan Vitor de Campos K.' />
          <Form.ErrorMessage field='name' />
        </Form.Field>

        <Form.Field>
          <Form.Input text='E-mail*' name="email" placeholder='luancamposck@gmail.com' />
          <Form.ErrorMessage field='email' />
        </Form.Field>

        <Form.Field>
          <Form.Input text='Senha*' name="password" placeholder='********' type='password' />
          {isPasswordStrong ?
            <span className="text-left text-xs text-emerald-600">Senha forte</span> :
            <span className="text-left text-xs text-red-500">Senha fraca</span>
          }
          <Form.ErrorMessage field='password' />
        </Form.Field>

        {message &&
          <span className={`text-sm ${message.error ? "text-red-500" : "text-emerald-600"}`}>
            {message.text}!
          </span>
        }

        <Form.Button text="Cadastre-se" type="submit" disabled={isSubmitting} />
      </form>
    </FormProvider>
  )
}