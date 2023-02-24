import fs from 'fs';
import puppeteer from 'puppeteer';


interface Query {
  flow_type: string;
  work: {
    id: string;
    type: string;
    label: string;
  };
  seed?: {
    url: string;
  };
  filter?: {
    seasonsNumbers?: number[];
    episodesNumbers?: number[];
  };
}

interface InputData {
  queries: Query[];
}

//to be implemented
class Indexer {
  async process(query: Query) {
    console.log(`Processing query with flow_type "${query.flow_type}"`);
    console.log(`Work:`, query.work);
  }
}

//to be implemented
class HostUrlFinder {
  async process(query: Query) {
    console.log(`Processing query with flow_type "${query.flow_type}"`);
    console.log(`Work:`, query.work);
    console.log(`Seed URL: ${query.seed?.url}`);
    console.log(`Filter:`, query.filter);
  }
}
//to be implemented
class QueryProcessor {
  static createProcessor(flow_type: string) {
    switch (flow_type) {
      case 'INDEXER':
        return new Indexer();
      case 'HOST_URL_FINDER':
        return new HostUrlFinder();
      default:
        throw new Error(`Unsupported flow_type: ${flow_type}`);
    }
  }
}

export async function processQueries(inputFile: string) {
  const inputData: InputData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  for (const query of inputData.queries) {
    const processor = QueryProcessor.createProcessor(query.flow_type);
    await processor.process(query);
  }
}

