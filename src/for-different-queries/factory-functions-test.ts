import { processQueries } from "./factory-class";
import fs from 'fs';

const file = fs.readFileSync('/Users/vobile/Documents/webscraper_prototyp_factorymethod/data/file.json', 'utf8');
processQueries(file);