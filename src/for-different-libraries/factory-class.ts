import { chromium } from 'playwright';
import puppeteer, { Puppeteer } from 'puppeteer';
import fs = require('fs');

interface Scraper {
  scrape(): Promise<void>;
}

const file = fs.readFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/data/file.json', 'utf8');
const data = JSON.parse(file);

data.queries.forEach((query: any) => {
  console.log(query.flow_type);
    console.log(query.work.id);
    console.log(query.work.type);
    console.log(query.work.label);
    if (query.seed) {
        console.log(query.seed.url);
    }
    if (query.filter) {
        console.log(query.filter.seasonsNumbers);
        console.log(query.filter.episodesNumbers);
    }
});

class PlaywrightScraper implements Scraper {
  private browser: any;
  private context: any;
  private page: any;

  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async scrape() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto('https://123movies.sc');
    // Do something with the page, e.g. extract data
    await this.browser.close();
  }
}

class PuppeteerScraper implements Scraper {
  private browser: any;
  private page: any;

  constructor() {
    this.browser = null;
    this.page = null;
  }

  async scrape() {
    this.browser = await puppeteer.launch({headless: false});
    this.page = await this.browser.newPage();
    await this.page.goto('https://123movies.sc');
    // Do something with the page, e.g. extract data
    await this.browser.close();
  }
}

export class ScraperFactory {
  static createScraper(library: 'puppeteer' | 'playwright'): Scraper {
    switch (library) {
      case 'puppeteer':
        return new PuppeteerScraper();
      case 'playwright':
        return new PlaywrightScraper();
      default:
        throw new Error(`Unsupported library: ${library}`);
    }
  }
}
