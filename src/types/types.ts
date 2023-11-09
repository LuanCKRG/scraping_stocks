import {z} from "zod"

const stockSchema = z.object({
  ticker: z.string().toUpperCase(),
  recomendation: z.string(),
  target_price: z.string(),
  date: z.string(),
  href: z.string(),
  src: z.string()
})

export type StockProps = z.infer<typeof stockSchema>