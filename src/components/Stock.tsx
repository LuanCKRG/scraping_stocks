interface StockProps {
  ticker: string
  recomendation: string
  target_price: string
  date: string
  href: string
  src: string
}

export const Stock = ({ date, href, recomendation, src, target_price, ticker }: StockProps) => {
  return (
    <section className="flex flex-col border-2 rounded-lg p-2">
      <div className="w-full border-b-2 border-black">
        <h2 className="text-center">
          <b> {ticker} </b>
        </h2>
      </div>
      <div>
        <div>
          Preço-alvo: <b> {target_price} </b>
        </div>
        <div>
          Recomendação: <b> {recomendation} </b>
        </div>
        <div>
          Data: <b> {date} </b>
        </div>
        <div>
          Orgão: <b> {src} </b>
        </div>
      </div>
      <div className="mx-auto underline">
        <a href={href} >
          Fonte
        </a>
      </div>
    </section>
  )
}