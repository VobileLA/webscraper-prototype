import { Dataset, CheerioCrawler, log, LogLevel } from 'crawlee';
import fs from 'fs';

log.setLevel(LogLevel.DEBUG);

const inputData = JSON.parse(fs.readFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/data/input.json', 'utf-8'));

const url = 'https://123movies.sc/';

const crawler = new CheerioCrawler({
      // Use the requestHandler to process each of the crawled pages.
      async requestHandler({ request, $, enqueueLinks, log }) {
        const title = $('title').text();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        // Save results as JSON to ./storage/datasets/default
        await Dataset.pushData({ title, url: request.loadedUrl });

        // Extract links from the current page
        // and add them to the crawling queue.
        await enqueueLinks();
    },
});

// Add first URL to the queue and start the crawl.
crawler.run(['https://fmovies',
             'https://123movies.sc/',]);