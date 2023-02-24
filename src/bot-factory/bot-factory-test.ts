import { BotFactory } from "./bot-factory";

const inputData = "/Users/vobile/Documents/webscraper_prototyp_factorymethod/data/input.json";
const website = 'https://123movies.sc/';
const botFactory = new BotFactory();

botFactory.createBot(inputData, website);