"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeJobs = scrapeJobs;
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapeJobs(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: true, // Set to false to debug
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = yield browser.newPage();
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        yield page.setViewport({ width: 1280, height: 800 });
        yield page.goto(url, { waitUntil: 'networkidle2' });
        yield page.waitForSelector('div.base-card');
        const jobs = yield page.$$eval('div.base-card', nodes => nodes
            .map(node => {
            var _a, _b;
            const lines = node.innerText.split('\n').map(line => line.trim()).filter(Boolean);
            const url = (_a = node.querySelector('a')) === null || _a === void 0 ? void 0 : _a.getAttribute('href');
            const jobId = (_b = url === null || url === void 0 ? void 0 : url.split('?')[0].slice(-10)) !== null && _b !== void 0 ? _b : '';
            // Filter out short or invalid ones
            if (lines.length < 4)
                return null;
            // Extract parts (based on LinkedIn job card structure)
            const title = lines[0] || '';
            const company = lines[2] || '';
            const location = lines[3] || '';
            const createdAt = lines.find(line => /(minute|hour|day|week|month)s?\sago/i.test(line)) || '';
            // Optional: discard if not a valid job card (e.g., company name is missing)
            if (!title || !company || !location || !createdAt)
                return null;
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
        if (typeof jobs !== 'undefined' && jobs.length > 0 && jobs[0] !== null && typeof jobs[0].url === 'string') {
            const data = jobs[0].url.split('?')[0].slice(-10);
        }
        yield browser.close();
    });
}
