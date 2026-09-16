#!/usr/bin/env node
if (process.argv.includes('--debug')) {
    process.env.DEBUG = '*';
}
else {
    process.env.NODE_ENV = 'production';
}
import web from './lib/web.js';
import { init } from './lib/search.js';
import { readFileSync } from 'fs';
// Load application configuration
const configData = readFileSync(`${import.meta.dirname}/../config.json`, 'utf-8');
const appConfig = JSON.parse(configData);
const app = web(appConfig);
init(app.app, appConfig);
//# sourceMappingURL=main.js.map