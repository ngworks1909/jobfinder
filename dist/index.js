"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobscrapper_1 = require("./scrappers/jobscrapper");
const express_1 = __importDefault(require("express"));
// Replace with your target URL
const url = 'https://www.linkedin.com/jobs/search?keywords=Fullstack&location=500063&geoId=104508378&distance=25&f_TPR=r604800&f_PP=105556991&position=1&pageNum=0';
(0, jobscrapper_1.scrapeJobs)(url);
const app = (0, express_1.default)();
app.get('/', (_, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => console.log('Server running on port 3000'));
