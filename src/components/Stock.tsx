import { StockProps } from "@/types"

export const Stock = ({date, href, targetPrice, recomendation, src, token}: StockProps) => {
	return (
		<section className="flex flex-col border-2 rounded-lg p-2">
			<div className="w-full border-b-2">
				<h2 className="text-center">
					<b>{token}</b>
				</h2>
			</div>
			<div>
				<div>
          Preço-alvo: <b>{targetPrice}</b>
				</div>
				<div>
          Recomendação: <b>{recomendation}</b>
				</div>
				<div>
          Data: <b>{date}</b>
				</div>
				<div>
          Orgão: <b>{src}</b>
				</div>
			</div>
			<div className="mx-auto underline">
				<a href={href}>
          Fonte
				</a>
			</div>
		</section>
	)
}