import { ScraperFactory } from "./factory-class";

const puppeteerScraper = ScraperFactory.createScraper('puppeteer');
const playwrightScraper = ScraperFactory.createScraper('playwright');

puppeteerScraper.scrape();
playwrightScraper.scrape();
