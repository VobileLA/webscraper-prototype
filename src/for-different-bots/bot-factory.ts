import { chromium } from 'playwright';
import puppeteer, { Puppeteer } from 'puppeteer';
import fs = require('fs');

interface Bot {
    flow : string;
    
    scrape(): Promise<void>;
}


function createBot(flow: string): Bot {
    if (flow === 'INDEXER') {
        return new INDEXER_BOT();
    } else if (flow === 'HOST_URL_FINDER') {
        return new HOST_URL_FINDER_BOT();
    }else{
        throw new Error(`Unsupported flow_type: ${flow}`);
    }
}

export class BotFactory {
    createBot(flow: string): Bot {
        return createBot(flow);
    }
}

class INDEXER_BOT implements Bot {
    flow: string;
    constructor() {
        this.flow = 'INDEXER';
    }
    async scrape() {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://123movies.sc');
        // Do something with the page, e.g. extract data
        await browser.close();
    }
}

class HOST_URL_FINDER_BOT implements Bot {
    flow: string;
    constructor() {
        this.flow = 'HOST_URL_FINDER';
    }
    async scrape() {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://123movies.sc');
        // Do something with the page, e.g. extract data
        await browser.close();
    }
}

