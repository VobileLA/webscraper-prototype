import puppeteer from "puppeteer";

interface Bot {
    run(): Promise<void>;
  }
  
  export class IndexerBot implements Bot {
    
    constructor(
      private url: string,
      private id: string,
      private movieName: string,
      private type: string,
      private results: any[]
    ) {}
    
    async run() {
      console.log("INDEXER created");
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(this.url);
      // Do something with the page, e.g. extract data
  
      //wait for the search input box to load
      await page.waitForSelector(".form-control");
      //search for the movie name
      
      await page.type(
        'input[maxlength="100"][required][name="q"][class="form-control search-input"][type="text"]',
        this.movieName,
        { delay: 100 }
      );
      //hit the enter key
      await page.keyboard.press("Enter");
      //wait for the search results to load
      await page.waitForNavigation();
  
      const movies = await page.$$('.ml-item .movie-item');
      // console.log(movies);
      for (const movie of movies) {
        const title = await movie.$eval(".movie-item h2", (el) =>
          el.textContent
        );
        console.log(title);
        const url = await movie.$eval(".movie-item a", (el) =>
          el.getAttribute("href")
        );
        console.log(url);
  
        const matchCandidate = {
          label: title,
          url: url,
        };
  
        const index = this.results.findIndex(
          (result) => result.work_id === this.id
        );
        if (index === -1) {
          this.results.push({
            work_id: this.id,
            match_candidates: [matchCandidate],
          });
        } else {
          this.results[index].match_candidates.push(matchCandidate);
        }
      }
      await page.close();
      await browser.close();
    }
  }
  
 export class HostUrlFinderBot implements Bot {
    constructor(
      private seedURL: string,
      private id: string,
      private movieName: string,
      private type: string,
      private results: any[]
    ) {}
  
    async run() {
      console.log("Hoster_URL_Finder created");
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(this.seedURL);
  
      const hosters = await page.$$(".tab-video");
      console.log(hosters);
      for (const hoster of hosters) {
        //get the hoster href
        const hosterURL = await hoster.$eval("a", (el) => el.getAttribute("href"));
        const actualHosterUrl = this.seedURL + hosterURL;
        console.log(actualHosterUrl);
  
        const hostersResults = {
          "metadata": {},
          "hoster_url": actualHosterUrl,
        }
  
        const index = this.results.findIndex( 
          (result) => result.work_id === this.id
        );
        if (index === -1) {
          this.results.push({
            work_id: this.id,
            Results: [hostersResults],
          });
        }
        else {
          if (Array.isArray(this.results) && index >= 0 && index < this.results.length) {
            this.results[index].Results.push(hostersResults);
          }else{
            console.log("Error");
          }
        }
      }
      await page.close();
      await browser.close();
    }
  
  }