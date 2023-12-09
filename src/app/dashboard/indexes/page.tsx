import { DeleteIndexButton } from "@/components/DeleteIndexButton"
import { Search } from "@/patterns/Search"
import { SearchBarIndex } from "@/components/SearchBarIndex"
import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { getDataFromUser, getIndexes, getUserId } from "@/services/console"
import { NotResult } from "@/components/NotResult"

const Page = async () => {
  const { id } = await getUserId()
  const { indexes: queryIndexes } = await getDataFromUser(id)

  const { indexes } = await getIndexes(queryIndexes)

  const active_type = {
    "stock": "Ação",
    "fii": "FII",
    "etf": "ETF",
    "fundo": "Fundo",
    "bdr": "BDR",
    "index": "Índice",
  }

  let csv = 'Ativo,Rentabilidade,Volatilidade,Ìndice de Sharpe,Tipo\n'

  indexes?.forEach(
    (row) => {
      csv += `"${row.name}"`
      csv += ',' + `"${row.profitability}"`
      csv += ',' + `"${row.volatility}"`
      csv += ',' + `"${row.sharpe_index}"`
      csv += ',' + `"${active_type[row.type]}"`
      csv += '\n'
    }
  )

  const array = [
    "TOTS3",
    "ITSA4",
    "WEGE3",
    "ALUP11",
    "B3SA3",
    "RDOR3",
    "AMBP3",
    "PETZ3",
    "CASH3",
    "RRRP3",
    "VALE3",
    "BPAC11",
    "EGIE3",
    "MDNE3",
    "RAIZ4",
    "NTCO3",
    "KLBN11",
    "VAMO3",
    "ITUB4",
    "PETR3",
    "DIRR3",
    "RAPT4",
    "IGTI11",
    "BBAS3",
    "SOMA3",
    "LREN3",
    "BMOB3",
    "DESK3",
    "SIMH3",
    "PETR4",
    "EQTL3",
    "KLBN4",
    "GGPS3",
    "CXSE3",
    "RADL3",
    "BRSR6",
    "POMO4",
    "ALOS3",
    "CSMG3",
    "PSSA3",
    "MULT3",
    "TTEN3",
    "CURY3",
    "TUPY3",
    "CPFE3",
    "GOAU4",
    "EMBR3",
    "TAEE11",
    "STBP3",
    "SMFT3",
    "BRAP4",
    "FLRY3",
    "YDUQ3",
    "CYRE3",
    "RECV3",
    "COGN3",
    "AZUL4",
    "SAPR11",
    "SMTO3",
    "CIEL3",
    "SLCE3",
    "MRVE3",
    "ARZZ3",
    "ELET3",
    "BBDC4",
    "ABEV3",
    "RENT3",
    "CPLE6",
    "GGBR4",
    "CMIG4",
    "VIVT3",
    "CPLE3",
    "BBSE3",
    "JBSS3",
    "BOVV11",
    "DIVO11",
    "SMAL11",
    "XFIX11",
    "HASH11",
    "NSDV11",
    "ACWI11",
    "BIAU39",
    "IRDM11",
    "KDIF11",
    "VGIA11",
    "XPLG11",
    "BTLG11",
    "KNRI11",
    "MXRF11",
    "TGAR11",
    "VISC11",
    "HGRE11",
    "MGFF11",
    "HFOF11",
    "RBRR11",
    "CPTS11",
    "XPML11",
    "KNSC11",
    "FATOR AÇÕES FIC FIA",
    "TROPICO VALUE FIA",
    "GTI DIMONA BRASIL FIA",
    "TARPON GT FIC FIA",
    "CONSTÂNCIA FUNDAMENTO FIA",
    "EASYNVEST TOP Ações",
    "FORPUS AÇÕES FIC FIA",
    "NU ULTRAVIOLETA Ações",
    "TRIVELLA M3",
    "ARTESANAL FIC de FIM",
    "VINCI VALOREM FI MULTIMERCADO",
    "SANTA FÉ AQUARIUS FIM",
    "ÓRAMA OURO FIM",
    "ÓRAMA DI FIRF SIMPLES LP",
    "ICATU INFLAÇÃO CURTA FIC FI RF",
    "HASHDEX DISCOVERY"
  ]

  const names = indexes?.map(index => index.name)
  const nohave: string[] = []
  array?.map(
    (name) => {
      // console.log(name)
      if (!names?.includes(name)) {
        nohave.push(name)
      }
    }
  )

  console.log("array", array.length)
  console.log("indexes", indexes?.length)
  console.log("nohave", nohave.length)
  console.log("nohave", nohave)

  const sla = [
    "HASHDEX 20 NASDAQ CRYPTO INDEX FIC FIM",
    "ICATU VANGUARDA FIC FI RF INFLAÇÃO CURTA PREVIDENCIÁRIO",
    "ÓRAMA DI FI RF SIMPLES LP",
    "VINCI VALOREM FIM",
    "ARTESANAL FIC FIM",
    "TM3 LONG BIASED FIM",
    "NU ULTRAVIOLETA AÇÕES FI",
    "EASYNVEST TOP AÇÕES FIC FIA"
  ]

  
  const href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)

  // console.log(queryIndexes)
  // console.log(queryIndexes.length)
  // console.log(indexes)

  return (
    <div className="p-4">
      <a download={"arquivo.csv"} href={href}>
        Download (CSV)
      </a>
      <SearchBarIndex indexes={indexes ? indexes?.map(index => index.name) : null} id={id} />
      {
        indexes ?
          <>
            <p className="text-center text-sm mb-2">
              Exibindo {indexes?.length} resultados
            </p>
            <ul className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 gap-y-6">
              {/* <li className="flex justify-between">
          <p>Nome</p>
          <p>Rentabilidade</p>
          <p>Volatilidade</p>
          <p>Ìndice de Sharpe</p>
        </li> */}
              {
                indexes?.map(
                  ({ name, profitability, volatility, sharpe_index, type }, key) => {
                    return (
                      <li className="flex flex-col px-4 py-2 gap-y-2 border-2 border-black" key={key}>
                        <h1 className="text-center">
                          {name}
                        </h1>

                        <div>
                          <p className="flex justify-between">
                            <span>Rentabilidade: </span>
                            <span>{profitability}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Volatilidade: </span>
                            <span>{volatility}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Ìndice de Sharpe: </span>
                            <span>{sharpe_index}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Tipo: </span>
                            <span>{active_type[type]}</span>
                          </p>
                        </div>
                        <div className="flex flex-row-reverse">
                          <DeleteIndexButton className="border-2 p-2 border-black rounded-full" id={id} indexes={indexes?.map(index => index.name)} name={name} />
                        </div>
                      </li>
                    )
                  }
                )
              }
            </ul>
          </>
          :
          <NotResult />
      }

    </div>
  )
}

export default Page