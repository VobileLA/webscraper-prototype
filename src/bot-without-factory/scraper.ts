import puppeteer from "puppeteer";
import fs from "fs";

(async()=> {
    //load the json file containing the queries
    const inputData = JSON.parse(fs.readFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/data/input.json', 'utf-8'));

    //start a new Puppeteer browser instance
    // const browser = await puppeteer.launch({headless: false});
    const url = 'https://123movies.sc/';
    const results: any[] = [];

    //loop through the queries
    for (const query of inputData.queries) {
        const flowType = JSON.stringify(query.flow_type).replace(/"/g, '');
        // console.log(flowType);
        const id = JSON.stringify(query.work.id).replace(/"/g, '');
        // console.log(id);
        const movieName = JSON.stringify(query.work.label).replace(/"/g, '');
        // console.log(movieName);
        const type = JSON.stringify(query.work.type).replace(/"/g, '');
        // console.log(type);

        switch (flowType) {
            case 'INDEXER':
            console.log('INDEXER');
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.goto(url);
            // Do something with the page, e.g. extract data

            //wait for the search input box to load
            await page.waitForSelector('.form-control');
            //search for the movie name
            await page.type('input[maxlength="100"][required][name="q"][class="form-control search-input"][type="text"]', movieName, {delay: 100});
            //hit the enter key
            await page.keyboard.press('Enter');
            //wait for the search results to load
            await page.waitForNavigation();

            const movies = await page.$$('.ml-item .movie-item');
            console.log(movies);
            
            for (const movie of movies) {
                const title = await movie.$eval('.ml-item .movie-item h2', (el) => el.textContent);
                console.log(title);
                const url = await movie.$eval('.ml-item .movie-item a', (el) => el.getAttribute('href'));
                console.log(url);
                
                const matchCandidate = {
                    "label": title,
                    "url": url,
                }

                const index = results.findIndex((result) => result.work_id === id);
                if (index === -1) {
                    results.push({
                        "work_id": id,
                        "match_candidates": [matchCandidate],
                    });
                } else {
                    if (Array.isArray(results) && index >= 0 && index < results.length) {
                        results[index].match_candidates.push(matchCandidate);
                      } else {
                        console.log('error');
                      }                      
                }

                // results.push({
                //     "work_id": id,
                //     "match_candidates": [
                //         {
                //             "label": title,
                //             "url": url,             
                //             }
                //         ]
                //     });
            }
            await page.close();
            await browser.close();
            break;
        case 'HOST_URL_FINDER':
            console.log('HOST_URL_FINDER');
            const indexerUrl:string = JSON.stringify(query.seed.url).replace(/"/g, '');
            console.log(indexerUrl);

            const browser2 = await puppeteer.launch({headless: false});
            const page2 = await browser2.newPage();
            await page2.goto(indexerUrl);

            const hosters = await page2.$$('.tab-video');
            console.log(hosters);
            for (const hoster of hosters) {
                //get the hoster href
                const hosterUrl = await hoster.$eval('a', (el) => el.getAttribute('href'));
                const actualHosterUrl = indexerUrl + hosterUrl;
                // console.log(actualHosterUrl);

                const hostersResults = {
                    "metadata": {},
                    "hosting_url": actualHosterUrl,
                }
                const index = results.findIndex((result) => result.work_id === id);
                if (index === -1) {
                    results.push({
                        "work_id": id,
                        "Results": [hostersResults],
                    });
                } else {
                    if (Array.isArray(results) && index >= 0 && index < results.length) {
                        results[index].Results.push(hostersResults);
                      } else {
                        console.log('error');
                      }                      
                }

                // results.push({
                //     "work_id": id,
                //     "Results": [
                //         {
                //             metadata:{

                //             },
                //             hosting_url: actualHosterUrl
                //         }
                //     ]
                // });
            }

            await page2.close();
            await browser2.close();
            break; 
        default:
            results.push({
                'wrong flow type': flowType,
            });
        }

    }
    // await browser.close();
    console.log(results);
    const jsonString = JSON.stringify(results, null, 2);
    const cleanedJsonString = jsonString.replace(/\\n/g, '');
    fs.writeFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/src/bot-without-factory/output.json', cleanedJsonString, 'utf-8');
})()