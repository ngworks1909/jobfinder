import puppeteer from 'puppeteer';

export async function scrapeJobs(url: string) {
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

  const jobs = await page.$$eval('div.base-card', nodes =>
    nodes
      .map(node => {
        const lines = node.innerText.split('\n').map(line => line.trim()).filter(Boolean);
        const url = node.querySelector('a')?.getAttribute('href');
        const jobId = url?.split('?')[0].slice(-10) ?? ''

        // Filter out short or invalid ones
        if (lines.length < 4) return null;

        // Extract parts (based on LinkedIn job card structure)
        const title = lines[0] || '';
        const company = lines[2] || '';
        const location = lines[3] || '';
        const createdAt = lines.find(line => /(minute|hour|day|week|month)s?\sago/i.test(line)) || '';

        // Optional: discard if not a valid job card (e.g., company name is missing)
        if (!title || !company || !location || !createdAt) return null;

        return {
          title,
          company,
          location,
          createdAt,
          url,
          jobId
        };
      })
      .filter(Boolean) // Remove nulls
  );

  console.log(`✅ Found ${jobs.length} valid jobs`);
  console.log(jobs);

  await browser.close();
}


