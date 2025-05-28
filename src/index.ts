import { scrapeJobs } from "./scrappers/jobscrapper";
import express from 'express'


// Replace with your target URL
const url = 'https://www.linkedin.com/jobs/search?keywords=Fullstack&location=500063&geoId=104508378&distance=25&f_TPR=r604800&f_PP=105556991&position=1&pageNum=0';

scrapeJobs(url);

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!')
});
app.listen(3000, () => console.log('Server running on port 3000'));