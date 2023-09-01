import { JSDOM } from "jsdom";
import axios from "axios";
import puppeteer from "puppeteer";

const getUrl = async (enterprise_name: string) => {
  const url = `https://www.safra.com.br/resultado-de-busca.htm?query=${enterprise_name}`;

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector(".resultados");

    await page.evaluate(() => {
      const anchor = document
        .querySelector(".resultados > .item")
        ?.querySelector("a");

      if (anchor && anchor.href) {
        anchor.click();
      }
    });

    await page.waitForSelector(".titulo");

    await browser.close();

    return page.url();
  } catch (e) {
    console.error(e);
    console.log("Erro na geração do browser");
    return "Algo deu errado";
  }
};

const getRecomedation = (subTitle: string) => {
  const recomendations: string[] = ["neutra", "compra", "venda", "revisão"];

  for (const recomendation of recomendations) {
    if (subTitle.includes(recomendation)) {
      return recomendation;
    }
  }

  return "Não foi possível obter a recomendação";
};

const getToken = (phrase: string) => {
  for (const word of phrase.split(" ")) {
    if (/[A-ZÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{4}[0-9]/.test(word)) {
      const title = word.replace(":", "");
      return title;
    }
  }

  return "Não foi possível obter o token";
};

const getTargetPrice = (subTitle: string) => {
  for (const word of subTitle.split(" ")) {
    if (/[R]?[$]?[ ]?(\d{2}\,?\.?)+/.test(word)) {
      return word;
    }
  }

  return "Indeterminado";
};

export const getStockDataSafra = async (enterprise_name: string) => {
  const href = await getUrl(enterprise_name);
  const { data } = await axios.get(href)
  const dom = new JSDOM(data)

  const title = dom.window.document.querySelector('h1.titulo')?.textContent ?? ''
  const subTitle = dom.window.document.querySelector('.sub')?.textContent ?? ''
  const date = dom.window.document.querySelector('span.info')?.textContent ?? 'Não foi possível obter a data'

  const token = getToken(title)
  const recomendation = getRecomedation(subTitle)
  const targetPrice = getTargetPrice(subTitle)

  return { token, recomendation, date, href, targetPrice }
};
