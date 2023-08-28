import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { enterpise: string } }) => {
  const empresa = params.enterpise

  return NextResponse.json({empresa})
}