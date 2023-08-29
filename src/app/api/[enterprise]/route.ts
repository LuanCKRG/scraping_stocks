import { NextResponse } from "next/server"
import { getStockDataSafra } from '@/utils/safra'
import { StockProps } from "@/types"

export const GET = async (req: Request, { params }: { params: { enterprise: string } }) => {
  const empresa = params.enterprise

  const {token, date, href, recomendation, targetPrice} = await getStockDataSafra(empresa)

  const data: StockProps = {
    token,
    targetPrice,
    recomendation,
    date,
    src: 'Banco Safra',
    href
  }

  console.table(data)

  return NextResponse.json(data)
}