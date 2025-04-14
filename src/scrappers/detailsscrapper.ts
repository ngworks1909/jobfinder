import puppeteer from "puppeteer";

export async function jobDetailsScrapper(url: string) {
    const browser = await puppeteer.launch({
        headless: true, // Set to false to debug
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    
      const page = await browser.newPage();
    
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      );
    
      await page.setViewport({ width: 1280, height: 800 });
    
      await page.goto(url, { waitUntil: 'networkidle2' });

      await page.waitForSelector('div.base-card');


      const data = await page.$$eval('div.base-card', nodes =>
        nodes
          .map(node => {
            const lines = node.innerText}));

    console.log(data)

}