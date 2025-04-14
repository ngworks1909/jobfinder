"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jobscrapper_1 = require("./scrappers/jobscrapper");
// Replace with your target URL
const url = 'https://www.linkedin.com/jobs/search?keywords=Fullstack&location=500063&geoId=104508378&distance=25&f_TPR=r604800&f_PP=105556991&position=1&pageNum=0';
(0, jobscrapper_1.scrapeJobs)(url);
