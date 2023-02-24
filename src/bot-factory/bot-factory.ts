import fs from "fs";
import { IndexerBot } from "./bot";
import { HostUrlFinderBot } from "./bot";


export class BotFactory {
  async createBot(inputData: string, website: string) {
    //load the json file containing the queries
    const input = JSON.parse(fs.readFileSync(inputData, "utf-8"));
    const url = website;
    const results: any[] = [];

    //loop through the queries
    for (const query of input.queries) {
      const flowType = JSON.stringify(query.flow_type).replace(/"/g, "");
      console.log(flowType);
      const id = JSON.stringify(query.work.id).replace(/"/g, "");
      console.log(id);
      const movieName = JSON.stringify(query.work.label).replace(/"/g, "");
      console.log(movieName);
      const type = JSON.stringify(query.work.type).replace(/"/g, "");
      console.log(type);

      const seedURL = query.seed && query.seed.url ? (JSON.stringify(query.seed.url) || "").replace(/"/g, "") : "";

      console.log(seedURL);
      switch (flowType) {
        case "INDEXER":
          console.log("INDEXER");
          const indexerBot = new IndexerBot(url, id, movieName, type, results);
          await indexerBot.run();
        case "HOST_URL_FINDER":
          console.log("HOST_URL_FINDER");
          const hostUrlFinderBot = new HostUrlFinderBot(seedURL, id, movieName, type, results);
          await hostUrlFinderBot.run();
        default:
          console.log(`No bot found for flow type ${flowType}`);
        }
      }
      console.log(results);
      const jsonString = JSON.stringify(results, null, 2);
      const cleanedJsonString = jsonString.replace(/\\n/g, '');
      fs.writeFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/src/bot-factory/output.json', cleanedJsonString, 'utf-8');
    }
  }
  