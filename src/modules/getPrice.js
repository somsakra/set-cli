import puppeteer from 'puppeteer';

async function getPrice(symbol) {
    try {
      const url = `https://marketdata.set.or.th/mkt/stockquotation.do?symbol=${symbol}`;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
  
      const [el] = await page.$x('//*[@id="maincontent"]/div/div[1]');
      const text = await el.getProperty('textContent');
      const errorText = await text.jsonValue();
  
      if (errorText === 'ไม่พบสัญลักษณ์หลักทรัพย์') {
        return errorText;
      } else {
        const [el1] = await page.$x(
          '//*[@id="maincontent"]/div/div[1]/div[1]/h3'
        );
        const cpn = await el1.getProperty('textContent');
        const companyName = await cpn.jsonValue();
  
        const [el2] = await page.$x(
          '//*[@id="maincontent"]/div/div[3]/div[1]/table[1]/tbody/tr[2]/td[2]'
        );
        const prc = await el2.getProperty('textContent');
        const price = await prc.jsonValue();
        return companyName + ' ราคาล่าสุด ' + Number(price) + ' บาท';
      }
    } catch (error) {
      console.error(error);
    }
  }

  export default getPrice;