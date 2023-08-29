import puppeteer from 'puppeteer-core'
import chrome from '@sparticuz/chromium'
import { JSDOM } from 'jsdom'
import axios from 'axios'

const getUrl = async (enterprise_name: string) => {
  const chromeExecPaths: any = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
  const exePath = chromeExecPaths[process.platform]

  const url = `https://www.safra.com.br/resultado-de-busca.htm?query=${enterprise_name}`
  const browser = await puppeteer.launch({ args: [], executablePath: exePath, headless: true })
  // const browser = await puppeteer.launch({ args: chrome.args, executablePath: await chrome.executablePath(), headless: chrome.headless })
  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(60000)

  try {
    await Promise.all([
      page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }),
      page.waitForNavigation().catch(e => {
        console.error(e)
        console.log('Algo deu errado na espera da página de busca')
      })
    ])
  
    await Promise.all([
      page.evaluate(() => {
        const quote = document.querySelector('.resultados > .item')?.querySelector('a')
        quote?.click()
      }),
      page.waitForNavigation().catch(e => {
        console.error(e)
        console.log('Algo deu errado na espera da página da empresa')
      })
    ])
    
  
    const src = page.url()
  
    return src
  }

  catch (e) {
    console.error(e)
    console.log('Erro na geração do browser')
    return 'Algo deu errado'
  }

  finally {
    await page.close()
    await browser.close()    
  } 
}

const getRecomedation = (subTitle: string) => {
  const recomendations: string[] = ['neutra', 'compra', 'venda', 'revisão']

  for (const recomendation of recomendations) {
    if (subTitle.includes(recomendation)) {
      return recomendation
    }
  }

  return 'Não foi possível obter a recomendação'
}

const getToken = (phrase: string) => {
  for (const word of phrase.split(' ')) {
    if (/[A-ZÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{4}[0-9]/.test(word)) {
      const title = word.replace(":", "")
      return title
    }
  }

  return 'Não foi possível obter o token'
}

const getTargetPrice = (subTitle: string) => {
  for (const word of subTitle.split(' ')) {
    if (/[R]?[$]?[ ]?(\d{2}\,?\.?)+/.test(word)) {
      return word
    }
  }

  return 'Indeterminado'
}

export const getStockDataSafra = async (enterprise_name: string) => {
  const href = await getUrl(enterprise_name)
  const { data } = await axios.get(href)
  const dom = new JSDOM(data)

  const title = dom.window.document.querySelector('h1.titulo')?.textContent ?? ''
  const subTitle = dom.window.document.querySelector('.sub')?.textContent ?? ''
  const date = dom.window.document.querySelector('span.info')?.textContent ?? 'Não foi possível obter a data'

  const token = getToken(title)
  const recomendation = getRecomedation(subTitle)
  const targetPrice = getTargetPrice(subTitle)

  return { token, recomendation, date, href, targetPrice }
}
